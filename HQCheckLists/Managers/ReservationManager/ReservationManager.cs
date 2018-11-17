using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using HQCheckLists.Models.Contents;
using HQCheckLists.Models.Enums;
using HQCheckLists.Models.Users;
using HQCheckLists.Services;
using HQCheckLists.ViewModels.Reservations;
using SDHCC.Core.MethodResponse;
using SDHCC.DB.Content;
using SDHCC.Identity.Services;

namespace HQCheckLists.Managers
{
  public class ReservationManager : IReservationManager
  {
    IPropertyService propertyService;
    IReservationService reservationService;
    ISDHCCIdentity userService;
    ICleaningService cleaningService;
    public ReservationManager(IPropertyService propertyService, IReservationService reservationService, ISDHCCIdentity userService, ICleaningService cleaningService)
    {
      this.propertyService = propertyService;
      this.reservationService = reservationService;
      this.userService = userService;
      this.cleaningService = cleaningService;
    }
    public IEnumerable<Reservation> ReservationGetAll(ClaimsPrincipal user, string propertyId)
    {
      if (!userService.IsUserInRoles(user, HQE.Access.ReservationRead))
        return null;
      return reservationService.Read(b => b.PropertyId == propertyId).OrderByDescending(b => b.CheckInDate).ToList();
    }
    public ContentPostModel ReservationCreate(ClaimsPrincipal user, string propertyId)
    {
      if (!userService.IsUserInRoles(user, HQE.Access.ReservationCreate))
        return null;
      var property = propertyService.Read(b => b.Id == propertyId).FirstOrDefault();
      if (property == null)
        return null;
      var model = new Reservation()
      {
        PropertyId = propertyId
      };
      return model.ConvertToPassingModel();
    }

    public void ReservationCreate(ClaimsPrincipal user, ContentPostModel model, out MethodResponse response)
    {
      response = new MethodResponse();
      if (!userService.IsUserInRoles(user, HQE.Access.ReservationCreate))
        return;
      var baseModel = model.ConvertToBaseModel();
      var propertyId = ((Reservation)baseModel).PropertyId;
      if (propertyId.IsNullOrEmpty())
        return;
      if (propertyService.Read(b => b.Id == propertyId).FirstOrDefault() == null)
        return;
      reservationService.Create(model, out response);
    }

    public ContentPostModel ReservationUpdate(ClaimsPrincipal user, string reservationId)
    {
      if (!userService.IsUserInRoles(user, HQE.Access.ReservationUpdate))
        return null;
      var model = reservationService.Read(b => b.Id == reservationId).FirstOrDefault();
      if (model == null)
        return null;
      return model.ConvertToPassingModel();
    }
    public void ReservationUpdate(ClaimsPrincipal user, ContentPostModel model, out MethodResponse response)
    {
      response = new MethodResponse();
      if (!userService.IsUserInRoles(user, HQE.Access.ReservationUpdate))
        return;
      var baseModel = model.ConvertToBaseModel();
      var propertyId = ((Reservation)baseModel).PropertyId;
      if (propertyId.IsNullOrEmpty())
        return;
      if (propertyService.Read(b => b.Id == propertyId).FirstOrDefault() == null)
        return;
      reservationService.Update(model, out response);
    }

    public IEnumerable<ReservationSummaryDate> ReadReservationSummaryListByLength(ClaimsPrincipal user, int length)
    {
      var date = DateTime.UtcNow.ToShortDateString();
      
      var startDay = DateTime.Parse(date);
      var endDay = startDay.AddDays(length);
      var checkIns = reservationService.Read(b => b.CheckInDate >= startDay && b.CheckInDate < endDay).OrderBy(b => b.CheckInDate).ToList();
      var propertIds = checkIns.GroupBy(b => b.PropertyId).Select(b => b.Key).ToList();
      var propertyList = propertyService.Read(b => propertIds.Contains(b.Id)).ToList();
      var cleaners = ContentBase.context.Where<HQUser>(b => userService.IsUserInRole(b.NormalizedUserName, HQE.Setting.CleanerRole)).ToList();
      var reservationSummary = new List<ReservationSummary>();
      foreach (var reserve in checkIns)
      {
        var lastReserve = reservationService.Read(b => b.PropertyId == reserve.PropertyId && b.CheckOutDate < reserve.CheckInDate).OrderByDescending(b => b.CheckInDate).FirstOrDefault();
        var lastCleaning = lastReserve != null ? cleaningService.Read(b => b.PropertyId == lastReserve.PropertyId && b.ReservationId == lastReserve.Id).FirstOrDefault() : null;
        HQUser cleaner = lastCleaning != null ? cleaners.Where(b => b.Id == lastCleaning.CleanerId).FirstOrDefault() : null;
        var cleanerName = cleaner != null ? cleaner.UserName : "";
        var summary = new ReservationSummary()
        {
          PropertyId = reserve.PropertyId,
          PropertyName = !reserve.PropertyId.IsNullOrEmpty() ? propertyList.Where(b => b.Id == reserve.PropertyId).FirstOrDefault().Name : "",
          CurrentReservationId = reserve.Id,
          CurrentReservation = reserve,
          LastReservationId = lastReserve != null ? lastReserve.Id : "",
          LastReservation = lastReserve,
          CleaningId = lastCleaning != null ? lastCleaning.Id : "",
          CleaningName = cleanerName,
          CleaningStatus = lastCleaning != null ? (EnumStatus?)lastCleaning.Status : null,
        };
        reservationSummary.Add(summary);
      }
      return reservationSummary.GroupBy(b => b.CurrentReservation.CheckInDate.ToShortDateString()).Select(b =>
      {
        var r = new ReservationSummaryDate()
        {
          CheckInDate = DateTime.Parse(b.Key),
          Reservations = b.ToList()
        };
        return r;
      }).ToList();

    }
  }
}
