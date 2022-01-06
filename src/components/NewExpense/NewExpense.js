import React from "react";
import "./NewExpense.css";

// import Form
import ExpenseForm from "./ExpenseForm";

const NewExpense = (props) => {
  const onSaveExpenseHandler = (newExpenseItem) => {
    const expenseData = {
      ...newExpenseItem,
    };
    // debugger;
    props.onNewExpenseItem(expenseData);
  };

  return (
    <div>
      <ExpenseForm onSaveExpenseData={onSaveExpenseHandler} />
    </div>
  );
};

export default NewExpense;