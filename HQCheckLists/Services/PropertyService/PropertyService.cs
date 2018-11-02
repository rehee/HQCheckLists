using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using HQCheckLists.Models.Contents;
using HQCheckLists.Models.Users;
using MongoDB.Bson;
using SDHCC;
using SDHCC.Core.MethodResponse;
using SDHCC.DB;
using SDHCC.DB.Content;
using SDHCC.Identity.Services;

namespace HQCheckLists.Services.PropertyService
{
  public class PropertyService : ContentCRUD<PropertyModel>, IPropertyService
  {
    public PropertyService(ISDHCCDbContext db) : base(db)
    {
    }

  }
}
