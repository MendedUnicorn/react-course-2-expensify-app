import React from 'react';
import numeral from 'numeral';
import { connect } from 'react-redux';
import expensesSelector from '../selectors/expenses';
import expensesTotalSelector from '../selectors/expenses-total';
import { Link } from 'react-router-dom';

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
  const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
  const formattedExpensesTotal = numeral(expensesTotal / 100).format(
    '$ 0,0.00'
  );
  return (
    <div className='page-header'>
      <div className='content-container'>
        <h1 className='page-header__title'>
          Viewing <span>{expenseCount}</span> {expenseWord} totalling{' '}
          <span>{formattedExpensesTotal}</span>
        </h1>
        <div className='page-header__actions'>
          <Link className='button' to='/create'>
            Add Expense
          </Link>
        </div>
      </div>
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
