using Microsoft.AspNetCore.Http;
using SDHCC;
using SDHCC.DB.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HQCheckLists.Models.Contents
{
  public class Reservation : HQBaseModel
  {
    [InputType(EditorType = EnumInputType.Hidden)]
    public string PropertyId { get; set; } = "";

    [InputType(EditorType = EnumInputType.Hidden)]
    public List<string> GuestIds { get; set; } = new List<string>();
    
    [InputType(EditorType = EnumInputType.DateTime)]
    public DateTime CheckInDate { get; set; } = DateTime.Now;

    [InputType(EditorType = EnumInputType.DateTime)]
    public DateTime CheckOutDate { get; set; } = DateTime.Now;

    [Display(Name ="是否需要车位")]
    [InputType(EditorType = EnumInputType.Bool)]
    public bool NeedCarpark { get; set; } = false;

    [InputType(EditorType = EnumInputType.TextArea)]
    public string Comment { get; set; } = "";
  }
}
