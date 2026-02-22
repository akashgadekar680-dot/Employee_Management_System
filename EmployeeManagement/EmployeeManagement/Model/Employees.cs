using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeManagement.Model
{
    public class Employees
    {
        [Key] // Primary Key
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Phone]
        public string Phone { get; set; }

        [Required]
        [MaxLength(50)]
        public string JobTitle { get; set; }

        [Required]
        public int Gender { get; set; } // 1=Male,2=Female

        // Foreign Key
        public int? DepartmentId { get; set; }

        [ForeignKey(nameof(DepartmentId))]
        public Departments? Department { get; set; }

        [Required]
        public DateTime JoiningDate { get; set; }

        public DateTime? LastWorkingDate { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        // User Relation
        public int? UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public User? User { get; set; }
    }
}
