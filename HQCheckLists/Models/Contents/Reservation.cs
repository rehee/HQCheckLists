using Microsoft.AspNetCore.Http;
using SDHCC.DB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HQCheckLists.Models.Contents
{
  public class Reservation : SDHCCBaseEntity
  {
    public string PropertyId { get; set; } = "";
    public List<string> GuestIds { get; set; } = new List<string>();
    public DateTime CheckInDate { get; set; } = DateTime.Now;
    public DateTime CheckOutDate { get; set; } = DateTime.Now;
    public bool NeedCarpark { get; set; } = false;
    public string Comment { get; set; } = "";
  }
}
