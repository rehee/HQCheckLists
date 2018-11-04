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
  public class ReservationManager : IReservationManager
  {
    IPropertyService propertyService;
    IReservationService reservationService;
    ISDHCCIdentity userService;
    public ReservationManager(IPropertyService propertyService, IReservationService reservationService, ISDHCCIdentity userService)
    {
      this.propertyService = propertyService;
      this.reservationService = reservationService;
      this.userService = userService;
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
  }
}
