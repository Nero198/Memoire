using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace memoire_razor.Models
{
    public class Type
    {
        public int? Id { get; set; }

        [Display(Name = "Label")]
        public string Label { get; set; }
    }
}
