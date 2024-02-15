import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries'; // Ensure DELETE_EXPENSE is imported
import { CREATE_EXPENSE, DELETE_EXPENSE } from '../utils/mutations';
const Expenses = () => {
    const { username: userParam } = useParams();

    const navigate = useNavigate();
    const [newExpenseName, setNewExpenseName] = useState('');
    const [newExpenseCost, setNewExpenseCost] = useState('');
    const { loading, data } = useQuery(QUERY_ME);
    const user = data?.me || {};
    const [createExpense] = useMutation(CREATE_EXPENSE);
    const [deleteExpense] = useMutation(DELETE_EXPENSE); // Use the deleteExpense mutation
    const [expenses, setExpenses] = useState([]);
    
    console.log(data)

    useEffect(() => {
      if (!loading && data?.me) {
        setExpenses(data.me.expenses);
      }
    }, [loading, data]);
  
    const handleAddExpense = async () => {
        
        console.log(parseFloat(newExpenseCost))
      try {
        const { data: expenseData } = await createExpense({
          variables: {
            name: newExpenseName,
            cost: parseFloat(newExpenseCost),
            userId: data.me._id // Assuming you have the user's ID in the fetched data
          },
        });
        
        setExpenses([...expenses, expenseData.createExpense]);
        setNewExpenseName('');
        setNewExpenseCost('')
      } catch (error) {
        console.error("Error creating expense:", error);
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
          setExpenses(expenses.filter(expense => expense._id !== id));
        } catch (error) {
          console.error("Error deleting expense:", error);
        }
      };

      if (loading) return <div>Loading...</div>;

      if (!user?.username) {
        return (
          <div className='w-1/2 container justify-center mx-auto'>
          <h4>
            You need to be logged in to see this. Use the navigation links above to
            sign up or log in!
          </h4>
            <a href="/login" className='flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#3b7cae] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#2b5b88]'>Go to Login</a>
          </div>
        );
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
            type="number"
            value={newExpenseCost}
            onChange={(e) => setNewExpenseCost(e.target.value)}
            placeholder="Enter expense cost"
            className="p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 flex-grow"
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
        Total Cost: $
        {expense.cost}
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
