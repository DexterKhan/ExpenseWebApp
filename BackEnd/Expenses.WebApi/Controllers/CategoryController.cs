using Expenses.Core;
using Expenses.Core.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Expenses.WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : Controller
    {
        private readonly ILogger<CategoryController> _logger;
        private readonly ICategoryServices _categoryServices;

        public CategoryController(ILogger<CategoryController> logger, ICategoryServices categoryServices)
        {
            _logger = logger;
            _categoryServices = categoryServices;
        }
        [HttpGet]
        
        public IActionResult GetCategories()
        {
            return Ok(_categoryServices.GetCategories());
        }
        [HttpGet ("{id}", Name = "GetCategory")]
        
        public IActionResult GetCategory(int id) 
        {
            return Ok(_categoryServices.GetCategory(id));
        }
        [HttpPost]
        public IActionResult AddCategory(Category category)
        {
            var newCategory = _categoryServices.AddCategory(category);
            return CreatedAtRoute("GetCategory", new { category.Id }, newCategory);
        }
        [HttpPut]
        public IActionResult EditCategory(Category category)
        {
            return Ok(_categoryServices.EditCategory(category));
        }

        [HttpDelete]
        public IActionResult DeleteCategory(Category category)
        {
            _categoryServices.DeleteCategory(category);
            return Ok();
        }

    }
}
