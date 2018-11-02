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
using HQCheckLists.Managers;

namespace HQCheckLists.Areas.Api.Controllers
{
  [Area("Api")]
  public class PropertyInventoryController : Controller
  {
    IPropertyInventoryManager propertyInventoryManager;
    public PropertyInventoryController(IPropertyInventoryManager propertyInventoryManager)
    {
      this.propertyInventoryManager = propertyInventoryManager;
    }
    [HttpGet]
    public JsonResult Create(string propertyId)
    {
      var model = propertyInventoryManager.CreateInventory(User, propertyId);
      return Json(new ApiResponse<ContentPostModel>(model != null, null, model));
    }
    [HttpPost]
    public JsonResult Create(ContentPostModel model)
    {
      propertyInventoryManager.CreateInventory(User, model, out var response);
      return Json(new ApiResponse<ContentPostModel>(response.Success, null, model));
    }
    public JsonResult Read(string propertyId)
    {
      var result = propertyInventoryManager.GetAllInventory(User, propertyId);
      return Json(
        new ApiResponse<IEnumerable<InventoryModel>>(result != null, null, result));
    }
    public JsonResult Update(string inventoryId)
    {
      var model = propertyInventoryManager.UpdateInventory(User, inventoryId);
      return Json(
        new ApiResponse<ContentPostModel>(model != null, null, model));
    }
    [HttpPost]
    public JsonResult Update(ContentPostModel model)
    {
      propertyInventoryManager.UpdateInventory(User, model, out var response);
      return Json(
        new ApiResponse<ContentPostModel>(response.Success, null, model));
    }

    [HttpPost]
    public JsonResult UpdateQty([FromBody]UpQTY m)
    {
      var result = new ApiResponse<object>();
      var model = propertyInventoryManager.UpdateInventory(User, m.inventoryId);
      if (model == null)
        return Json(result);
      var baseModel = (InventoryModel)model.ConvertToBaseModel();
      baseModel.QTY = m.number.MyTryConvert<decimal>();
      propertyInventoryManager.UpdateInventory(User, baseModel.ConvertToPassingModel(), out var response);
      result.Success = response.Success;
      return Json(result);
    }

  }
  public class UpQTY
  {
    public string inventoryId { get; set; }
    public string number { get; set; }
  }
}