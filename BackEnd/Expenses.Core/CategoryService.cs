using Expenses.Core.DTO;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Expenses.Core
{
    public class CategoryService : ICategoryServices
    {
        private readonly DB.AppDbContext _context;
        private readonly DB.User _user;

        public CategoryService(DB.AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _user = _context.Users.First(u => u.Username == httpContextAccessor.HttpContext.User.Identity.Name);
        }

        public Category AddCategory(Category category)
        {
            var dbCategory = new DB.Category
            {
                Name = category.Name,
                User = _user
            };
            _context.Categories.Add(dbCategory);
            _context.SaveChanges();
            return category;
        }

        public void DeleteCategory(Category category)
        {
            var dbCategory = _context.Categories.FirstOrDefault(c => c.User.Id == _user.Id && c.Id == category.Id);
            _context.Categories.Remove(dbCategory);
            _context.SaveChanges();
        }

        public Category EditCategory(Category category)
        {
            var dbCategory = _context.Categories.First(c => c.User.Id == _user.Id && c.Id == category.Id);
            dbCategory.Name = category.Name;

            _context.SaveChanges();

            return category;
        }

        public List<Category> GetCategories() =>

            _context.Categories.Where(c => c.User.Id == _user.Id).Select(c => (Category)c).ToList();

        public Category? GetCategory(int id) =>
            _context.Categories.Where(c => c.User.Id == _user.Id && c.Id == id)
            .Select(c => (Category)c).FirstOrDefault();
    }
}
