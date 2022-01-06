import React, { useState } from "react";
import "./ExpenseItem.scss";
import Card from "../UI/Card";

const ExpenseItem = (props) => {
  const expenseDate = new Date(props.date).toLocaleString("en-US", {
    dateStyle: "full",
  });

  return (
    <Card className="expense-item">
      <h4> Expense Items </h4>
      <br></br>
      <small> {expenseDate} </small>
      <h3> {props.title} </h3>
      <div> ₹{props.amount} </div>
    </Card>
  );
};

export default ExpenseItem;
