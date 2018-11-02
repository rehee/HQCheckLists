using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HQCheckLists.Models.Apis;
using HQCheckLists.Models.Contents;
using HQCheckLists.Services.PropertyInventoryServices;
using Microsoft.AspNetCore.Mvc;
using SDHCC.DB.Content;
using System.Linq.Expressions;

namespace HQCheckLists.Areas.Api.Controllers
{
  [Area("Api")]
  public class PropertyInventoryController : Controller
  {
    IPropertyInventoryService service; 
    public PropertyInventoryController(IPropertyInventoryService service)
    {
      this.service = service;
    }
    public string Index()
    {

      var a = service.Read(c => c.ParentId=="");
      var b = a.ToList();
      return "";
    }
    [HttpGet]
    public JsonResult Create(string id)
    {
      var result = new ApiResponse<ContentPostModel>();
      if (id.IsNullOrEmpty() || User.IsInHQRole(EnumPages.InventoryCreate))
        return Json(result);
      var inventory = new InventoryModel();
      inventory.ParentId = id;
      result.Success = true;
      result.Data = inventory.ConvertToPassingModel();
      return Json(result);

    }
    [HttpPost]
    public JsonResult Create(ContentPostModel model)
    {
      var result = new ApiResponse<ContentPostModel>();
      if (model == null || model.ParentId.IsNullOrEmpty() || User.IsInHQRole(EnumPages.InventoryCreate))
        return Json(result);
      ContentBase.context.AddContent(model.ConvertToBaseModel());
      result.Success = true;
      return Json(result);
    }
    [HttpPost]
    public JsonResult Read(string parentId, string inventoryId)
    {
      var result = new ApiResponse<List<InventoryModel>>();
      result.Data = new List<InventoryModel>();

      return Json(result);

    }
    public JsonResult Update(string inventoryId)
    {
      var result = new ApiResponse<ContentPostModel>();
      if (User.IsInHQRole(EnumPages.InventoryUpdate) || inventoryId.IsNullOrEmpty())
        return Json(result);
      var inventory = ContentBase.context.GetContent(inventoryId);
      if (inventory != null)
      {
        result.Success = true;
        result.Data = inventory.ConvertToPassingModel();
      }
      return Json(result);
    }
    [HttpPost]
    public JsonResult Update(ContentPostModel model)
    {
      var result = new ApiResponse<ContentPostModel>();
      if (model == null || model.ParentId.IsNullOrEmpty() || model.Id.IsNullOrEmpty())
        return Json(result);

      var inven = ContentBase.context.GetContent(model.Id);
      if (inven == null)
        return Json(result);
      var invenPass = inven.ConvertToPassingModel();
      invenPass.Properties = model.Properties;
      var iBack = invenPass.ConvertToBaseModel();
      ContentBase.context.UpdateContent(iBack);
      result.Success = true;
      return Json(result);
    }
    [HttpPost]
    public JsonResult Delete(string id)
    {
      return null;
    }
  }
}