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
  public interface ICleaningItemManager
  {
    IEnumerable<ContentPostModel> CleaningItemsPostByCleaningId(ClaimsPrincipal user, string cleaningId);
    void CleaningItemUpdate(ClaimsPrincipal user, ContentPostModel model, out MethodResponse response);
    IEnumerable<CleaningItem> CleaningItemsByCleaningId(ClaimsPrincipal user, string cleaningId);
    
  }
}
