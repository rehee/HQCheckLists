﻿using SDHCC.DB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HQCheckLists.Models.Contents
{
  public class CheckInItem : SDHCCBaseEntity
  {
    public string CheckInId { get; set; }
    public string InventoryId { get; set; }
    public decimal InitNumber { get; set; }
    public decimal ActuallyNumber { get; set; }
    public string Comment { get; set; }
    public string Images { get; set; }
  }
}
