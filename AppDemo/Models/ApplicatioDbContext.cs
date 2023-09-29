using System.Collections.Generic;
using AppDemo.model;
using Microsoft.EntityFrameworkCore;

namespace AppDemo.Models
{
    public class ApplicatioDbContext : DbContext
    {
        public ApplicatioDbContext(DbContextOptions<ApplicatioDbContext> options) : base(options) { }

        public virtual DbSet<Customer> Customers { get; set; }

        public virtual DbSet<Order> Orders { get; set; }


        public virtual DbSet<Product> Products { get; set; }

    }
}
