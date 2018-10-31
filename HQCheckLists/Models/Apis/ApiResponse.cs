using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HQCheckLists.Models.Apis
{
  public class ApiResponse<T>
  {
    public T Data { get; set; } = default(T);
    public bool Success { get; set; } = false;
    public string Message { get; set; } = "";
    public ApiResponse(bool success = false, string message = "", object model = null)
    {
      this.Data = (T)model;
      this.Success = success;
      this.Message = message;
    }
  }
}
