using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SDHCC.DB.Content;

namespace HQCheckLists.Controllers
{
  public class HomeController : Controller
  {
    public IActionResult Index()
    {
      var d = ContentBase.context.GetContent("");
      return View();
    }
  }
}