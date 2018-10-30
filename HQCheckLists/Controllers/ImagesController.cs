using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HQCheckLists.Models.Contents;
using Microsoft.AspNetCore.Mvc;
using SDHCC.DB;

namespace HQCheckLists.Controllers
{
  public class ImagesController : Controller
  {
    ISDHCCDbContext db;
    public ImagesController(ISDHCCDbContext db)
    {
      this.db = db;
    }
    public IActionResult Inventory(string id)
    {
      try
      {
        if (string.IsNullOrEmpty(id))
          return null;
        var item = db.GetContent(id).MyTryConvert<InventoryModel>();
        if (item == null)
          return null;
        if (String.IsNullOrEmpty(item.Image))
          return null;
        return item.Image.GetFileFromPath(this);
      }
      catch
      {
        return null;
      }
      
    }
  }
}