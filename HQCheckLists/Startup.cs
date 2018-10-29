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
      var a = configuration.GetConnectionString("DefaultConnection");
      E.Setting = configuration.GetSection("SiteSetting").Get<SiteSetting>();

      if (hostingEnvironment.IsDevelopment())
      {
        E.Setting = configuration.GetSection("SiteSetting").Get<SiteSetting>();
      }
      else
      {
        E.Setting = configuration.GetSection("SiteSetting").Get<SiteSetting>();
      }
      //TelemetryConfiguration.Active.DisableTelemetry = true;
      //services.Configure<CookiePolicyOptions>(options =>
      //{
      //  // This lambda determines whether user consent for non-essential cookies is needed for a given request.
      //  options.CheckConsentNeeded = context => true;
      //  options.MinimumSameSitePolicy = SameSiteMode.None;
      //});
      var dbConnect = @"mongodb+srv://rehee_1:rehee_1_psw@cluster0-igkz0.gcp.mongodb.net/test?retryWrites=true";
      dbConnect = configuration.GetConnectionString("DefaultConnection");
      var dbName = configuration["DatabaseName"];

      services.AddSingleton<IMongoDatabase>(s =>
      {
        var client = new MongoClient(dbConnect);
        var database = client.GetDatabase(dbName);
        return database;
      });
      SDHCCBaseEntity.db = () =>
      {
        var client = new MongoClient(dbConnect);
        var database = client.GetDatabase(dbName);
        return database;
      };
      SDHCCBaseEntity.context = new SDHCCDbContext(SDHCCBaseEntity.db());
      E.RootPath = hostingEnvironment.WebRootPath;
      ContentE.RootPath = hostingEnvironment.WebRootPath;

      ContentE.RootType = typeof(ContentBaseModel);
      ContentE.RootDropDown = typeof(DropDownModel);

      services.AddScoped<ISDHCCDbContext, SDHCCDbContext>();
      services.AddScoped<IRoleStore<IdentityRole>, SDHCCRoleStore<IdentityRole, SDHCUserRole>>();
      //services.AddScoped<IUserRoleStore<MUser>, SDHCCUserRoleStore<MUser, MRole, MUserRole>>();

      services.AddScoped<IUserStore<HQUser>, SDHCCUserStore<HQUser, IdentityRole, SDHCUserRole>>();
      services.AddScoped<UserManager<HQUser>>();

      services.AddScoped<RoleManager<IdentityRole>>();
      services.AddScoped<ISDHCCIdentity, SDHCCIdentity<HQUser>>();
      services.AddIdentity<HQUser, IdentityRole>(options =>
      {

      }).AddDefaultTokenProviders();
      services.Configure<CookieAuthenticationOptions>(options =>
      {
        options.LoginPath = new PathString("/login");
      });


      //services.AddDefaultIdentity<IdentityUser>().AddDefaultTokenProviders();
      //.AddEntityFrameworkStores<ApplicationDbContext>();
      var assembly = typeof(SDHCC.Admins.Controllers.PageController).Assembly;
      var assemblyView = Assembly.Load("SDHCC.Admins.Views");
      services.AddMvc()
        .AddApplicationPart(assembly)
        //.ConfigureRazorViewEngine(options =>
        //{
        //  var oldRoot = ApplicationEnviroment.ApplicationBasePath;
        //  var trimmedRoot = oldRoot.Remove(oldRoot.LastIndexOf('\\'));

        //  options.FileProvider = new PhysicalFileProvider(trimmedRoot);
        //})
        ////.AddApplicationPart(assemblyView)
        //.ConfigureApplicationPartManager(m =>
        //{
        //  var feature = new ControllerFeature();
        //  m.ApplicationParts.Add(new AssemblyPart(assembly));
        //  m.PopulateFeature(feature);
        //  services.AddSingleton(feature.Controllers.Select(t => t.AsType()).ToArray());
        //})
        //.AddRazorOptions(options =>
        //{
        //  options.AddCloudscribeSimpleContentBootstrap3Views(assembly);
        //})
        .AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());
      services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
        .AddCookie(options =>
        {
          options.LoginPath = E.Setting.Login;
        });
      services.Configure<RazorViewEngineOptions>(options =>
      {
        options.FileProviders.Add(
            new EmbeddedFileProvider(assemblyView, "SDHCC.Admins.Views"));
      });
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
