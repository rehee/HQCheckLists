using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using HQCheckLists.Models.Users;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;

namespace HQCheckLists
{
  public class Startup
  {
    public Startup(IConfiguration configuration, IHostingEnvironment hostingEnvironment)
    {
      Configuration = configuration;
      HostingEnvironment = hostingEnvironment;
    }
    //http://jackhiston.com/2017/8/15/sharing-controllers-and-views-in-aspnet-core/
    public IConfiguration Configuration { get; }
    public IHostingEnvironment HostingEnvironment { get; }
    // This method gets called by the runtime. Use this method to add services to the container.
    // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
    public void ConfigureServices(IServiceCollection services)
    {
      var assemblyView = Assembly.Load("SDHCC.Admins.Views");
      services.AddMvc()
        .AddApplicationPart(assemblyView);
      services.Configure<RazorViewEngineOptions>(options =>
      {
        options.FileProviders.Add(
            new EmbeddedFileProvider(assemblyView));
      });

      StartUpFunction.ConfigureServices<HQUser, HQCheckLists.Models.Contents.ContentBaseModel, HQCheckLists.Models.DropDowns.DropDownModel>(
        services, Configuration, HostingEnvironment);
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

      StartUpFunction.Configure(app, env);
    }
  }
}
