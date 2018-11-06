using HQCheckLists.Models.Contents;
using HQCheckLists.ViewModels.Cleanings;
using SDHCC.Core.MethodResponse;
using SDHCC.DB.Content;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace HQCheckLists.Managers
{
  public interface ICleaningManager
  {
    ContentPostModel Create(ClaimsPrincipal User, string propertyId, string reservationId);
    void Create(ClaimsPrincipal User, ContentPostModel model,out MethodResponse response);
    IEnumerable<Cleaning> ReadAllForProperty(ClaimsPrincipal User, string propertyId);

    ContentPostModel Update(ClaimsPrincipal User, string cleaningId);
    void Update(ClaimsPrincipal User, ContentPostModel model, out MethodResponse response);
    Cleaning CleaningGetByReservatinId(ClaimsPrincipal user, string reservationIid);
    CleaningView CleaningGetByCleaningId(ClaimsPrincipal user, string cleaningId);
    IEnumerable<CleanerJob> ReadAllJobForCleaner(ClaimsPrincipal User);

  }
}
