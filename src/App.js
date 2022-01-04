import React, { useState } from "react";
import "./App.css";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
let DUMMY_EXPENSE = [
  {
    id: "e1",
    date: new Date(2021, 3, 21),
    title: "Movie",
    amount: "208",
  },
  {
    id: "e2",
    date: new Date(2021, 3, 21),
    title: "Food",
    amount: "500",
  },
  {
    id: "e3",
    date: new Date(2021, 3, 21),
    title: "Nike Cap",
    amount: "1195",
  },
  {
    id: "e4",
    date: new Date(2021, 3, 21),
    title: "Car Fuel by Credit Card",
    amount: "1000",
  },
];
const App = () => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSE);

  const onNewExpenseHandler = (expense) => {
    const updatedExpenses = [expense, ...expenses];
    setExpenses(updatedExpenses);
  };

  return (
    <div className="container">
      <NewExpense onNewExpenseItem={onNewExpenseHandler} />
      <h2> Expense Manager </h2>
      <Expenses item={expenses} />
    </div>
  );
};

export default App;
