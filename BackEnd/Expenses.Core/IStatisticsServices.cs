namespace Expenses.Core
{
    public interface IStatisticsServices
    {
        IEnumerable<KeyValuePair<string, double>> GetExpenseAmountPerCategory();
    }
}
