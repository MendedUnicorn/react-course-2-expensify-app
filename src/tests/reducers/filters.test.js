import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
  });
});

test('should set sortby to amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
  expect(state.sortBy).toBe('amount');
});
test('should set sortby to date', () => {
  const currentState = {
    text: '',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'amount',
  };
  const action = { type: 'SORT_BY_DATE' };
  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toBe('date');
});

// Should set text filter
test('should set text filter', () => {
  const state = filtersReducer(undefined, {
    type: 'SET_TEXT_FILTER',
    text: 'Rent',
  });
  expect(state.text).toBe('Rent');
});

//should set startDate filter
test('should set startDate filter', () => {
  const state = filtersReducer(undefined, {
    type: 'SET_START_DATE',
    startDate: 1000,
  });
  expect(state.startDate).toBe(1000);
});

//should set endDate filter
test('should set endDate filter', () => {
  const state = filtersReducer(undefined, {
    type: 'SET_END_DATE',
    endDate: 9900,
  });
  expect(state.endDate).toBe(9900);
});
