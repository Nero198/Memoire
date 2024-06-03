using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dataAccess.Entities
{
    public class Book
    {
        public int? Id { get; set; }
        public string Title { get; set; }
        public int ReleaseYear { get; set; }
        public int PersonId { get; set; }
        public int TypeId { get; set; }
        public int PublishingHouseId { get; set; }
        public virtual Person? Person { get; set; }
        public virtual Type? Type { get; set; }
        public virtual PublishingHouse? PublishingHouse { get; set; }
    }
}
