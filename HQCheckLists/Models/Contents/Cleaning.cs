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

    [Display(Name = "当前客人数量")]
    [InputType(EditorType = EnumInputType.Number)]
    public int CurrentGuestNumber { get; set; } = 1;

    [Display(Name = "下位客人数量")]
    [InputType(EditorType = EnumInputType.Number)]
    public int NextGuestNumber { get; set; } = 1;

    [Display(Name = "清洁日期")]
    [InputType(EditorType = EnumInputType.DateTime)]
    public DateTime CleaningDate { get; set; } = DateTime.Now;

    [Display(Name = "下客入住天数")]
    [InputType(EditorType = EnumInputType.Number)]
    public int NextBookingDay { get; set; } = 1;

    [Display(Name = "当前床数")]
    [InputType(EditorType = EnumInputType.Number)]
    public int CurrentBedUsed { get; set; } = 1;

    [Display(Name = "需要铺床数")]
    [InputType(EditorType = EnumInputType.Number)]
    public int CustomerPrepare { get; set; } = 1;

    [Display(Name = "沙发床")]
    [InputType(EditorType = EnumInputType.Bool)]
    public bool SofaBad { get; set; } = false;

    [Display(Name = "床单数")]
    [InputType(EditorType = EnumInputType.Number)]
    public int SheetNumber { get; set; } = 1;

    [Display(Name = "大床单数")]
    [InputType(EditorType = EnumInputType.Number)]
    public int BigSheetNumber { get; set; } = 0;

    [Display(Name = "被罩数")]
    [InputType(EditorType = EnumInputType.Number)]
    public int CoverNumber { get; set; } = 1;

    [Display(Name = "应有浴巾")]
    [InputType(EditorType = EnumInputType.Number)]
    public int NumberBathTowelInit { get; set; } = 1;
    [Display(Name = "需带浴巾")]
    [InputType(EditorType = EnumInputType.Number)]
    public int NumberBathTowelBring { get; set; } = 1;
    [InputType(EditorType = EnumInputType.Hidden)]
    public int NumberBathTowelActual { get; set; } = 1;
    [InputType(EditorType = EnumInputType.Hidden)]
    public bool NumberBathTowelActualIsFull { get; set; } = false;
    
    [Display(Name = "应有手巾")]
    [InputType(EditorType = EnumInputType.Number)]
    public int NumberHandTowelInit { get; set; } = 1;
    [Display(Name = "需带手巾")]
    [InputType(EditorType = EnumInputType.Number)]
    public int NumberHandTowelBring { get; set; } = 1;
    [InputType(EditorType = EnumInputType.Hidden)]
    public bool NumberHandTowelActualIsFull { get; set; } = false;
    [InputType(EditorType = EnumInputType.Hidden)]
    public int NumberHandTowelActual { get; set; } = 1;

    [Display(Name = "应有地巾")]
    [InputType(EditorType = EnumInputType.Number)]
    public int NumberFloorTowelInit { get; set; } = 1;
    [Display(Name = "需带地巾")]
    [InputType(EditorType = EnumInputType.Number)]
    public int NumberFloorTowelBring { get; set; } = 1;
    [InputType(EditorType = EnumInputType.Hidden)]
    public int NumberFloorTowelActual { get; set; } = 1;
    [InputType(EditorType = EnumInputType.Hidden)]
    public bool NumberFloorTowelActualIsFull { get; set; } = false;
    

    [Display(Name = "附加需求")]
    [InputType(EditorType = EnumInputType.TextArea)]
    public string SpecialRequirement { get; set; } = "";

    [InputType(EditorType = EnumInputType.Hidden)]
    public EnumStatus Status { get; set; } = EnumStatus.Draft;

    [InputType(EditorType = EnumInputType.Hidden)]
    public string ImageCorridorId { get; set; }

    [Display(Name = "清洁费")]
    [InputType(EditorType = EnumInputType.Number)]
    public Decimal CleaningFee { get; set; } = 0;

    [InputType(EditorType = EnumInputType.Hidden)]
    public DateTime? PaidTime { get; set; } = null;
  }
}
