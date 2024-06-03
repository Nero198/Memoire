using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dataAccess.Entities
{
    public class PublishingHouse
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public int StartYear { get; set; }
        public virtual ICollection<Book>? Books { get; set; }
    }
}
