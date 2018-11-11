using System;
using System.IO;
using HQCheckLists.Managers;
using HQCheckLists.Models.Contents;
using HQCheckLists.Models.DropDowns;
using HQCheckLists.Models.Users;
using HQCheckLists.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;

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
      services.AddScoped<IPropertyService, PropertyService>();
      services.AddScoped<IPropertyInventoryService, PropertyInventoryService>();
      services.AddScoped<IReservationService, ReservationService>();
      services.AddScoped<ICleaningService, CleaningService>();
      services.AddScoped<ICleaningItemService, CleaningItemService>();
      services.AddScoped<ICleaningPictureService, CleaningPictureService>();

      services.AddScoped<IPropertyManager, PropertyManager>();
      services.AddScoped<IPropertyInventoryManager, PropertyInventoryManager>();
      services.AddScoped<IReservationManager, ReservationManager>();
      services.AddScoped<ICleaningManager, CleaningManager>();
      services.AddScoped<ICleaningItemManager, CleaningItemManager>();
      services.AddScoped<IUserManager, UserManager>();
      services.AddScoped<ICleaningPictureManager, CleaningPictureManager>();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      app.UseMvc(r =>
      {
        r.MapRoute(
          name: "default",
                  template: "{controller=Images}/{action=Index}/{id}/{widthpx}"
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
