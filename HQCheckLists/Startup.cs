using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using HQCheckLists.Models.Contents;
using HQCheckLists.Models.DropDowns;
using HQCheckLists.Models.Users;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Razor;
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
  public static class starts{
    public static RazorViewEngineOptions AddCloudscribeSimpleContentBootstrap3Views(this RazorViewEngineOptions options, Assembly ass)
    {
      options.FileProviders.Add(new EmbeddedFileProvider(
                  ass
            ));

      return options;
    }
  }
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
    // This method gets called by the runtime. Use this method to add services to the container.
    // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
    public void ConfigureServices(IServiceCollection services)
    {
      StartUpFunction.ConfigureServices<HQUser, HQBaseModel, HQDropDownModel>(services, configuration, hostingEnvironment);
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
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
