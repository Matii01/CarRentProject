using CarRent.data.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
    public record OpinionDto(
        int Id,
        string? Title,
        string? Text,
        string? UserName,
        DataType? AddedDate,
        int Mark,
        int CarId
    );

    public record OpinionForAdminViewDto(
        int Id,
        string? Title,
        string? Text,
        DataType? AddedDate,
        bool? IsAccepted,
        string? UserId,
        int Mark,
        int CarId
    );

}
