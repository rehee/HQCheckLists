using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HQCheckLists.Models.Contents;
using Microsoft.AspNetCore.Mvc;

namespace HQCheckLists.Areas.Api.Controllers
{
  [Area("Api")]
  public class PropertyInventoryController : Controller
  {
    public JsonResult Index()
    {
      return null;
    }
    [HttpPost]
    public JsonResult GetPropertyInventory(IEnumerable<string>Ids)
    {
      return null;
    }
    [HttpPost]
    public JsonResult CreatePropertyInventory(InventoryModel model)
    {
      return null;
    }
    [HttpPost]
    public JsonResult UpdatePropertyInventory(InventoryModel model)
    {
      return null;
    }
    [HttpPost]
    public JsonResult RemovePropertyInventory(string id)
    {
      return null;
    }
  }
}