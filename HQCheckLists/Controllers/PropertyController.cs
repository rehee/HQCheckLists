﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using HQCheckLists.Models.Contents;
using Microsoft.AspNetCore.Http;
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

    public JsonResult GetPropertyInventory(string id)
    {
      if (String.IsNullOrEmpty(id))
        return null;
      var model = db.GetContent(id).MyTryConvert<InventoryModel>();
      return Json(model);
    }

    [HttpPost]
    public JsonResult CreatePropertyInventory(InventoryModel model)
    {
      return null;
    }
    
    [HttpPost]
    public JsonResult UpdatePropertyInventory(InventoryModel model)
    {
      
      return Json("Ok");
    }

  }
}