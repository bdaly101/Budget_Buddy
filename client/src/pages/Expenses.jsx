import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SingleExpense from './SingleExpense';

const Expenses = () => {
  // React Router hooks for navigation and getting parameters from the URL
  const navigate = useNavigate();
  const { expenseIndex } = useParams();

  // State variables to manage expenses
  const [newExpense, setNewExpense] = useState('');
  const [expenses, setExpenses] = useState([
    'Groceries',
    'Rent',
    'Utilities',
    'Transportation',
    'Entertainment',
  ]);

  // State variables to manage selected expense and associated purchases and total cost
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [purchases, setPurchases] = useState([]); // State for purchases
  const [totalCost, setTotalCost] = useState(0); // State for total cost

  // useEffect to update purchases and total cost based on selectedExpense and expenseIndex
  useEffect(() => {
    if (selectedExpense !== null && expenseIndex) {
      // Update purchases and total cost based on selectedExpense
      // You should replace this with your actual logic to fetch or calculate purchases and total cost
      // For now, I'll set them as empty and 0 respectively
      setPurchases([]);
      setTotalCost(0);
    }
  }, [selectedExpense, expenseIndex]);

  // Handler for adding a new expense
  const handleAddExpense = () => {
    if (newExpense.trim() !== '') {
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
      setNewExpense('');
    }
  };

  // Handler for updating an existing expense
  const handleUpdateExpense = (newExpenseName, newTotalCost) => {
    if (selectedExpense !== null && newExpense.trim() !== '') {
      const updatedExpenses = [...expenses];
      updatedExpenses[selectedExpense] = newExpense;
      setExpenses(updatedExpenses);
      setNewExpense('');
      setSelectedExpense(null);
    }
  };

  // Handler for editing the name of an expense
  const handleEditName = (index) => {
    setNewExpense(expenses[index]);
    setSelectedExpense(index);
  };

  // Handler for editing or adding an expense
  const handleEditExpense = () => {
    if (selectedExpense === null) {
      handleAddExpense();
    } else {
      handleUpdateExpense();
    }
  };

  // Handler for deleting an expense
  const handleDeleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
    setNewExpense('');
    setSelectedExpense(null);
  };

  // Handler for viewing an expense
  const handleViewExpense = (index) => {
    setSelectedExpense(index);
    navigate(`/expenses/${index}`);
  };

  return (
    <div className="my-8 mx-auto max-w-lg">
      <h2 className="text-2xl font-semibold mb-4">Expenses</h2>

      {/* Input and button for adding/editing an expense */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={newExpense}
          onChange={(e) => setNewExpense(e.target.value)}
          placeholder="Enter expense name"
          className="p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 flex-grow"
        />
        <button
          onClick={handleEditExpense}
          className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          {selectedExpense !== null ? 'Save Changes' : 'Add'}
        </button>
      </div>

      <h3 className="text-2xl font-semibold mb-4">Monthly Spending</h3>

      {/* Displaying the list of expenses */}
      <div className="mt-4">
        {expenses.map((expense, index) => (
          <div key={index} className="border p-4 mb-2 flex justify-between items-center">
            <span
              onClick={() => handleEditName(index)}
              className="text-blue-500 font-semibold cursor-pointer hover:underline"
            >
              {expense}
            </span>
            <div className="flex space-x-2">
              {/* Button to view an expense */}
              <span
                onClick={() => handleViewExpense(index)}
                className="text-blue-500 font-semibold cursor-pointer hover:underline"
              >
                View
              </span>
              {/* Button to delete an expense */}
              <span
                onClick={() => handleDeleteExpense(index)}
                className="text-red-500 font-semibold cursor-pointer hover:underline"
              >
                Delete
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Render SingleExpense component conditionally based on selectedExpense and whether on the single expense view */}
      {selectedExpense !== null && expenseIndex && (
        <SingleExpense
          selectedExpenseName={expenses[selectedExpense]}
          purchases={purchases}
          totalCost={totalCost}
          onUpdateExpense={handleUpdateExpense}
          onAddPurchase={() => {}} // Add your function for adding a purchase
        />
      )}
    </div>
  );
};

export default Expenses;
