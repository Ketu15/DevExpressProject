using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AppDemo.model;

public partial class Customer
{
    public int Id { get; set; }
    public string? userName { get; set; }
    public string? password { get; set; }
    public string? firstName { get; set; } = null!;
    public string? lastName { get; set; } = null!;
    
    public string? city { get; set; }

    public string? country { get; set; }

    public string? phone { get; set; }


}
