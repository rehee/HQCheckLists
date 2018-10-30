using Microsoft.AspNetCore.Http;
using MongoDB.Bson.Serialization.Attributes;
using SDHCC;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HQCheckLists.Models.Contents
{
  [AllowChildren(
    ChildrenType = new Type[] { },
    CreateRoles = new string[] { "Admin" },
    EditRoles = new string[] { "Admin" })]

  public class InventoryModel : HQBaseModel
  {
    public decimal QTY { get; set; } = 0;
    public string Image { get; set; } = "";
    public string ImgToken { get; set; } = "";
    public bool IsPercentage { get; set; } = false;
    [IgnoreEdit]
    [BsonIgnore]
    public IFormFile ImageUpload { get; set; } = null;
    [IgnoreEdit]
    [BsonIgnore]
    public IFormFile fff { get; set; } = null;
  }
}
