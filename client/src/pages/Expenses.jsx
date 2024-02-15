import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { CREATE_EXPENSE, DELETE_EXPENSE } from '../utils/mutations';

const Expenses = () => {
  const navigate = useNavigate();
  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseCost, setNewExpenseCost] = useState(''); // Added state for expense cost
  const { loading, data } = useQuery(QUERY_ME);
  const [createExpense] = useMutation(CREATE_EXPENSE);
  const [deleteExpense] = useMutation(DELETE_EXPENSE);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (!loading && data?.me) {
      setExpenses(data.me.expenses);
    }
  }, [loading, data]);

  const handleAddExpense = async () => {
    try {
      // Ensure both name and cost are provided
      if (newExpenseName.trim() !== '' && newExpenseCost.trim() !== '') {
        const { data: expenseData } = await createExpense({
          variables: {
            name: newExpenseName,
            cost: parseFloat(newExpenseCost), // Convert cost to a float
            userId: data.me._id,
          },
        });
        setExpenses([...expenses, expenseData.createExpense]);
        setNewExpenseName('');
        setNewExpenseCost('');
      } else {
        console.error('Expense name and cost are required.');
      }
    } catch (error) {
      console.error('Error creating expense:', error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense({
        variables: {
          id,
        },
      });
      // Filter out the deleted expense from the local state
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <div className="my-8 mx-auto max-w-lg">
      <h2 className="text-2xl font-semibold mb-4">Expenses</h2>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={newExpenseName}
          onChange={(e) => setNewExpenseName(e.target.value)}
          placeholder="Enter expense name"
          className="p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 flex-grow"
        />
        <input
          type="text"
          value={newExpenseCost}
          onChange={(e) => setNewExpenseCost(e.target.value)}
          placeholder="Enter expense cost"
          className="p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          onClick={handleAddExpense}
          className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          Add
        </button>
      </div>

      {expenses.map((expense) => (
        <div key={expense._id} className="border p-4 mb-2 flex justify-between items-center">
          <span className="text-blue-500 font-semibold">
            {expense.name}
          </span>
          <div>
            <span>
              Total Cost: ${expense.cost}
            </span>
            <button
              onClick={() => handleDeleteExpense(expense._id)}
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none focus:ring focus:border-red-300"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Expenses;
