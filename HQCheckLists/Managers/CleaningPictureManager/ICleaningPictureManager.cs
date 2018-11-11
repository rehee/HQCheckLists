using HQCheckLists.Models.Contents;
using SDHCC.Core.MethodResponse;
using SDHCC.DB.Content;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace HQCheckLists.Managers
{
  public interface ICleaningPictureManager
  {
    ContentPostModel CreateCleaningPic(ClaimsPrincipal user, string cleaningId);
    void CreateCleaningPic(ClaimsPrincipal user, ContentPostModel model, out MethodResponse response);
    CleaningPicture GetCleaningPicById(ClaimsPrincipal user, string cleaningPictureId);
    IEnumerable<CleaningPicture> GetCleaningPicsByCleaningId(ClaimsPrincipal user, string cleaningId);
    ContentPostModel UpdateCleaningPic(ClaimsPrincipal user, string cleaningPicId);
    void UpdateCleaningPic(ClaimsPrincipal user, ContentPostModel model, out MethodResponse response);
    void DeleteCleaningPic(ClaimsPrincipal user, CleaningPicture model, out MethodResponse response);
  }
}
