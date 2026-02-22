using EmployeeManagement.Data;
using EmployeeManagement.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmployeeManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DepartmentController(AppDbContext context)
        {
            _context = context;
        }

        // ---------------------- CREATE ----------------------
        [HttpPost]
        public async Task<ActionResult<Departments>> PostDepartment([FromBody] Departments department)
        {
            if (department == null || string.IsNullOrWhiteSpace(department.Name))
                return BadRequest(new { message = "Invalid department data" });

            _context.Departments.Add(department);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDepartmentById),
                new { id = department.Id }, department);
        }

        // ---------------------- UPDATE ----------------------
        [HttpPut("{id}")]
        public async Task<ActionResult<Departments>> PutDepartment(int id, [FromBody] Departments department)
        {
            if (department == null || string.IsNullOrWhiteSpace(department.Name))
                return BadRequest(new { message = "Invalid data" });

            var existing = await _context.Departments.FindAsync(id);
            if (existing == null)
                return NotFound(new { message = "Department not found" });

            existing.Name = department.Name;
            await _context.SaveChangesAsync();

            return Ok(existing);
        }

        // ---------------------- GET ALL ----------------------
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Departments>>> GetDepartments()
        {
            var departments = await _context.Departments.ToListAsync();
            return Ok(departments);
        }

        // ---------------------- GET BY ID ----------------------
        [HttpGet("{id}")]
        public async Task<ActionResult<Departments>> GetDepartmentById(int id)
        {
            var department = await _context.Departments.FindAsync(id);
            if (department == null)
                return NotFound(new { message = "Department not found" });

            return Ok(department);
        }

        // ---------------------- DELETE ----------------------
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            var existing = await _context.Departments.FindAsync(id);

            if (existing == null)
                return NotFound(new { message = "Department not found" });

            _context.Departments.Remove(existing);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Department deleted successfully",
                department = existing
            });
        }
    }
}