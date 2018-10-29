using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HQCheckLists.ViewModels.Accounts
{
  public class LoginViewModel
  {
    public string Login { get; set; } = "";
    public string Password { get; set; } = "";
    public string ReturnUrl { get; set; } = "";
  }
}
