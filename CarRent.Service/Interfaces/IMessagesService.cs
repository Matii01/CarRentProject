using CarRent.data.DTO;
using CarRent.Repository.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface IMessagesService
    {
        Task AddNewMessage(NewMessageDto messageDto);
        Task<MessageDto> AnswerToMessage(int id, string? workerId, string? whoAnswerName, MessageAnswerDto answerDto);
        Task<PagedList<MessageDto>> GetMessagesAsync(MessagesParameters parameters);
    }
}
