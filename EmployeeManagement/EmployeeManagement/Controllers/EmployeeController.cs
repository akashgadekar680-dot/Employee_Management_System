using EmployeeManagement.Data;
using EmployeeManagement.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class EmployeeController : ControllerBase
{
    private readonly AppDbContext _context;

    public EmployeeController(AppDbContext context)
    {
        _context = context;
    }

    // ===================== GET ALL =====================
    [HttpGet]
    public async Task<IActionResult> GetEmployees()
    {
        var employees = await _context.Employees
            .Include(e => e.Department)
            .ToListAsync();

        return Ok(employees);
    }

    // ===================== GET BY ID =====================
    [HttpGet("{id}")]
    public async Task<IActionResult> GetEmployeeById(int id)
    {
        var employee = await _context.Employees
            .Include(e => e.Department)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (employee == null)
            return NotFound(new { message = "Employee not found" });

        return Ok(employee);
    }

    // ===================== CREATE =====================
    [HttpPost]
    public async Task<IActionResult> CreateEmployee([FromBody] Employees employee)
    {
        if (employee == null)
            return BadRequest(new { message = "Invalid employee data" });

        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetEmployeeById),
            new { id = employee.Id }, employee);
    }

    // ===================== UPDATE =====================
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEmployee(int id, [FromBody] Employees employee)
    {
        if (employee == null || id != employee.Id)
            return BadRequest(new { message = "Invalid data" });

        var existing = await _context.Employees.FindAsync(id);
        if (existing == null)
            return NotFound(new { message = "Employee not found" });

        existing.Name = employee.Name;
        existing.Email = employee.Email;
        existing.Phone = employee.Phone;
        existing.JobTitle = employee.JobTitle;
        existing.Gender = employee.Gender;
        existing.DepartmentId = employee.DepartmentId;
        existing.JoiningDate = employee.JoiningDate;
        existing.LastWorkingDate = employee.LastWorkingDate;
        existing.DateOfBirth = employee.DateOfBirth;

        await _context.SaveChangesAsync();

        return Ok(existing);
    }

    // ===================== DELETE =====================
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEmployee(int id)
    {
        var emp = await _context.Employees.FindAsync(id);

        if (emp == null)
            return NotFound(new { message = "Employee not found" });

        _context.Employees.Remove(emp);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Employee deleted successfully",
            employee = emp
        });
    }
}