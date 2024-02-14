import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { Bar } from 'react-chartjs-2';
import Auth from '../utils/auth';
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { BarController, CategoryScale as CategoryScaleController, LinearScale as LinearScaleController } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarElement, BarController, CategoryScaleController, LinearScaleController);

const Budget = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || {};

  const [editMode, setEditMode] = useState(false);
  const [budgetValue, setBudgetValue] = useState(100);

  const isMobile = window.innerWidth <= 768; // Assuming mobile breakpoint is 768px

  const [chartData, setChartData] = useState({
    labels: ['Spent', 'Remaining'],
    datasets: [
      {
        label: 'Budget Overview',
        data: [5, budgetValue - 5],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderWidth: 1,
        barPercentage: isMobile ? 1.0 : 0.7, // Adjust the barPercentage based on screen size
      },
    ],
  });

  useEffect(() => {
    if (!isNaN(budgetValue)) {
      const updatedChartData = { ...chartData };
      updatedChartData.datasets[0].data = [5, budgetValue - 5];
      setChartData(updatedChartData);
    }
  }, [budgetValue, isMobile]);

  const handleSaveChanges = () => {
    // Handle Save Changes logic here
    setEditMode(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
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
    <div className="flex flex-col items-center justify-center">
      <div className="budget-header mb-4">
        <h2>Viewing {userParam ? `${user.username}'s` : 'your'} budget.</h2>
      </div>

      <div className="w-full md:w-1/2 lg:w-1/3 bg-gray-100 p-4 md:p-8 rounded-md shadow-md">
        <label htmlFor="moneyAvailable" className="block mt-4 mb-2 text-sm font-medium text-gray-700">
          Budget:
        </label>
        <input
          type="text"
          id="moneyAvailable"
          value={budgetValue}
          readOnly={!editMode}
          onChange={(e) => setBudgetValue(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />

        {!userParam && (
          <div className="flex items-center mt-4">
            <button
              onClick={() => setEditMode(!editMode)}
              className={`px-4 py-2 ${
                editMode ? 'bg-red-500' : 'bg-blue-500'
              } text-white rounded-md focus:outline-none focus:ring focus:border-${
                editMode ? 'red' : 'blue'
              }-300`}
            >
              {editMode ? 'Cancel Changes' : 'Edit Budget'}
            </button>

            {editMode && (
              <div className="ml-4 flex">
                <button
                  onClick={handleSaveChanges}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className={`w-full mt-4 ${isMobile ? '' : 'md:w-3/4 lg:w-2/3'}`}>
        <Bar data={chartData} height={isMobile ? 100 : 100} />
      </div>
    </div>
  );
};

export default Budget;
