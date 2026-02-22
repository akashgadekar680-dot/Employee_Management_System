using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeManagement.Model
{
    public class Salary
    {
        public int Id { get; set; }

        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }

        public Employees? Employee { get; set; }

        [Required]
        public decimal BasicSalary { get; set; }

        public decimal Bonus { get; set; } = 0;

        public decimal Deductions { get; set; } = 0;

        [Required]
        public DateTime Month { get; set; }

        // ✅ Computed Property (Not stored in DB)
        [NotMapped]
        public decimal NetSalary => BasicSalary + Bonus - Deductions;
    }
}