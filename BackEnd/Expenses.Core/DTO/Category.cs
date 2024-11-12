using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Expenses.Core.DTO
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public static explicit operator Category(DB.Category category) => new Category
        {
            Id = category.Id,
            Name = category.Name,
        };
    }
}
