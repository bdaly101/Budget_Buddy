import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseList = ({ expenses = [] }) => {
  if (!expenses.length) {
    return <h3>No Expenses Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {expenses.map((expense) => (
        <div key={expense._id} className="card mb-3">
          <h4 className="card-header bg-primary text-light p-2 m-0">
            <Link className="text-light" to={`/expenses/${expense._id}`}>
              {expense.name}
            </Link>
            <span className="float-right">${expense.totalCost}</span>
          </h4>
          <div className="card-body bg-light p-2">
            <p>{expense.description}</p>
          </div>
          <Link
            className="btn btn-primary btn-block btn-squared"
            to={`/expenses/${expense._id}`}
          >
            View Purchases
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
