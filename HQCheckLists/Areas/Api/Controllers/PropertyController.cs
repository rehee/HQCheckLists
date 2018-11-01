using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HQCheckLists.Models.Apis;
using HQCheckLists.Models.Contents;
using HQCheckLists.Services.PropertyService;
using Microsoft.AspNetCore.Mvc;

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
    public JsonResult Create(PropertyModel model)
    {
      this.property.CreateProperty(model, User, out var response);
      var result = new ApiResponse<PropertyModel>(response.Success, response.Message, model);
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