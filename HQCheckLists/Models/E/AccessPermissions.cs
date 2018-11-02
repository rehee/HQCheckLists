using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HQCheckLists.Models
{
  public class AccessPermissions
  {
    public List<string> PropertyIndex { get; set; } = 
      new List<string>() { E.Setting.AdminRole, "Landload" };
    public List<string> PropertyCreate { get; set; } = 
      new List<string>() { E.Setting.AdminRole };
    public List<string> PropertyUpdate { get; set; } = 
      new List<string>() { E.Setting.AdminRole };

    public List<string> InventoryCreate { get; set; } =
      new List<string>() { E.Setting.AdminRole };
    public List<string> InventoryRead { get; set; } =
      new List<string>() { E.Setting.AdminRole };
    public List<string> InventoryUpdate { get; set; } =
      new List<string>() { E.Setting.AdminRole };
    public List<string> InventoryDelete { get; set; } =
      new List<string>() { E.Setting.AdminRole };

  }
}
