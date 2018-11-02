using SDHCC.Core.MethodResponse;
using SDHCC.DB.Content;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace HQCheckLists.Services
{
  public interface ICRUD<T> where T : ContentBase
  {
    ContentPostModel Create(T baseModel);
    void Create(ContentPostModel model, out MethodResponse response);
    IQueryable<T> Read(Expression<Func<T, bool>> where);
    ContentPostModel Update(Expression<Func<T, bool>> where);
    void Update(ContentPostModel model, out MethodResponse response, IEnumerable<string> takeKey = null, IEnumerable<string> ignoreKey = null);
    void Delete(string id);
  }
}
