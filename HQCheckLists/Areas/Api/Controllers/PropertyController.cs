using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HQCheckLists.Models.Apis;
using HQCheckLists.Models.Contents;
using HQCheckLists.Services.PropertyService;
using Microsoft.AspNetCore.Mvc;
using SDHCC.DB.Content;

namespace HQCheckLists.Areas.Api.Controllers
{
  [Area("Api")]
  public class PropertyController : Controller
  {
    IPropertyService property;
    public PropertyController(IPropertyService property)
    {
      this.property = property;
    }
    public JsonResult Index()
    {
      var result = property.GetAllPropertyByUser(User, out var response);
      return Json(new ApiResponse<IEnumerable<PropertyModel>>(response.Success, response.Message, result));
    }

    [HttpPost]
    public JsonResult PreCreate()
    {
      var model = new PropertyModel().ConvertToPassingModel();
      return Json(new ApiResponse<ContentPostModel>(true, null, model));
    }
    [HttpPost]
    public JsonResult PostModel(ContentPostModel model)
    {
      var result = new ApiResponse<ContentPostModel>();
      if (model.Id.IsNullOrEmpty())
      {
        var p = model.ConvertToBaseModel();
        property.CreateProperty((PropertyModel)p, User, out var response);
        result.Success = true;
        return Json(result);
      }
      else
      {
        var p = this.property.GetPropertyById(model.Id, User, out var response);
        if (response.Success)
        {
          var pass = p.ConvertToPassingModel();
          pass.Properties = model.Properties;
          this.property.UpdateProperty((PropertyModel)pass.ConvertToBaseModel(), User, out var res);
          result.Success = res.Success;
        }
      }
      return Json(result);


    }
    [HttpPost]
    public JsonResult Create(PropertyModel model)
    {
      this.property.CreateProperty(model, User, out var response);
      var result = new ApiResponse<PropertyModel>(response.Success, response.Message, model);
      return Json(result);
    }
    
    [HttpGet]
    public JsonResult Update(string id)
    {
      var result = new ApiResponse<ContentPostModel>();
      if(id.IsNullOrEmpty())
        return Json(result);
      var p = property.GetPropertyById(id, User, out var response);
      if (response.Success)
      {
        result.Success = true;
        result.Data = p.ConvertToPassingModel();
      }
      return Json(result);
    }
    [HttpPost]
    public JsonResult Update(PropertyModel model)
    {
      this.property.CreateProperty(model, User, out var response);
      var result = new ApiResponse<PropertyModel>(response.Success, response.Message, model);
      return Json(result);
    }
  }
}