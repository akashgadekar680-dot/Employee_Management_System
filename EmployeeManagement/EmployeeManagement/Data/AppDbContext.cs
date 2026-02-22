using EmployeeManagement.Model;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace EmployeeManagement.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // DbSets
        public DbSet<Employees> Employees { get; set; }
        public DbSet<Departments> Departments { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Leave> Leaves { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Salary> Salaries { get; set; }

        // Manual Insert (Seed Data)
        public void InsertData()
        {
            // Insert Employees if none exist
            if (!Employees.Any())
            {
                Employees.AddRange(
                    new Employees { Name = "Employee 1" },
                    new Employees { Name = "Employee 2" }
                );
            }

            // Insert Users if none exist
            if (!Users.Any())
            {
                Users.AddRange(
                    new User
                    {
                        Email = "admin@test.com",
                        Password = "12345", // ⚠️ Use hashing in production
                        Role = "Admin"
                    },
                    new User
                    {
                        Email = "emp@test.com",
                        Password = "12345", // ⚠️ Use hashing in production
                        Role = "Employee"
                    }
                );
            }

            SaveChanges();
        }
    }
}
