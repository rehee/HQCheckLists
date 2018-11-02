using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using HQCheckLists.Models.Contents;
using SDHCC.Core.MethodResponse;
using SDHCC.DB;
using SDHCC.DB.Content;

namespace HQCheckLists.Services.PropertyInventoryServices
{
  public class PropertyInventoryService : ContentCRUD<InventoryModel>, IPropertyInventoryService
  {
    public PropertyInventoryService(ISDHCCDbContext db):base(db)
    {
    }
  }
}
