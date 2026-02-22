using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeManagement.Model
{
    public class Departments
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // ✅ ensures auto-increment
        public int Id { get; set; }

        public string Name { get; set; }
    }
}
