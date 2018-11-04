﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HQCheckLists.Models.Contents;
using Microsoft.AspNetCore.Mvc;
using SDHCC.DB;

namespace HQCheckLists.Controllers
{
  public class buildController : Controller
  {
    ISDHCCDbContext db;
    public buildController(ISDHCCDbContext db)
    {
      this.db = db;
    }
    public IActionResult Inventory(string id, int widthpx = 0)
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
        return item.Image.GetFileFromPath(this, widthpx);
      }
      catch
      {
        return null;
      }
    }
    public IActionResult Property(string id, int widthpx = 0)
    {
      try
      {
        if (string.IsNullOrEmpty(id))
          return null;
        var item = db.GetContent(id).MyTryConvert<PropertyModel>();
        if (item == null)
          return null;
        if (String.IsNullOrEmpty(item.Image))
          return null;
        var a = item.Image.GetFileStreamFromPath(this, widthpx);
        return item.Image.GetFileFromPath(this, widthpx);
      }
      catch(Exception ex)
      {
        return null;
      }
    }
  }
}