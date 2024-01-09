﻿using CarRent.data.Models;
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
