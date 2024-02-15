import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { UPDATE_USER } from '../utils/mutations';
import { Bar } from 'react-chartjs-2';
import Auth from '../utils/auth';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement);

const Budget = (props) => {
  const { username: userParam } = useParams();

  
  // Extracting the 'username' parameter from the route
  
  // Fetching user data using Apollo Client
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || {};
  console.log(user)
  const [totalExpense, setTotalExpense] = useState(user.budget);
  // State for managing edit mode and budget value
  const [budgetValue, setBudgetValue] = useState(user.budget);

  const [updateUser, { error }] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (!loading && user?.budget) {
      setBudgetValue(user.budget);
    }
  }, [loading, user?.budget]);

  const [chartData, setChartData] = useState({
    labels: ['Spent', 'Remaining'],
    datasets: [
      {
        label: 'Budget Overview',
        data: [0, 0],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderWidth: 1,
        barPercentage: 0.7, // Adjust the barPercentage based on screen size
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: ['Spent', 'Remaining'],
      datasets: [
        {
          label: 'Budget Overview',
          data: [totalExpense, budgetValue],
          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
          borderWidth: 1,
          barPercentage: 0.7,
        },
      ],
    });
  }, [totalExpense, budgetValue]);

  

  const handleFormSubmit = async (event) => {
    event.preventDefault()

    try {
      console.log("Here")
      console.log(user._id.type) //logs undefined
      console.log(budgetValue.type) //logs undefined
      console.log("There")
      await updateUser({
        variables: { id: user._id, budget: budgetValue },
        
      });

        setChartData({
          labels: ['Spent', 'Remaining'],
          datasets: [
            {
              label: 'Budget Overview',
              data: [totalExpense, budgetValue - totalExpense], // Example spent value of 5 for illustration
              backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
              borderWidth: 1,
              barPercentage: 0.7,
            },
          ],
        });

    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!user?.username) {
    return (
      <div className='w-1/2 container justify-center mx-auto'>
      <h4>
        You need to be logged in to see this.
      </h4>
        <a href="/login" className='flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#3b7cae] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#2b5b88]'>Go to Login</a>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Budget Header */}
      <div className="budget-header mb-4">
        <h2>Viewing {user.username} budget.</h2>
      </div>

      {/* Budget Input Form */}
      <div className="w-full md:w-1/2 lg:w-1/3 bg-gray-100 p-4 md:p-8 rounded-md shadow-md">
       <form
        onSubmit={handleFormSubmit}>
        <label htmlFor="moneyAvailable" className="block mt-4 mb-2 text-sm font-medium text-gray-700">
          Budget:
        </label>
        <input
          type="text"
          id="moneyAvailable"
          value={budgetValue}
          onChange={(e) => setBudgetValue(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          type={"submit"}
          className= "px-4 py-2 bg-blue-500">
            Edit Budget
        </button>
        </form>
      </div>

      {/* Budget Chart */}
      <div className={`w-full mt-4  md:w-3/4 lg:w-2/3`}>
        <Bar data={chartData} height={100} />
      </div>
    </div>
  );
};

export default Budget;
