import React, { useState } from "react";
import "./ExpenseForm.scss";

const ExpenseForm = (props) => {
  const [title, setTitle] = useState("ras");
  const [amount, setAmount] = useState("123");
  const [date, setDate] = useState("");

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const dateChangeHandler = (event) => {
    setDate(event.target.value);
  };
  const amountChangeHandler = (event) => {
    setAmount(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const expenseData = {
      title: title,
      amount: amount,
      date: new Date(date),
    };

    setTitle("");
    setAmount("");
    setDate("");

    props.onSaveExpenseData(expenseData);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label> Title </label>
            <input type="text" value={title} onChange={titleChangeHandler} />
          </div>
          <div className="new-expense__control">
            <label> Date </label>
            <input type="date" value={date} onChange={dateChangeHandler} />
          </div>
          <div className="new-expense__control">
            <label> Amount </label>
            <input
              type="number"
              value={amount}
              min="0.01"
              step="0.01"
              onChange={amountChangeHandler}
            />
          </div>
        </div>
        <div className="new-expense__actions">
          <button type="submit"> Add Expense </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
