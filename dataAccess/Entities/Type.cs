using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dataAccess.Entities
{
    public class Type
    {
        public int? Id { get; set; }
        public string Label { get; set; }
        public virtual ICollection<Book>? Books {  get; set; }
    }
}
