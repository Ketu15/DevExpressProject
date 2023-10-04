using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AppDemo.model;

public partial class Product
{

  public int Id { get; set; }

  public string? productName { get; set; } = null!;
  public decimal? unitPrice { get; set; }
  public string? url { get; set; }
  public int quantity { get; set; } 

  public bool isDiscontinued { get; set; }

}
