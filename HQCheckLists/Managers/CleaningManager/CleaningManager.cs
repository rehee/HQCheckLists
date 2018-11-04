using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using HQCheckLists.Models.Contents;
using HQCheckLists.Services;
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
  }
}
