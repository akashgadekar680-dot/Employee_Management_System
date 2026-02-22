using EmployeeManagement.Data;
using EmployeeManagement.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LeaveController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Apply Leave
        [HttpPost]
        public async Task<IActionResult> ApplyLeave([FromBody] Leave leave)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Leaves.Add(leave);
            await _context.SaveChangesAsync();

            return Ok(leave);
        }

        // ✅ Get All Leaves
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var leaves = await _context.Leaves
                .Include(x => x.Employee)
                .ToListAsync();

            return Ok(leaves);
        }

        // ✅ Update Leave Status
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] string status)
        {
            if (string.IsNullOrWhiteSpace(status))
                return BadRequest("Status is required");

            var leave = await _context.Leaves.FindAsync(id);

            if (leave == null)
                return NotFound("Leave not found");

            var validStatuses = new[] { "Pending", "Approved", "Rejected" };

            if (!validStatuses.Contains(status))
                return BadRequest("Invalid status value");

            leave.Status = status;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Status updated successfully",
                updatedLeave = leave
            });
        }
    }
}