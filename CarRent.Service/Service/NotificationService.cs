using AutoMapper;
using CarRent.Repository.Interfaces;
using CarRent.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Service
{
    public class NotificationService : ServiceBase, INotificationService
    {
        public NotificationService(IRepositoryManager repository, IMapper mapper)
            : base(repository, mapper)
        {
        }
    }
}
