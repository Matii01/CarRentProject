using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Exceptions;
using CarRent.Repository.Extensions;
using CarRent.Repository.Interfaces;
using CarRent.Repository.Parameters;
using CarRent.SendingEmail;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CarRent.Service.Service
{
    public class MessagesService : ServiceBase, IMessagesService
    {
        private readonly IEmailSender _emailSender;
        public MessagesService(IRepositoryManager repository, IMapper mapper, IEmailSender emailSender) 
            : base(repository, mapper)
        {
            _emailSender = emailSender;
        }

        public async Task AddNewMessage(NewMessageDto messageDto)
        {
            data.Models.Company.Message message = new()
            {
                Name = messageDto.Name,
                Email = messageDto.Email,
                MessageText = messageDto.Message,
                CreatedDate = DateTime.Now,
                IsActive = true,
                IsAnswered = false,
            };

            _repository.Message.Create(message);
            await _repository.SaveAsync();
        }

        public async Task<PagedList<MessageDto>> GetMessagesAsync(MessagesParameters parameters)
        {
            var list = _repository.Message
                .FindByCondition(x => x.IsActive == true, false)
                .OrderByDescending(x => x.CreatedDate)
                .Search(parameters)
                .Select(x => new MessageDto(x.Id, x.Name, x.Email, x.MessageText, x.WhoAnswerName, x.AnswerText, x.CreatedDate, x.AnsweredDate, x.IsAnswered));

            return await PagedList<MessageDto>
                .ToPagedList(list, parameters.PageNumber, parameters.PageSize);
        }

        public async Task<MessageDto> AnswerToMessage(int id, string? workerId,string? whoAnswerName, MessageAnswerDto answerDto)
        {
            var item = await  _repository
                .Message
                .GetAsync(id, true)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("Not found"); ;
   
            if(item.IsAnswered == true)
            {
                throw new AnswerWasSentException();
            }

            _emailSender.SendAnswerMessage(item.Email, answerDto.Title, answerDto.AnswerText);

            item.AnswerText = answerDto.AnswerText;
            item.AnsweredDate = DateTime.Now;
            item.WhoAnswerId = workerId;
            item.WhoAnswerName = whoAnswerName;
            item.IsAnswered = true;

            await _repository.SaveAsync();
        
            return new MessageDto(
                item.Id, 
                item.Name, 
                item.Email, 
                item.MessageText, 
                item.WhoAnswerName, 
                item.AnswerText,
                item.CreatedDate, 
                item.AnsweredDate, 
                item.IsAnswered
            );
        }
    }
}
