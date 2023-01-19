import { get, onValue, push, ref, remove, update } from 'firebase/database';
import uuid from 'uuid';
import db from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense,
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0,
    } = expenseData;
    const expense = { description, note, amount, createdAt };
    return push(ref(db, 'expenses'), expense)
      .then((ref) => {
        dispatch(addExpense({ id: ref.key, ...expense }));
      })
      .catch((err) => console.log('error: ', err));
  };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

export const startRemoveExpense = ({ id } = {}) => {
  return (dispatch) => {
    return remove(ref(db, `expenses/${id}`))
      .then(() => {
        dispatch(removeExpense({ id }));
      })
      .catch((err) => console.log('error: ', err));
  };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
});

export const startEditExpense = (id, updates) => {
  return (dispatch) => {
    return update(ref(db, `expenses/${id}`), updates)
      .then(() => {
        dispatch(editExpense(id, updates));
      })
      .catch((err) => console.log('error: ', err));
  };
};

// SET_EXPENSES

export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses,
});

export const startSetExpenses = (expenses = []) => {
  return (dispatch) => {
    return get(ref(db, 'expenses'))
      .then((snap) => {
        const data = [];
        snap.forEach((s) => {
          data.push({ id: s.key, ...s.val() });
        });
        dispatch(setExpenses(data));
      })
      .catch((err) => console.log('error ', err));
  };
};
