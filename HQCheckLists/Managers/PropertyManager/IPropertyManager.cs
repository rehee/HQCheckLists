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
  public interface IPropertyManager
  {
    IEnumerable<PropertyModel> GetAllProperty(ClaimsPrincipal user);
    PropertyModel GetProperty(ClaimsPrincipal user, string propertyId);
    ContentPostModel CreateProperty(ClaimsPrincipal user);
    void CreateProperty(ClaimsPrincipal user, ContentPostModel model, out MethodResponse response);
    ContentPostModel UpdateProperty(ClaimsPrincipal user, string propertyId);
    void UpdateProperty(ClaimsPrincipal user, ContentPostModel model, out MethodResponse response, IEnumerable<string> takeKey = null, IEnumerable<string> ignoreKey = null);
  }
}
