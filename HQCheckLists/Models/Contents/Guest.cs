using Microsoft.AspNetCore.Http;
using SDHCC.DB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HQCheckLists.Models.Contents
{
  public class Guest : SDHCCBaseEntity
  {
    public string GuestIdentity { get; set; } = "";
    public IFormFile GuestIdentityFile { get; set; } = null;
    public string Comment { get; set; } = "";
  }
}
