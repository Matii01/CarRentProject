﻿using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Exceptions;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Extensions;
using CarRent.Repository.Interfaces;
using CarRent.Repository.Parameters;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace CarRent.Service.Service
{
    public class CarOpinionService : ServiceBase, ICarOpinionService
    {
        public CarOpinionService(IRepositoryManager repository, IMapper mapper)
            : base(repository, mapper)
        {

        }

        public async Task AddOpinionAsync(NewOpinionDto opinion, string userId)
        {
            if(opinion?.Text?.Length > 1000)
            {
                throw new DataTooLongException("Text exceeds character limit of 1000. Please reduce the text length.");
            }

            var newOpinion = _mapper.Map<CarOpinion>(opinion, opts => opts.Items["UserId"] = userId);

            _repository.CarOpinion.Create(newOpinion);
            await _repository.SaveAsync();
        }

        public async Task<PagedList<OpinionForAdminViewDto>> GetOpinionsAsync(OpinionParameters param)
        {
            var items = _repository.CarOpinion
                .GetAllAsync(false, "Id")
                .OrderByDescending(x => x.AddedDate)
                .Where(x => x.IsActive == true)
                .Search(param)
                .Select(x => _mapper.Map<OpinionForAdminViewDto>(x));

            return await PagedList<OpinionForAdminViewDto>
                .ToPagedList(items, param.PageNumber, param.PageSize);
        }

        public async Task<IEnumerable<OpinionDto>> GetOpinionsForCarAsync(int carId)
        {
            var items = await _repository.CarOpinion
                .FindByCondition(
                    x => x.CarId == carId &&
                    x.IsActive == true &&
                    x.IsAccepted == true, false)
                .Include(x => x.User)
                .Select(x => new OpinionDto(x.Id, x.Title, x.Text, x.AddedDate, x.Mark, x.CarId, x.User.UserName ?? ""))
                .ToListAsync();

            return items;
        }

        public async Task AcceptOpinionAsync(int Id)
        {
            await ToggleIsAccepted(Id, true);
        }

        public async Task HideOpinionAsync(int Id)
        {
            await ToggleIsAccepted(Id, false);
        }

        public async Task DeleteOpinionAsync(int Id)
        {
            var item = await _repository.CarOpinion
                .GetAsync(Id, true)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("Opinion not found");
            item.IsActive = false;
            await _repository.SaveAsync();
        }

        public async Task ToggleIsAccepted(int Id, bool IsAccepted)
        {
            var item = await _repository.CarOpinion
                 .GetAsync(Id, true)
                 .SingleOrDefaultAsync() ?? throw new DataNotFoundException("Oppinion not found");

            item.IsAccepted = IsAccepted;
            await _repository.SaveAsync();
        }
    }
}
