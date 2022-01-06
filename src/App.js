import React, { useState, useEffect } from "react";
import "./App.css";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";

let DUMMY_EXPENSE = [];

const FIREBASE_API =
  "https://expense-manager-5f028-default-rtdb.firebaseio.com/expenses.json";

const App = () => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSE);

  const getExpenses = () => {
    // Fetch Expenses
    fetch(FIREBASE_API)
      .then((res) => res.json())
      .then((data) => {
        const expenseData = [];

        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            expenseData.push({ ...data[key], id: key });
          }
        }

        console.log(expenseData);
        // TODO - Check infinite calls once we have data
        setExpenses(expenseData);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getExpenses();
  }, []);

  const onNewExpenseHandler = (expense) => {
    // const updatedExpenses = [expense, ...expenses];
    // setExpenses(updatedExpenses);

    fetch(FIREBASE_API, {
      method: "POST",
      body: JSON.stringify(expense),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => getExpenses())
      .catch((error) => alert(error));
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
