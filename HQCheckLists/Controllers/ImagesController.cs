using System;
using System.Collections.Generic;
using System.IO;
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
      catch (Exception ex)
      {
        return null;
      }
    }
    public IActionResult CleaningPic(string id, int widthpx = 0)
    {
      try
      {
        if (string.IsNullOrEmpty(id))
          return null;
        var item = db.Where<CleaningPicture>(b => b.Id == id).FirstOrDefault();
        if (item == null)
          return null;
        if (String.IsNullOrEmpty(item.Image))
          return null;
        var a = item.Image.GetFileStreamFromPath(this, widthpx);
        var c = Convert.ToBase64String(ReadFully(a));
        var f = item.Image.GetFileFromPath(this, widthpx);
        return f;
      }
      catch (Exception ex)
      {
        return null;
      }
    }
    public IActionResult CleanItem(string id, int widthpx = 0)
    {
      try
      {
        if (string.IsNullOrEmpty(id))
          return null;
        var item = db.Where<CleaningItem>(b => b.Id == id).FirstOrDefault();
        if (item == null)
          return null;
        if (String.IsNullOrEmpty(item.Images))
          return null;
        var a = item.Images.GetFileStreamFromPath(this, widthpx);
        var c = Convert.ToBase64String(ReadFully(a));
        var f = item.Images.GetFileFromPath(this, widthpx);
        return f;
      }
      catch (Exception ex)
      {
        return null;
      }
    }

    public Stream CleaningPics(string id, int widthpx = 0)
    {
      try
      {
        if (string.IsNullOrEmpty(id))
          return null;
        var item = db.Where<CleaningPicture>(b => b.Id == id).FirstOrDefault();
        if (item == null)
          return null;
        if (String.IsNullOrEmpty(item.Image))
          return null;
        var a = item.Image.GetFileStreamFromPath(this, widthpx);
        return a;
      }
      catch (Exception ex)
      {
        return null;
      }
    }
    public static byte[] ReadFully(Stream input)
    {
      byte[] buffer = new byte[16 * 1024];
      using (MemoryStream ms = new MemoryStream())
      {
        int read;
        while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
        {
          ms.Write(buffer, 0, read);
        }
        return ms.ToArray();
      }
    }
  }
}