using CarRent.data.Models.CMS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.DTO
{
    public record ContactPageDto(
        string? PageTitle,
        string? PageDescription,
        string? AddressTitle,
        string? AddressIcon,
        string? AddressDetails,
        string? PhoneTitle,
        string? PhoneIcon,
        string? PhoneDetails,
        string? PhoneNumber,
        string? EmailTitle,
        string? EmailIcon,
        string? EmailAddress,
        string? ContactSectionTitle,
        string? TextRowOne,
        string? TextRowTwo
    );

    public record FooterDto(
        string? Title,
        string? Description,
        string? LinksTitleOne,
        string? LinksTitleTwo,
        string? NewsLetterTitle,
        string? NewsLetterDescription,
        string? NewsLetterInfo,
        string? FacebookLink,
        string? YouTubeLink,
        string? InstagramLink,
        string? TikTokLink,
        string? Info 
    );

    public record FooterLinkDto(
        int FooterId,
        string Name,
        string Path,
        string RowTitle,
        int DisplayPosition 
    );
}
