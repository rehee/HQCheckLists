using HQCheckLists.Models.Contents;
using SDHCC.Core.MethodResponse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace HQCheckLists.Services.PropertyService
{
  public interface IPropertyService
  {
    IEnumerable<PropertyModel> GetAllPropertyByUser(ClaimsPrincipal user, out MethodResponse response);
    PropertyModel GetPropertyById(string propertyId, ClaimsPrincipal user, out MethodResponse response);
    void CreateProperty(PropertyModel property, ClaimsPrincipal user, out MethodResponse response);
    void UpdateProperty(PropertyModel property, ClaimsPrincipal user, out MethodResponse response);
  }
}
