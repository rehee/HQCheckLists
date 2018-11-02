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
  public abstract class ContentCRUD<T> : ICRUD<T> where T : ContentBase
  {
    protected ISDHCCDbContext db;
    public ContentCRUD(ISDHCCDbContext db)
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
        db.AddContent(content);
        model.Id = content.Id;
        response.Success = true;
      }
      catch { }
    }
    public virtual IQueryable<T> Read(Expression<Func<T, bool>> where)
    {
      return db.Where<T>(b => b["_t"] == nameof(T), db.BaseContentType, db.ConvertBsonToGeneric<T>()).Where(where);
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
        var basePass = baseModel.ConvertToPassingModel();
        basePass.Properties = model.Properties;
        db.UpdateContent(basePass.ConvertToBaseModel(), ignoreKey, takeKey);
      }
      catch { }
    }
    public virtual void Delete(string id)
    {
      db.RemoveContent(id);
    }
  }
}
