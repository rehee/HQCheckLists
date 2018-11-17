using HQCheckLists.Models.Contents;
using HQCheckLists.ViewModels.Reservations;
using SDHCC.Core.MethodResponse;
using SDHCC.DB.Content;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace HQCheckLists.Managers
{
  public interface IReservationManager
  {

    IEnumerable<Reservation> ReservationGetAll(ClaimsPrincipal user, string propertyId);

    ContentPostModel ReservationCreate(ClaimsPrincipal user, string propertyId);
    void ReservationCreate(ClaimsPrincipal user, ContentPostModel model, out MethodResponse response);

    ContentPostModel ReservationUpdate(ClaimsPrincipal user, string reservationId);
    void ReservationUpdate(ClaimsPrincipal user, ContentPostModel model, out MethodResponse response);
    IEnumerable<ReservationSummaryDate> ReadReservationSummaryListByLength(ClaimsPrincipal user, int length);
  }
}
