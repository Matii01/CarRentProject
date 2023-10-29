using CarRent.data.DTO;
using CarRent.data.Models.Auth;
using CarRent.data.Models.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Service
{
    public class RefreshTokenService
    {
        private readonly JwtSettings _jwtSettings;
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;

        private const string EnvironmentSecretName = "SECRET";
        private User? _user;

        public string Secret { get; set; } = Environment.GetEnvironmentVariable(EnvironmentSecretName);

        public async Task<TokenDto> RefreshToken(TokenDto tokenDto)
        {
            var principial = GetPrincipalFromExpiredToken(tokenDto.AccessToken);
            var user = await _userManager.FindByNameAsync(principial.Identity.Name);
            if (user == null || user.RefreshToken != tokenDto.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
            {
                throw new Exception("RefreshTokenBadRequest");
            }
            _user = user;
            return await _tokenService.CreateToken(populateExp: false);
        }

        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = true,
                ValidateIssuer = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(Secret)),
                ValidateLifetime = true,
                ValidIssuer = _jwtSettings.ValidIssuer,
                ValidAudience = _jwtSettings.ValidAudience
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principial = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken != null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token");
            }

            return principial;
        }
    }
}
