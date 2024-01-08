using CarRent.data.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface ICarOpinionService
    {
        Task AddOpinionAsync(OpinionDto opinion);
        Task<IEnumerable<OpinionDto>> GetOpinionsForCarAsync(int carId);
        Task<IEnumerable<OpinionDto>> GetOpinionsUserForCarAsync();
        Task HideOpinionAsync(int Id);
        Task DeleteOpinionAsync(int Id);
    }
}
