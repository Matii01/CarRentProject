using System.ComponentModel.DataAnnotations;

namespace CarRent.data.DTO
{
    public record NewOpinionDto(
        int Id,
        string? Title ,
        string? Text ,
        DataType? AddedDate ,
        int Mark,
        int CarId 
    );

    public record TemporaryOpinionDto(
       int Id,
       string? Title,
       string? Text,
       DateTime? AddedDate,
       int Mark,
       int CarId,
       string? UserId
   );

    public record OpinionDto(
        int Id,
        string? Title,
        string? Text,
        DateTime? AddedDate,
        int Mark,
        int CarId,
        string UserName
    );

    public record OpinionForAdminViewDto(
        int Id,
        string? Title,
        string? Text,
        DateTime? AddedDate,
        bool? IsAccepted,
        string? UserId,
        int Mark,
        int CarId
    );

}
