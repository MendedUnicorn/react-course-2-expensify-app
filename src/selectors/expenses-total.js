const selectExpensesTotal = (expenses = []) => {
  if (expenses.length === 0) return 0;
  return expenses.reduce((acc, curr) => acc + curr.amount, 0);
};
export default selectExpensesTotal;
