using Expenses.Core.DTO;
using Microsoft.AspNetCore.Http;

namespace Expenses.Core
{
    public class ExpensesServices : IExpensesServices
    {
        private DB.AppDbContext _context;
        private readonly DB.User _user;
        public ExpensesServices(DB.AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _user = _context.Users.First(u => u.Username == httpContextAccessor.HttpContext.User.Identity.Name);

        }

        public Expense CreateExpense(Expense expense)
        {
            var dbExpense = new DB.Expense
            {
                Amount = expense.Amount,
                Description = expense.Description,
                User = _user,
            };
            _context.Add(dbExpense);
            _context.SaveChanges();

            return expense;
        }

        public void DeleteExpense(Expense expense)
        {
            var dbExpense = _context.Expenses.FirstOrDefault(e => e.User.Id == _user.Id && e.Id == expense.Id);
            _context.Expenses.Remove(dbExpense);
            _context.SaveChanges();
        }

        public Expense EditExpense(Expense expense)
        {
            var dbExpense = _context.Expenses.FirstOrDefault(e => e.User.Id == _user.Id && e.Id == expense.Id);
            dbExpense.Description = expense.Description;
            dbExpense.Amount = expense.Amount;
            _context.SaveChanges();

            return expense;
        }

        public Expense? GetExpense(int id) =>
            _context.Expenses.Where(e => e.User.Id == _user.Id && e.Id == id)
            .Select(e => (Expense)e).FirstOrDefault();

        public List<Expense> GetExpenses() =>
            _context.Expenses.Where(e => e.User.Id == _user.Id)
            .Select(e => (Expense)e).ToList();
    }
}