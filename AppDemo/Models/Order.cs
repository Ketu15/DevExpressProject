using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AppDemo.model;

public partial class Order
{

    public int Id { get; set; }
    public string? product_Id { get; set; }
    public string? cus_Id { get; set; }
    public DateTime orderDate { get; set; }
    public decimal? unitPrice { get; set; }
    public int quantity { get; set; }

    //public virtual Customer Customer { get; set; } = null!;
    //public virtual Product Product { get; set; } = null!;

}
