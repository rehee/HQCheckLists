using SDHCC;
using SDHCC.DB.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HQCheckLists.Models.Contents
{
  public class CleaningPicture : HQBaseModel
  {
    [InputType( EditorType = EnumInputType.Hidden)]
    public string CleaningId { get; set; }
    [Display(Name ="图片")]
    [InputType(EditorType = EnumInputType.FileUpload)]
    public string Image { get; set; }
    [Display(Name = "备注")]
    [InputType(EditorType = EnumInputType.TextArea)]
    public string Comment { get; set; }
  }
}
