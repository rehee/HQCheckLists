using SDHCC;
using SDHCC.DB.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HQCheckLists.Models.Contents
{
  public class CleaningItem : HQBaseModel
  {
    [InputType( EditorType = EnumInputType.Hidden)]
    public string CleaningId { get; set; }
    [InputType(EditorType = EnumInputType.Hidden)]
    public string InventoryId { get; set; }

    [InputType(EditorType = EnumInputType.Hidden)]
    public bool IsFull { get; set; } = false;

    [Display(Name = "应有数量")]
    [InputType(EditorType = EnumInputType.Number)]
    public decimal InitNumber { get; set; }
    [Display(Name = "实有数量")]
    [InputType(EditorType = EnumInputType.Hidden)]
    public decimal ActuallyNumber { get; set; }

    [InputType(EditorType = EnumInputType.Hidden)]
    public bool IsPercentage { get; set; } = false;
    [InputType(EditorType = EnumInputType.Hidden)]
    public string Comment { get; set; }
    [InputType(EditorType = EnumInputType.Hidden)]
    public string Images { get; set; }
  }
}
