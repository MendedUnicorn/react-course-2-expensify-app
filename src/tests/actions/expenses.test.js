import {
  addExpense,
  editExpense,
  removeExpense,
  setExpenses,
  startAddExpense,
  startEditExpense,
  startRemoveExpense,
  startSetExpenses,
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db from '../../firebase/firebase';
import { Database, get, onValue, ref, set } from 'firebase/database';

const uid = 'thisismyuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  set(ref(db, `users/${uid}/expenses`), expensesData).then(() => done());
});

test('Should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc',
  });
});
test('should remove the expense from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[1].id;
  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id,
      });
      return get(ref(db, `users/${uid}/expenses/${id}`));
    })
    .then((snap) => {
      expect(snap.val()).toBeFalsy();
      done();
    });
});

test('Should setup edit expense action object', () => {
  const action = editExpense('123abc', { note: 'New note value' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'New note value',
    },
  });
});
test('should edit expense from firestore', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[1].id;
  const updates = {
    amount: 300000,
    note: 'Rent increased',
  };
  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'EDIT_EXPENSE',
        updates,
        id,
      });
      return get(ref(db, `users/${uid}/expenses/${id}`));
    })
    .then((snap) => {
      expect({ id: snap.key, ...snap.val() }).toEqual({
        ...expenses[1],
        ...updates,
      });
      done();
    });
});

test('Should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2],
  });
});

//CREATE a fake store
test('should add expense to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const expensesData = {
    description: 'Mouse',
    amount: 30000,
    note: 'this one is better',
    createdAt: 23424153523,
  };
  store
    .dispatch(startAddExpense(expensesData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expensesData,
        },
      });
      return get(ref(db, `users/${uid}/expenses/${actions[0].expense.id}`));
    })
    .then((snap) => {
      expect(snap.val()).toEqual(expensesData);
      done();
    });
});
test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0,
  };
  store
    .dispatch(startAddExpense({}))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData,
        },
      });
      return get(ref(db, `users/${uid}/expenses/${actions[0].expense.id}`));
    })
    .then((snap) => {
      expect(snap.val()).toEqual(expenseData);
      done();
    });
});

test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses,
  });
});

test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses,
    });
    done();
  });
});
