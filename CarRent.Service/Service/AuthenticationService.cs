﻿using CarRent.data.DTO;
using CarRent.data.Exceptions;
using CarRent.data.Models.User;
using CarRent.Service.Helper;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace CarRent.Service.Service
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;

        private const string EnvironmentSecretName = "SECRET";
        private User? _user;
        public string Secret { get; set; } 

        public AuthenticationService(UserManager<User> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
            Secret = Environment.GetEnvironmentVariable(EnvironmentSecretName) 
                ?? throw new Exception("Environment Variable not found");
        }

        public async Task<IdentityResult> RegisterUser(UserForRegistrationDto userForRegistration)
        {
            var user = MapHelper.MapUserForRegistrationDtoToUser(userForRegistration);

            var result = await _userManager.CreateAsync(user, userForRegistration.Password);
            if (result.Succeeded && userForRegistration.Roles != null)
            {
                foreach (var t in userForRegistration.Roles)
                {
                    await _userManager.AddToRoleAsync(user, t);
                }
            }

            return result;
        }

        public async Task<bool> ValidateUser(UserForAuthenticationDto userForAuth)
        {
            _user = await _userManager.FindByNameAsync(userForAuth.UserName);
            var result = (_user != null && await _userManager.CheckPasswordAsync(_user, userForAuth.Password));

            return result;
        }

        public async Task<UserLoginData> Login(bool populateExp)
        {
            var loginData = new UserLoginData {
                UserId = _user.Id,
                UserName = _user.UserName,
                Role = await _userManager.GetRolesAsync(_user),
                Token = await CreateToken(populateExp)
            };

            return loginData;
        }

        public async Task<TokenDto> CreateToken(bool populateExp)
        {
            var signingCredentials = GetSigningCredentials();
            var claims = await GetClaims();
            var tokenOptions = GenerateTokenOptions(signingCredentials, claims);
            var refreshToken = GenerateRefreshToken();
            _user.RefreshToken = refreshToken;

            if (populateExp)
            {
                _user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);
            }

            await _userManager.UpdateAsync(_user);
            var accessToken = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return new TokenDto(accessToken, refreshToken);
        }

        private SigningCredentials GetSigningCredentials()
        {
            var key = Encoding.UTF8.GetBytes(Secret);
            var secret = new SymmetricSecurityKey(key);

            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        private async Task<List<Claim>> GetClaims()
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, _user.UserName)
            };
            var roles = await _userManager.GetRolesAsync(_user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            return claims;
        }

        private JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");

            var tokenOptions = new JwtSecurityToken(
                 issuer: jwtSettings["validIssuer"],
                audience: jwtSettings["validAudience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings["Expires"])),
                signingCredentials: signingCredentials
            );

            return tokenOptions;
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = true,
                ValidateIssuer = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Secret)),
                ValidateLifetime = true,
                ValidIssuer = jwtSettings["validIssuer"],
                ValidAudience = jwtSettings["validAudience"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;


            var principial = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token");
            }

            return principial;
        }

        public async Task<UserLoginData> RefreshToken(TokenDto tokenDto)
        {
            var principial = GetPrincipalFromExpiredToken(tokenDto.AccessToken);

            if(principial is null || principial.Identity?.Name is null)
            {
                throw new Exception("RefreshTokenBadRequest");
            }

            var user = await _userManager.FindByNameAsync(principial.Identity.Name);
            if (user == null || user.RefreshToken != tokenDto.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
            {
                throw new Exception("RefreshTokenBadRequest");
            }
            _user = user;

            var data = new UserLoginData
            {
                UserId = _user.Id,
                UserName = _user.UserName,
                Role = await _userManager.GetRolesAsync(_user),
                Token = await CreateToken(populateExp: false)
            };
            return data;
        } 

        public async Task<UserLoginData> RetrieveData(TokenDto tokenDto)
        {
            var principial = GetPrincipalFromExpiredToken(tokenDto.AccessToken);
            
            if (principial is null || principial.Identity?.Name is null)
            {
                throw new Exception("");
            }

            var user = await _userManager.FindByNameAsync(principial.Identity.Name);
            if (user == null || user.RefreshToken != tokenDto.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
            {
                throw new Exception("Fail during retrieved from token");
            }
            _user = user;
            var data = new UserLoginData
            {
                UserId = _user.Id,
                UserName = _user.UserName,
                Role = await _userManager.GetRolesAsync(_user),
                Token = tokenDto
            };
            return data;
        }

        public async Task<string> FindUserIdByUserName(string? userName)
        {
            if(userName is null)
            {
                throw new UnauthorizedException("Username not found");
            }

            var user = await _userManager.FindByNameAsync(userName);

            return user is null ? throw new UnauthorizedException("User id not found") : user.Id;
        }

        public async Task<string> GetUserIdByClaims(ClaimsPrincipal principal)
        {
            if(principal.Identity == null)
            {
                throw new UnauthorizedException("Unauthorized");
            }

            var userName = principal.Identity.Name;
            return await FindUserIdByUserName(userName);
        }

        public async Task<User> GetUserByClaims(ClaimsPrincipal principal)
        {
            if (principal.Identity == null || principal.Identity.Name == null)
            {
                throw new UnauthorizedException("Unauthorized");
            }

            var user = await _userManager.FindByNameAsync(principal.Identity.Name);

            return user ?? throw new UnauthorizedException("Unauthorized");
        }
    }
}
