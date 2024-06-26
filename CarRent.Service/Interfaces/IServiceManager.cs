﻿using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using CarRent.Service.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface IServiceManager
    {
        IGenerateDocumentService GenerateDocumentService { get; }
        ICarService CarService { get; }
        ICarMakeService CarMakeService { get; }
        IPriceListService PriceListService { get; }
        IRentalService RentalService { get; }
        IRabatService RabatService { get; }
        ICarMaintenanceService CarMaintenanceService {get;}
        IUserAddressService UserAddressService {  get; }
        IPaymentService PaymentService { get; }
        IWorkerSidebarService WorkerSidebar {  get; }
        IContentManagementService ContentManagementService  {  get; }
        IWishlistService WishlistService { get; }
        ICarOpinionService CarOpinionService {  get; }
        IWorkOrderService WorkOrderService { get; }
        INotificationService NotificationService { get; }
        IAboutCompanyService AboutCompanyService { get; }
        IApplicationSettingsService ApplicationSettingsService { get; }
        IUsersService UsersService {  get; }
        INewsletterService NewsletterService { get; }
        ICarEquipmentService CarEquipmentService { get; }
        IReportService ReportService { get; }
        IMessagesService MessagesService { get; }

        IGenericService<CarTypeDto> CarTypeService { get; }
        IGenericService<CarDriveDto> CarDriveService { get; }
        IGenericService<EngineTypeDto> EngineTypeService { get; }
        IGenericService<AirConditioningTypeDto> AirConditioningTypeService { get; }
        IGenericService<KilometrLimitDto> KilometrLimitService { get; }
        IGenericService<GearboxTypeDto> GearboxTypeService { get; }
        IGenericService<RentalStatusDto> RentalStatusService {  get; }
        IGenericService<InvoiceStatusDto> InvoiceStatusService { get; }
        IGenericService<WorkOrderPriorityDto> WorkOrderPriorityService { get; }
        IGenericService<WorkOrderStatusDto> WorkOrderStatusService { get; }
    }
}
