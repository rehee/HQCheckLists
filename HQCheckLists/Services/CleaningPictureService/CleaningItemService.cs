using HQCheckLists.Models.Contents;
using SDHCC.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HQCheckLists.Services
{
  public class CleaningPictureService : CRUD<CleaningPicture>, ICleaningPictureService
  {
    public CleaningPictureService(ISDHCCDbContext db) : base(db)
    {
    }
  }
}
