using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AppDemo.Models;
using AppDemo.model;

namespace AppDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ApplicatioDbContext _context;

        public CustomersController(ApplicatioDbContext context)
        {
            _context = context;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
          if (_context.Customers == null)
          {
              return NotFound();
          }
            return await _context.Customers.ToListAsync();
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
          if (_context.Customers == null)
          {
              return NotFound();
          }
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

    // PUT: api/Customers/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCustomer(int id, [FromBody] Customer updatedCustomerData)
    {
      var customer = await _context.Customers.FindAsync(id);
      if (customer == null)
      {
        return NotFound();
      }

      // Store the old values in variables
      var oldUserName = customer.userName;
      var oldPassword = customer.password;
      var oldFirstName = customer.firstName;
      var oldLastName = customer.lastName;
      var oldCity = customer.city;
      var oldCountry = customer.country;
      var oldPhone = customer.phone;

      // Update only the changed values
      if (!string.IsNullOrEmpty(updatedCustomerData.userName))
      {
        customer.userName = updatedCustomerData.userName;
      }

      if (!string.IsNullOrEmpty(updatedCustomerData.password))
      {
        customer.password = updatedCustomerData.password;
      }
      if (!string.IsNullOrEmpty(updatedCustomerData.firstName))
      {
        customer.firstName = updatedCustomerData.firstName;
      }

      if (!string.IsNullOrEmpty(updatedCustomerData.lastName))
      {
        customer.lastName = updatedCustomerData.lastName;
      }

      if (!string.IsNullOrEmpty(updatedCustomerData.city))
      {
        customer.city = updatedCustomerData.city;
      }

      if (!string.IsNullOrEmpty(updatedCustomerData.country))
      {
        customer.country = updatedCustomerData.country;
      }

      if (!string.IsNullOrEmpty(updatedCustomerData.phone))
      {
        customer.phone = updatedCustomerData.phone;
      }

      await _context.SaveChangesAsync();

      // Return the updated customer object along with old values
      var updatedCustomerWithChanges = new
      {
        Id = customer.Id,
        OldUserName = oldUserName,
        OldPassword = oldPassword,
        OldFirstName = oldFirstName,
        OldLastName = oldLastName,
        OldCity = oldCity,
        OldCountry = oldCountry,
        OldPhone = oldPhone,
        UpdatedCustomer = customer
      };

      return Ok(updatedCustomerWithChanges);
    }

    // POST: api/Customers
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
          if (_context.Customers == null)
          {
              return Problem("Entity set 'ApplicatioDbContext.Customers'  is null.");
          }
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomer", new { id = customer.Id }, customer);
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            if (_context.Customers == null)
            {
                return NotFound();
            }
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerExists(int id)
        {
            return (_context.Customers?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
