import React from 'react';
import numeral from 'numeral';
import { connect } from 'react-redux';
import expensesSelector from '../selectors/expenses';
import expensesTotalSelector from '../selectors/expenses-total';

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
  const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
  const formattedExpensesTotal = numeral(expensesTotal / 100).format(
    '$ 0,0.00'
  );
  return (
    <div>
      <h1>
        Viewing {expenseCount} {expenseWord} totalling {formattedExpensesTotal}
      </h1>
    </div>
  );
};

const mapStateToProps = (state) => ({
  expensesTotal: expensesTotalSelector(
    expensesSelector(state.expenses, state.filters)
  ),
  expenseCount: expensesSelector(state.expenses, state.filters).length,
});

export default connect(mapStateToProps)(ExpensesSummary);
