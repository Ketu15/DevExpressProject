using AppDemo.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class CustomerController : ControllerBase
{
  private readonly AuthService _authService;

  public CustomerController(AuthService authService)
  {
    _authService = authService;
  }

  [HttpPost("Register")]
  public async Task<IActionResult> Register([FromBody] Customer customer, string password)
  {
    try
    {
      // Call AuthService to register the customer
      var registeredCustomer = await _authService.RegisterAsync(customer, password);

      if (registeredCustomer != null)
      {
        return Ok(new { message = "Registration successful", customer = registeredCustomer });
      }

      return BadRequest(new { message = "Registration failed" });
    }
    catch (Exception ex)
    {
      return StatusCode(500, new { message = "Internal server error", error = ex.Message });
    }
  }

  [HttpPost("Login")]
  public async Task<IActionResult> Login(string email, string password)
  {
    try
    {
      // Call AuthService to perform login
      var token = await _authService.LoginAsync(email, password);

      if (!string.IsNullOrEmpty(token))
      {
        return Ok(new { message = "Login successful", token });
      }

      return Unauthorized(new { message = "Login failed" });
    }
    catch (Exception ex)
    {
      return StatusCode(500, new { message = "Internal server error", error = ex.Message });
    }
  }
}
