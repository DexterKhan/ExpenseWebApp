using Expenses.Core.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Expenses.Core
{
    public interface ICategoryServices
    {
        List<Category> GetCategories();
        Category? GetCategory(int id);
        Category AddCategory(Category category);
        void DeleteCategory(Category category);
        Category EditCategory(Category category);
    }
}
