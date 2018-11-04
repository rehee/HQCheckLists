using HQCheckLists.Models.Enums;
using SDHCC;
using SDHCC.DB.Content;
using SDHCC.DB.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HQCheckLists.Models.Contents
{
  public class Cleaning : HQBaseModel
  {
    [InputType(EditorType = EnumInputType.Hidden)]
    public string PropertyId { get; set; } = "";

    [InputType(EditorType = EnumInputType.Hidden)]
    public string ReservationId { get; set; } = "";

    [InputType(EditorType = EnumInputType.Hidden)]
    public string CleanerId { get; set; } = "";

    [Display(Name = "清洁日期")]
    [InputType(EditorType = EnumInputType.DateTime)]
    public DateTime CleaningDate { get; set; } = DateTime.Now;

    [Display(Name = "床铺套数")]
    [InputType(EditorType = EnumInputType.Number)]
    public int CustomerPrepare { get; set; } = 1;

    [Display(Name = "下客入住天数")]
    [InputType(EditorType = EnumInputType.Number)]
    public int NextBookingDay { get; set; } = 1;

    [Display(Name = "应有澡巾")]
    [InputType(EditorType = EnumInputType.Number)]
    public int NumberBathTowelInit { get; set; } = 1;
    [Display(Name = "实有澡巾")]
    [InputType(EditorType = EnumInputType.Number)]
    public int NumberBathTowelActual { get; set; } = 1;
    [Display(Name = "需带澡巾")]
    [InputType(EditorType = EnumInputType.Number)]
    public int NumberBathTowelBring { get; set; } = 1;
    [Display(Name = "应有手巾")]
    [InputType(EditorType = EnumInputType.Number)]
    public int NumberHandTowelInit { get; set; } = 1;
    [Display(Name = "实有手巾")]
    [InputType(EditorType = EnumInputType.Number)]
    public int NumberHandTowelActual { get; set; } = 1;
    [Display(Name = "需带手巾")]
    [InputType(EditorType = EnumInputType.Number)]
    public int NumberHandTowelBring { get; set; } = 1;

    [Display(Name = "应有地巾")]
    [InputType(EditorType = EnumInputType.Number)]
    public int NumberFloorTowelInit { get; set; } = 1;
    [Display(Name = "实有地巾")]
    [InputType(EditorType = EnumInputType.Number)]
    public int NumberFloorTowelActual { get; set; } = 1;
    [Display(Name = "需带地巾")]
    [InputType(EditorType = EnumInputType.Number)]
    public int NumberFloorTowelBring { get; set; } = 1;


    [Display(Name = "附加需求")]
    [InputType(EditorType = EnumInputType.TextArea)]
    public string SpecialRequirement { get; set; } = "";

    [InputType(EditorType = EnumInputType.Hidden)]
    public EnumStatus Status { get; set; } = EnumStatus.Draft;
  }
}
