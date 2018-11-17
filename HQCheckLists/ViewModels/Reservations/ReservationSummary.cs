using HQCheckLists.Models.Contents;
using HQCheckLists.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HQCheckLists.ViewModels.Reservations
{
  public class ReservationSummary
  {
    public string PropertyId { get; set; }
    public string CleaningId { get; set; }
    public string CurrentReservationId { get; set; }
    public Reservation CurrentReservation { get; set; }
    public string LastReservationId { get; set; }
    public Reservation LastReservation { get; set; }

    public string PropertyName { get; set; }
    public string CleaningName { get; set; }
    public EnumStatus? CleaningStatus { get; set; }
    
  }

  public class ReservationSummaryDate
  {
    public DateTime CheckInDate { get; set; } = DateTime.Now;
    public IEnumerable<ReservationSummary> Reservations { get; set; } = Enumerable.Empty<ReservationSummary>();
  }
}
