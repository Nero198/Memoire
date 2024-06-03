using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace memoire_razor.Models
{
    public class PublishingHouse
    {
        public int? Id { get; set; }

        [Display(Name = "Name")]
        public string Name { get; set; }

        [Display(Name = "Start year")]
        public int StartYear { get; set; }

    }
}
