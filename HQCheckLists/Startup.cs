using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using HQCheckLists.Models.Contents;
using HQCheckLists.Models.DropDowns;
using HQCheckLists.Models.Users;
using HQCheckLists.Services.PropertyInventoryServices;
using HQCheckLists.Services.PropertyService;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using MongoDB.Driver;
using Newtonsoft.Json.Serialization;
using SDHCC;
using SDHCC.DB;
using SDHCC.DB.Models;
using SDHCC.Identity;
using SDHCC.Identity.Models.UserRoles;
using SDHCC.Identity.Services;

namespace HQCheckLists
{
 public class Startup
  {

    public Startup(IConfiguration configuration, IHostingEnvironment hostingEnvironment)
    {
      this.configuration = configuration;
      this.hostingEnvironment = hostingEnvironment;
    }
    //http://jackhiston.com/2017/8/15/sharing-controllers-and-views-in-aspnet-core/
    public IConfiguration configuration { get; }
    public IHostingEnvironment hostingEnvironment { get; }
    public void ConfigureServices(IServiceCollection services)
    {
      StartUpFunction.ConfigureServices<HQUser, HQBaseModel, HQDropDownModel>(services, configuration, hostingEnvironment);
      services.AddScoped(typeof(IPropertyService), typeof(PropertyService));
      services.AddScoped<IPropertyInventoryService, PropertyInventoryService>();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      app.UseMvc(r =>
      {
        r.MapRoute(
          name: "default",
                  template: "{controller=Images}/{action=Index}/{id}/{token}"
          );
      });
      app.UseFileServer(new FileServerOptions
      {
        FileProvider = new PhysicalFileProvider(
          Path.Combine(Directory.GetCurrentDirectory(), "SPA/www")),
        RequestPath = "",
        EnableDirectoryBrowsing = false
      });

      app.UseDeveloperExceptionPage();
      StartUpFunction.Configure(app, env);
    }
  }
}
