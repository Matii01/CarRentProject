using System.ComponentModel.DataAnnotations;

namespace CarRent.data.DTO
{
    public class UserDto
    {
        public string? FirstName { get; init; }
        public string? LastName { get; init; }

        [Required(ErrorMessage = "Username is required")]
        public string? UserName { get; init; }

        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
        public string? Email { get; init; }
        public string? PhoneNumber { get; init; }
        public ICollection<string>? Roles { get; init; }
    }
    public record UserForRegistrationDto
    {
        public string FirstName { get; init; } = null!;
        public string LastName { get; init; } = null!;

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; init; } = null!;

        [Required(ErrorMessage = "Email is required")]
        public string Email { get; init; } = null!;
        public string? PhoneNumber { get; init; }
        public ICollection<string>? Roles { get; set; }
    }

    public record UserForAuthenticationDto
    {
        [Required(ErrorMessage = "User name is required")]
        public string UserName { get; init; } = null!;
        [Required(ErrorMessage = "Password name is required")]
        public string Password { get; init; } = null!;
    }

    public record UserLoginData
    {
        public string? UserId { get; init; }
        public string? UserName { get; init; }
        public IList<string>? Role { get; init; }
        public TokenDto? Token { get; init; }
    }

    public record AddressDto
    (
        int Id,
        string? FirstName,
        string? LastName,
        string? Address1,
        string? Address2,
        string? City,
        string? State,
        string? Zip,
        bool? IsDefault
    );

    public record UserAddressDto
    (
        int Id,
        int AddressId,
        string? UserAccountId 
    );

    public record ChangePassword
    (
        string? OldPassword,
        string? NewPassword,
        string? RetypePassword
    );

    public record DefaultRentalData
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? PostCode { get; set; }
        public string? City { get; set; }
    }

    public record UserPersonalDataDto(
        string? FirstName,
        string? LastName,
        string? UserName,
        string? Email,
        string? PhoneNumber
    );
}
