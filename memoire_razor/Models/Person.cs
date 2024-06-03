using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace memoire_razor.Models
{
    public class Person
    {
        public int? Id { get; set; }

        [Display(Name = "Lastname")]
        public string Lastname { get; set; }

        [Display(Name = "Firstname")]
        public string Firstname { get; set; }

        [DataType(DataType.Date)]
        [Display(Name = "Date of Birth")]
        public DateTime DateOfBirth { get; set; }

        public bool IsMan { get; set; }
    }
}
