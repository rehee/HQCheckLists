using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using HQCheckLists.Models.Contents;
using HQCheckLists.Models.Enums;
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
      var nextGuestNumber = 1;
      var sofaBed = false;
      var bedNumber = 1;
      var currentBed = 1;
      var bigSheet = 0;
      var nextBigSheet = 0;
      var initBathTowel = 0;
      var initHandTowel = 0;
      var initFloorTowel = 0;
      if (!reservationId.IsNullOrEmpty())
      {
        var existCleaning = cleaningService.Read(b => b.ReservationId == reservationId).FirstOrDefault();
        if (existCleaning != null)
          return existCleaning.ConvertToPassingModel();
        var reservation = reservationService.Read(b => b.Id == reservationId).FirstOrDefault();
        if (reservation != null)
        {
          currentBed = reservation.BedNumber;
          guestNumber = reservation.GuestNumber;
          cleaningDate = reservation.CheckOutDate;
          bigSheet = reservation.SofaBed ? 1 : 0;
          var nextReservation = reservationService.Read(
            b => b.PropertyId == propertyId && b.CheckInDate > reservation.CheckInDate)
            .OrderBy(b => b.CheckInDate).FirstOrDefault();
          if (nextReservation != null)
          {
            nextBigSheet = nextReservation.SofaBed ? 1 : 0;
            nextCustomer = nextReservation.GuestNumber;
            nextBookingDay = (nextReservation.CheckOutDate - nextReservation.CheckInDate).Days;
            nextBookingDay = nextBookingDay <= 0 ? 1 : nextBookingDay;
            sofaBed = nextReservation.SofaBed;
            nextGuestNumber = nextReservation.GuestNumber;
            bedNumber = Math.Max(reservation.BedNumber, nextReservation.BedNumber);
          }
        }

      }
      var property = propertyService.Read(b => b.Id == propertyId).FirstOrDefault();
      if (property == null)
      {
        return null;
      }
      var preCleaning = cleaningService.Read(b => b.PropertyId == propertyId && b.CleaningDate < cleaningDate).OrderByDescending(b => b.CleaningDate).FirstOrDefault();
      if (preCleaning != null)
      {
        initBathTowel = preCleaning.NumberBathTowelBring > 0 ? preCleaning.NumberBathTowelBring : guestNumber;
        initHandTowel = preCleaning.NumberHandTowelBring > 0 ? preCleaning.NumberHandTowelBring : guestNumber;
        initFloorTowel = preCleaning.NumberFloorTowelBring > 0 ? preCleaning.NumberFloorTowelBring : property.BathRoom;
      }
      else
      {
        initBathTowel = guestNumber;
        initHandTowel = guestNumber;
        initFloorTowel = property.BathRoom;
      }
      bigSheet = Math.Max(bigSheet, nextBigSheet);
      var cleaning = new Cleaning()
      {
        CurrentGuestNumber = guestNumber,
        NextGuestNumber = nextGuestNumber,
        CurrentBedUsed = currentBed,
        Name = $"{property.Name} {property.BedRoom} 室",
        PropertyId = propertyId.IsNullOrEmpty() ? "" : propertyId,
        ReservationId = reservationId.IsNullOrEmpty() ? "" : reservationId,
        CleaningDate = cleaningDate,
        CustomerPrepare = bedNumber,
        NextBookingDay = nextBookingDay,
        SofaBad = sofaBed,
        BigSheetNumber = bigSheet,
        SheetNumber = bedNumber,
        CoverNumber = bigSheet + bedNumber,

        NumberBathTowelInit = initBathTowel,
        NumberBathTowelActual = initBathTowel,
        NumberBathTowelBring = nextCustomer,

        NumberHandTowelInit = initHandTowel,
        NumberHandTowelActual = initHandTowel,
        NumberHandTowelBring = nextCustomer,

        NumberFloorTowelInit = initFloorTowel,
        NumberFloorTowelActual = initFloorTowel,
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
      if (!userService.IsUserInRoles(User, HQE.Access.CleaningUpdate))
        return;
      cleaningService.Update(model, out response);
    }
    public void UpdateStatus(ClaimsPrincipal User, string cleaningId, EnumStatus status, out MethodResponse response)
    {
      response = new MethodResponse();
      var cleaning = cleaningService.Read(b => b.Id == cleaningId).FirstOrDefault();
      if (cleaning == null)
        return;
      cleaning.Status = status;
      cleaningService.Update(cleaning.ConvertToPassingModel(), out response);
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
      var result = cleanItems.GroupBy(b => b.CleaningDate.ToShortDateString()).Select(b =>
      {
        var cleanJob = new CleanerJob()
        {
          JobDate = b.Key.MyTryConvert<DateTime>(),
          Jobs = b.OrderByDescending(c => c.CleaningDate).ToList()
        };
        return cleanJob;
      }).ToList();
      return result;
    }
  }
}
