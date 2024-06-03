using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace memoire_razor.Models
{
    public class Book
    {
        public int? Id { get; set; }

        [Display(Name = "Title")]
        public string Title { get; set; }

        [Display(Name = "Release year")]
        public int ReleaseYear { get; set; }

        [Display(Name = "PublishingHouse")]
        public int PublishingHouseId { get; set; }

        [Display(Name = "Type")]
        public int TypeId { get; set; }
        [Display(Name = "Author")]
        public int PersonId { get; set; }
    }
}
