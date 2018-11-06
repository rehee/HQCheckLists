using HQCheckLists.Models.Contents;
using HQCheckLists.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HQCheckLists.ViewModels.Cleanings
{
  public class CleanerJob
  {
    public DateTime JobDate { get; set; } = DateTime.Now;
    public IEnumerable<ClearJobItem> Jobs { get; set; } = Enumerable.Empty<ClearJobItem>();
  }
  public class ClearJobItem
  {
    public string PropertyId { get; set; }
    public string ReserveId { get; set; }
    public string CleaningId { get; set; }
    public string Title { get; set; }
    public DateTime CleaningDate { get; set; }
    public EnumStatus Status { get; set; }
  }
  public class CleaningView
  {
    public Cleaning CleaningRecord { get; set; }
    public IEnumerable<CleaningItem> Items { get; set; }
  }
}
