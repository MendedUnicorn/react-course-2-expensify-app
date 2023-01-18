import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

// let wrapper
// beforeEach(() => {
//     wrapper = shallow(<ExpensesSummary expenses={expenses} />)

// })

test('should render component with no data', () => {
  const wrapper = shallow(<ExpensesSummary />);
  expect(wrapper).toMatchSnapshot();
});

test('should render component with 1 expense', () => {
  const wrapper = shallow(
    <ExpensesSummary expensesTotal={235} expenseCount={1} />
  );
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('h1').text()).toBe('Viewing 1 expense totalling $ 2.35');
});

test('should render component with multiple expense', () => {
  const wrapper = shallow(
    <ExpensesSummary expensesTotal={241234} expenseCount={23} />
  );
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('h1').text()).toBe(
    'Viewing 23 expenses totalling $ 2,412.34'
  );
});
