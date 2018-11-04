using HQCheckLists.Models.Contents;
using SDHCC.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HQCheckLists.Services
{
  public class CleaningItemService : CRUD<CleaningItem>, ICleaningItemService
  {
    public CleaningItemService(ISDHCCDbContext db) : base(db)
    {
    }
  }
}
