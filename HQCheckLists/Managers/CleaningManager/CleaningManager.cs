using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using HQCheckLists.Models.Contents;
using HQCheckLists.Services;
using HQCheckLists.ViewModels.Cleanings;
using SDHCC.Core.MethodResponse;
using SDHCC.DB.Content;
using SDHCC.Identity.Services;

namespace HQCheckLists.Managers
{
  public class CleaningManager : ICleaningManager
  {

    IPropertyService propertyService;
    IPropertyInventoryService inventoryService;
    IReservationService reservationService;
    ISDHCCIdentity userService;
    ICleaningService cleaningService;
    ICleaningItemService cleanItemService;
    public CleaningManager(
      IPropertyService propertyService,
      IPropertyInventoryService inventoryService,
      IReservationService reservationService,
      ISDHCCIdentity userService,
      ICleaningService cleaningService,
      ICleaningItemService cleanItemService
      )
    {
      this.propertyService = propertyService;
      this.inventoryService = inventoryService;
      this.reservationService = reservationService;
      this.userService = userService;
      this.cleaningService = cleaningService;
      this.cleanItemService = cleanItemService;
    }
    public ContentPostModel Create(ClaimsPrincipal User, string propertyId, string reservationId)
    {
      if (!userService.IsUserInRoles(User, HQE.Access.CleaningCreate))
        return null;
      DateTime cleaningDate = DateTime.Now;
      var nextCustomer = 1;
      var nextBookingDay = 1;
      var guestNumber = 1;
      if (!reservationId.IsNullOrEmpty())
      {
        var existCleaning = cleaningService.Read(b => b.ReservationId == reservationId).FirstOrDefault();
        if (existCleaning != null)
          return existCleaning.ConvertToPassingModel();
        var reservation = reservationService.Read(b => b.Id == reservationId).FirstOrDefault();
        if (reservation != null)
        {
          guestNumber = reservation.GuestNumber;
          cleaningDate = reservation.CheckOutDate;
          var nextReservation = reservationService.Read(b => b.PropertyId == propertyId && b.CheckInDate > reservation.CheckInDate).OrderBy(b => b.CheckInDate).FirstOrDefault();
          if (nextReservation != null)
          {
            nextCustomer = nextReservation.GuestNumber;
            nextBookingDay = (nextReservation.CheckOutDate - nextReservation.CheckInDate).Days;
            nextBookingDay = nextBookingDay <= 0 ? 1 : nextBookingDay;

          }
        }

      }
      var property = propertyService.Read(b => b.Id == propertyId).FirstOrDefault();
      if (property == null)
      {
        return null;
      }
      var cleaning = new Cleaning()
      {
        PropertyId = propertyId.IsNullOrEmpty() ? "" : propertyId,
        ReservationId = reservationId.IsNullOrEmpty() ? "" : reservationId,
        CleaningDate = cleaningDate,
        CustomerPrepare = nextCustomer,
        NextBookingDay = nextBookingDay,

        NumberBathTowelInit = guestNumber,
        NumberBathTowelActual = guestNumber,
        NumberBathTowelBring = nextCustomer,
        NumberHandTowelInit = guestNumber,
        NumberHandTowelActual = guestNumber,
        NumberHandTowelBring = nextCustomer,
        NumberFloorTowelInit = property.BathRoom,
        NumberFloorTowelActual = property.BathRoom,
        NumberFloorTowelBring = property.BathRoom,
      };

      return cleaning.ConvertToPassingModel();
    }

    public void Create(ClaimsPrincipal User, ContentPostModel model, out MethodResponse response)
    {
      response = new MethodResponse();
      if (!userService.IsUserInRoles(User, HQE.Access.CleaningCreate))
        return;
      cleaningService.Create(model, out response);
      if (!response.Success)
        return;
      var clean = (Cleaning)model.ConvertToBaseModel();
      if (clean.PropertyId.IsNullOrEmpty())
        return;
      var items = inventoryService.Read(b => b.ParentId == clean.PropertyId).ToList();
      foreach (var item in items)
      {
        var cleanItem = new CleaningItem()
        {
          CleaningId = clean.Id,
          InventoryId = item.Id,
          InitNumber = item.QTY,
          ActuallyNumber = item.QTY,
          Name = item.Name,
          IsPercentage = item.IsPercentage
        };
        cleanItemService.Create(cleanItem.ConvertToPassingModel(), out var r);
      }
    }

    public IEnumerable<Cleaning> ReadAllForProperty(ClaimsPrincipal User, string propertyId)
    {
      if (!userService.IsUserInRoles(User, HQE.Access.CleaningCreate))
        return null;
      return cleaningService.Read(b => b.PropertyId == propertyId).OrderByDescending(b => b.CleaningDate).ToList();
    }

    public ContentPostModel Update(ClaimsPrincipal User, string cleaningId)
    {
      if (!userService.IsUserInRoles(User, HQE.Access.CleaningCreate))
        return null;
      var clean = cleaningService.Read(b => b.Id == cleaningId).FirstOrDefault();
      if (clean == null)
        return null;
      return clean.ConvertToPassingModel();
    }

    public void Update(ClaimsPrincipal User, ContentPostModel model, out MethodResponse response)
    {
      response = new MethodResponse();
      if (!userService.IsUserInRoles(User, HQE.Access.CleaningCreate))
        return;
      cleaningService.Update(model, out response);
    }
    public Cleaning CleaningGetByReservatinId(ClaimsPrincipal user, string reservationIid)
    {
      if (reservationIid.IsNullOrEmpty())
        return null;
      var cleaning = cleaningService.Read(b => b.ReservationId == reservationIid).FirstOrDefault();
      if (cleaning == null)
        return null;
      return cleaning;
    }
    public CleaningView CleaningGetByCleaningId(ClaimsPrincipal user, string cleaningId)
    {
      var result = new CleaningView();
      result.CleaningRecord = cleaningService.Read(b => b.Id == cleaningId).FirstOrDefault();
      result.Items = cleanItemService.Read(b => b.CleaningId == cleaningId).ToList();
      return result;
    }
    public IEnumerable<CleanerJob> ReadAllJobForCleaner(ClaimsPrincipal User)
    {
      var cleaner = userService.GetUserByName(User.Identity.Name);
      var allClean = cleaningService.Read(b => b.CleanerId == cleaner.Id && b.Status != Models.Enums.EnumStatus.Draft)
        .OrderByDescending(b => b.CreateTime).ToList();
      var propertyIds = allClean.GroupBy(b => b.PropertyId).Select(b => b.Key).ToList();
      var properties = propertyService.Read(b => propertyIds.Contains(b.Id)).ToList();
      var cleanItems = allClean.Select(b =>
      {
        var property = properties.Where(p => b.PropertyId == p.Id).FirstOrDefault();
        var job = new ClearJobItem()
        {
          CleaningId = b.Id,
          PropertyId = b.PropertyId,
          ReserveId = b.ReservationId,
          Status = b.Status,
          CleaningDate = b.CleaningDate,
          Title = $"{property.Name} clean"
        };
        return job;
      }).ToList();
      var result = cleanItems.GroupBy(b => b.CleaningDate).Select(b =>
      {
        var cleanJob = new CleanerJob()
        {
          JobDate = b.Key,
          Jobs = b.ToList()
        };
        return cleanJob;
      }).ToList();
      return result;
    }
  }
}
