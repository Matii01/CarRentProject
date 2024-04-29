using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.DTO
{
    public record NewMessageDto(string Name, string Email, string Message);
    public record MessageAnswerDto(string Title, string AnswerText);
    public record MessageDto(
        int Id,
        string Name,
        string Email,
        string MessageText,
        string? WhoAnswer,
        string? AnswerText,
        DateTime CreatedDate,
        DateTime? AnsweredDate,
        bool IsAnswered
    );
}
