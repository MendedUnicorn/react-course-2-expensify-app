import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: '',
    };
  }

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/gm)) {
      this.setState(() => ({ amount }));
    }
  };
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        error: 'Please provide both description and amount',
      }));
    } else {
      this.setState(() => ({
        error: '',
      }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note,
      });
    }
  };

  //   renderMonthElement = ({ month, onMonthSelect, onYearSelect }) => (
  //     <div style={{ display: 'flex', justifyContent: 'center' }}>
  //       <div>
  //         <select
  //           value={month.month()}
  //           onChange={(e) => onMonthSelect(month, e.target.value)}
  //         >
  //           {moment.months().map((label, value) => (
  //             <option value={value}>{label}</option>
  //           ))}
  //         </select>
  //       </div>
  //       <div>
  //         <select
  //           value={month.year()}
  //           onChange={(e) => onYearSelect(month, e.target.value)}
  //         >
  //           <option value={moment().year() - 1}>Last year</option>
  //           <option value={moment().year()}>{moment().year()}</option>
  //           <option value={moment().year() + 1}>Next year</option>
  //         </select>
  //       </div>
  //     </div>
  //   );

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            type='text'
            name=''
            id=''
            autoFocus
            placeholder='Description'
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            type='text'
            name=''
            id=''
            placeholder='Amount'
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
            // renderMonthElement={this.renderMonthElement}
          />
          <textarea
            name=''
            id=''
            cols='30'
            rows='10'
            placeholder='Add a note for your expense (optional)'
            value={this.state.note}
            onChange={this.onNoteChange}
          ></textarea>
          <button>Add Expense</button>
        </form>
      </div>
    );
  }
}
