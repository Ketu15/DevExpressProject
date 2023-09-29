using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AppDemo.Models;
using AppDemo.model;
using Microsoft.IdentityModel.Tokens;
using System.Globalization;

namespace AppDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicatioDbContext _context;

        public OrdersController(ApplicatioDbContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
          if (_context.Orders == null)
          {
              return NotFound();
          }
            return await _context.Orders.ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
          if (_context.Orders == null)
          {
              return NotFound();
          }
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

    // PUT: api/Orders/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduct(int id, [FromBody] Order updatedOrderData)
    {
      var order = await _context.Orders.FindAsync(id);
      if (order == null)
      {
        return NotFound();
      }

      // Store the old values in variables
      var oldProductId = order.product_Id;
      var oldCusId = order.cus_Id;
      var oldOrderDate = order.orderDate;
      var oldUnitPrice = order.unitPrice;
      var oldQuantity = order.quantity;


      // Update only the changed values
      if (!string.IsNullOrEmpty(updatedOrderData.product_Id))
      {
        order.product_Id = updatedOrderData.product_Id;
      }
      if (!string.IsNullOrEmpty(updatedOrderData.cus_Id))
      {
        order.cus_Id = updatedOrderData.cus_Id;
      }
      if (updatedOrderData.orderDate != default(DateTime))
      {
        order.orderDate = updatedOrderData.orderDate;
      }


      if (updatedOrderData.unitPrice.HasValue)
      {
        order.unitPrice = updatedOrderData.unitPrice;
      }

      if (updatedOrderData.quantity > 0)
      {
        order.quantity = updatedOrderData.quantity;
      }
      await _context.SaveChangesAsync();

      // Return the updated customer object along with old values
      var updatedProductWithChanges = new
      {
        Id = order.Id,
        OldProductId = oldProductId,
        OldCusId = oldCusId,
        OldOrderDate = oldOrderDate,
        OldUnitPrice = oldUnitPrice,
        OldQuantity = oldQuantity,

      };

      return Ok(updatedProductWithChanges);
    }

    // POST: api/Orders
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
          {
          if (_context.Orders == null)
          {
              return Problem("Entity set 'ApplicatioDbContext.Orders'  is null.");
          }
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.Id }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            if (_context.Orders == null)
            {
                return NotFound();
            }
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return (_context.Orders?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
