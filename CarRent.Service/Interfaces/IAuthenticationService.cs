using CarRent.data.DTO;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface IAuthenticationService
    {
        Task<IdentityResult> RegisterUser(UserForRegistrationDto userForRegistration);
        Task<bool> ValidateUser(UserForAuthenticationDto userForAuth);
        Task<TokenDto> CreateToken(bool populateExp);
        Task<UserLoginData> Login(bool populateExp);
        Task<UserLoginData> RefreshToken(TokenDto tokenDto);
        Task<UserLoginData> RetrieveData(TokenDto tokenDto);
        Task<string> FindUserIdByUserName(string? userName);
        Task<string> GetUserIdByClaims(ClaimsPrincipal principal);
    }
}
