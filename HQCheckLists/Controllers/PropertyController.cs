using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HQCheckLists.Models.Contents;
using Microsoft.AspNetCore.Mvc;
using SDHCC.DB;

namespace HQCheckLists.Controllers
{
  public class PropertyController : Controller
  {
    ISDHCCDbContext db;
    public PropertyController(ISDHCCDbContext db)
    {
      this.db = db;
    }
    public JsonResult GetAllProperties()
    {
      var content = db.GetChildrenContent("").Select(b => b as PropertyModel).ToList();
      return Json(content);
    }
    public JsonResult GetInventoryByProperty(string propertyId)
    {
      if (string.IsNullOrEmpty(propertyId))
      {
        return null;
      }
      var content = db.GetChildrenContent(propertyId).Select(b => b as InventoryModel).ToList();
      return Json(content);
    }
    [HttpPost]
    public JsonResult CreatePropertyInventory(InventoryModel model)
    {
      var a = model;
      return Json("Ok");
    }
  }
}