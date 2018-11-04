using SDHCC.Core.MethodResponse;
using SDHCC.DB.Content;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace HQCheckLists.Services
{
  public interface IPropertyCRUD<T> : ICRUD<T> where T : ContentBase
  {

  }
}
