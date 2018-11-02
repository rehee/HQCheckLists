using HQCheckLists.Services.PropertyService;
using SDHCC.Identity.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HQCheckLists.Managers
{
  public class PropertyManager : IPropertyManager
  {
    IPropertyService ps;
    ISDHCCIdentity us;
    public PropertyManager(IPropertyService ps, ISDHCCIdentity us)
    {
      this.ps = ps;
      this.us = us;
    }

  }
}
