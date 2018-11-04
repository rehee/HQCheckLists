using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using SDHCC.Core.MethodResponse;
using SDHCC.DB;
using SDHCC.DB.Content;

namespace HQCheckLists.Services
{
  public abstract class CRUD<T> : ICRUD<T> where T : ContentBase, new()
  {
    protected ISDHCCDbContext db;
    public CRUD(ISDHCCDbContext db)
    {
      this.db = db;
    }
    public virtual ContentPostModel Create(T baseModel)
    {
      return baseModel.ConvertToPassingModel();
    }
    public virtual void Create(ContentPostModel model, out MethodResponse response)
    {
      var content = model.ConvertToBaseModel();
      response = new MethodResponse();
      try
      {
        db.Add<T>((T)content, out response);
        model.Id = content.Id;
      }
      catch { }
    }
    public virtual IQueryable<T> Read(Expression<Func<T, bool>> where)
    {
      var type = typeof(T);
      return db.Where<T>(where);
    }
    public virtual ContentPostModel Update(Expression<Func<T, bool>> where)
    {
      try
      {
        var baseContent = Read(where).FirstOrDefault();
        if (baseContent == null)
          return null;
        return baseContent.ConvertToPassingModel();
      }
      catch
      {
        return null;
      }
    }
    public virtual void Update(ContentPostModel model, out MethodResponse response, IEnumerable<string> takeKey = null, IEnumerable<string> ignoreKey = null)
    {
      response = new MethodResponse();
      try
      {
        var baseModel = Read(b => b.Id == model.Id).FirstOrDefault();
        if (baseModel == null)
          return;
        baseModel.Name = model.Name;
        baseModel.SortOrder = model.SortOrder;
        var basePass = baseModel.ConvertToPassingModel();
        basePass.Properties = model.Properties;
        db.Update<T>((T)basePass.ConvertToBaseModel(), basePass.Id, out response);
      }
      catch { }
    }
    public virtual void Delete(string id)
    {
      var model = Read(b => b.Id == id).FirstOrDefault();
      if (model == null)
        return;
      db.Remove<T>(model, id);
    }
  }
}
