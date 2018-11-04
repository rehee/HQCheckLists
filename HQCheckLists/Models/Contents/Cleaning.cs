using SDHCC.DB.Content;
using SDHCC.DB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HQCheckLists.Models.Contents
{
  public class Cleaning : HQBaseModel
  {
    public string PropertyId { get; set; } = "";
    public string ReservationId { get; set; } = "";
    public DateTime CheckInDate { get; set; } = DateTime.Now;
    
    public string CleanerId { get; set; } = "";
    public string SpecialRequirement { get; set; } = "";
  }
}
