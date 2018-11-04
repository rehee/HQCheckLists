using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HQCheckLists.Models
{
  public class AccessPermissions
  {
    public List<string> PropertyIndex { get; set; } = 
      new List<string>() { E.Setting.AdminRole, HQE.Setting.LandlordRole };
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

    public List<string> ReservationCreate { get; set; } =
      new List<string>() { E.Setting.AdminRole };
    public List<string> ReservationRead { get; set; } =
      new List<string>() { E.Setting.AdminRole };
    public List<string> ReservationUpdate { get; set; } =
      new List<string>() { E.Setting.AdminRole };
    public List<string> ReservationDelete { get; set; } =
      new List<string>() { E.Setting.AdminRole };

    public List<string> CleaningCreate { get; set; } =
      new List<string>() { E.Setting.AdminRole };
    public List<string> CleaningRead { get; set; } =
      new List<string>() { E.Setting.AdminRole, HQE.Setting.CleanerRole };
    public List<string> CleaningUpdate { get; set; } =
      new List<string>() { E.Setting.AdminRole, HQE.Setting.CleanerRole };
    public List<string> CleaningDelete { get; set; } =
      new List<string>() { E.Setting.AdminRole };

    public List<string> CleaningItemCreate { get; set; } =
      new List<string>() { E.Setting.AdminRole };
    public List<string> CleaningItemRead { get; set; } =
      new List<string>() { E.Setting.AdminRole, HQE.Setting.CleanerRole };
    public List<string> CleaningItemUpdate { get; set; } =
      new List<string>() { E.Setting.AdminRole, HQE.Setting.CleanerRole };
    public List<string> CleaningItemDelete { get; set; } =
      new List<string>() { E.Setting.AdminRole };
  }
}
