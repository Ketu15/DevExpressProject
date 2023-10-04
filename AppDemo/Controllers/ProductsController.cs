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
using Microsoft.CodeAnalysis.CSharp.Syntax;
using DevExtreme.AspNet.Mvc;

namespace AppDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicatioDbContext _context;

        public ProductsController(ApplicatioDbContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
          if (_context.Products == null)
          {
              return NotFound();
          }
            return await _context.Products.ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
          if (_context.Products == null)
          {
              return NotFound();
          }
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

    // PUT: api/Products/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduct(int id, [FromBody] Product updatedProductData)
    {
      var product = await _context.Products.FindAsync(id);
      if (product == null)
      {
        return NotFound();
      }

      // Store the old values in variables
      var oldProductName = product.productName;
      var oldUnitPrice = product.unitPrice;
      var oldPackage = product.package;
      var oldQuantity = product.quantity;
      var oldIsDiscontinued = product.isDiscontinued;


      // Update only the changed values
      if (!string.IsNullOrEmpty(updatedProductData.productName))
      {
        product.productName = updatedProductData.productName;
      }
      if (updatedProductData.unitPrice.HasValue)
      {
        product.unitPrice = updatedProductData.unitPrice;
      }

      if (!string.IsNullOrEmpty(updatedProductData.package))
      {
        product.package = updatedProductData.package;
      }
      if (updatedProductData.quantity > 0)
      {
        product.quantity = updatedProductData.quantity;
      }

      if (updatedProductData.isDiscontinued)
      {
        product.isDiscontinued = true;
      }
      else
      {
        product.isDiscontinued = false;
      }



      await _context.SaveChangesAsync();

      // Return the updated customer object along with old values
      var updatedProductWithChanges = new
      {
        Id = product.Id,
        OldProductName = oldProductName,
        OldUnitPrice = oldUnitPrice,
        OldPackage = oldPackage,
        OldQuantity = oldQuantity,
        OldIsDiscontinued = oldIsDiscontinued,
      };

      return Ok(updatedProductWithChanges);
    }

    // POST: api/Products
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
          if (_context.Products == null)
          {
              return Problem("Entity set 'ApplicatioDbContext.Products'  is null.");
          }
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    //changes
    private bool ProductExists(int id)
        {
            return (_context.Products?.Any(e => e.Id == id)).GetValueOrDefault();
    }
  }
}





