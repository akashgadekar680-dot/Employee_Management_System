using EmployeeManagement.Data;
using EmployeeManagement.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AttendanceController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Mark Attendance
        [HttpPost]
        public async Task<IActionResult> MarkAttendance(Attendance attendance)
        {
            _context.Attendances.Add(attendance);
            await _context.SaveChangesAsync();
            return Ok(attendance);
        }

        // ✅ Get All Attendance
        [HttpGet]
        public async Task<IActionResult> GetAttendance()
        {
            var data = await _context.Attendances.ToListAsync();
            return Ok(data);
        }

        // ✅ Get Attendance By Employee
        [HttpGet("employee/{employeeId}")]
        public async Task<IActionResult> GetByEmployee(int employeeId)
        {
            var data = await _context.Attendances
                .Where(a => a.EmployeeId == employeeId)
                .ToListAsync();

            return Ok(data);
        }

        // ✅ Delete Attendance
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAttendance(int id)
        {
            var attendance = await _context.Attendances.FindAsync(id);

            if (attendance == null)
                return NotFound();

            _context.Attendances.Remove(attendance);
            await _context.SaveChangesAsync();

            return Ok("Deleted Successfully");
        }
    }
}