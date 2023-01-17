import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByAmount={sortByAmount}
      sortByDate={sortByDate}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with all the data correctly', () => {
  wrapper.setProps({
    filters: altFilters,
  });
  expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
  const value = 'water';
  wrapper.find('input').simulate('change', { target: { value } });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by date', () => {
  wrapper.setProps({
    filters: altFilters,
  });
  const value = 'date';
  wrapper.find('select').simulate('change', { target: { value } });
  expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
  const value = 'amount';
  wrapper.find('select').simulate('change', { target: { value } });
  expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date change', () => {
  const dates = {
    startDate: altFilters.startDate,
    endDate: altFilters.endDate,
  };
  wrapper.find('DateRangePicker').prop('onDatesChange')(dates);
  expect(setStartDate).toHaveBeenLastCalledWith(dates.startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(dates.endDate);
});

test('should sort by amount', () => {
  const value = 'endDate';
  wrapper.find('DateRangePicker').prop('onFocusChange')(value);
  expect(wrapper.state('calendarFocused')).toBe(value);
});
