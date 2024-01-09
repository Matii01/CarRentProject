using CarRent.data.DTO;
using CarRent.Repository.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface ICarOpinionService
    {
        Task AddOpinionAsync(NewOpinionDto opinion, string userId);
        Task<IEnumerable<OpinionDto>> GetOpinionsForCarAsync(int carId);
        Task<PagedList<OpinionForAdminViewDto>> GetOpinionsAsync(OpinionParameters param);
        Task ToggleIsAccepted(int Id, bool IsAccepted);
        Task HideOpinionAsync(int Id);
        Task AcceptOpinionAsync(int Id);
        Task DeleteOpinionAsync(int Id);
    }
}
