using EmployeeManagement.Data;
using EmployeeManagement.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalaryController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SalaryController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Add Salary
        [HttpPost]
        public async Task<IActionResult> AddSalary([FromBody] Salary salary)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Check employee exists
            var employeeExists = await _context.Employees
                .AnyAsync(e => e.Id == salary.EmployeeId);

            if (!employeeExists)
                return BadRequest("Employee not found");

            _context.Salaries.Add(salary);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Salary added successfully",
                netSalary = salary.NetSalary
            });
        }

        // ✅ Get All Salaries
        [HttpGet]
        public async Task<IActionResult> GetSalary()
        {
            var salaries = await _context.Salaries
                .Include(s => s.Employee)
                .ToListAsync();

            return Ok(salaries);
        }
    }
}