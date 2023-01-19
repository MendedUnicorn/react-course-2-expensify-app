import moment from 'moment';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = { type: 'REMOVE_EXPENSE', id: expenses[1].id };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense if id not found', () => {
  const action = { type: 'REMOVE_EXPENSE', id: -1 };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

// should add an expense
test('should add an expense', () => {
  const expense = {
    description: 'Coffee',
    amount: 1200,
    note: '',
    createdAt: moment(),
    id: 4,
  };
  const action = { type: 'ADD_EXPENSE', expense };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

// should edit an expense
test('should edit an expense', () => {
  const updates = {
    description: 'Coffee',
  };
  const action = { type: 'EDIT_EXPENSE', updates, id: expenses[1].id };
  const state = expensesReducer(expenses, action);
  expect(state[1].description).toBe('Coffee');
});

// should not edit expense if expense not found
test('should not edit an expense if not found', () => {
  const updates = {
    description: 'Coffee',
  };
  const action = { type: 'EDIT_EXPENSE', updates, id: '4' };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should set expenses', () => {
  const initialExpenses = [
    {
      description: 'Coffee',
      amount: 1200,
      note: '',
      createdAt: moment(),
      id: 4,
    },
    {
      description: 'Things',
      amount: 232,
      note: '',
      createdAt: moment(),
      id: 5,
    },
  ];
  const action = { type: 'SET_EXPENSES', expenses };
  const state = expensesReducer(initialExpenses, action);
  expect(state).toEqual(expenses);
});
