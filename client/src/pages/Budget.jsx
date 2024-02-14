import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { BarController, CategoryScale as CategoryScaleController, LinearScale as LinearScaleController } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarElement, BarController, CategoryScaleController, LinearScaleController);

const Budget = () => {
  // Extracting the 'username' parameter from the route
  const { username: userParam } = useParams();

  // Fetching user data using Apollo Client
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || {};

  // State for managing edit mode and budget value
  const [editMode, setEditMode] = useState(false);
  const [budgetValue, setBudgetValue] = useState(100);

  // Checking if the screen size is mobile
  const isMobile = window.innerWidth <= 768; // Assuming mobile breakpoint is 768px

  // State for managing chart data
  const [chartData, setChartData] = useState({
    labels: ['Spent', 'Remaining'],
    datasets: [
      {
        label: 'Budget Overview',
        data: [0, budgetValue - 0],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderWidth: 1,
        barPercentage: isMobile ? 1.0 : 0.7, // Adjust the barPercentage based on screen size
      },
    ],
  });

  // Memoize setChartData with useCallback
  const memoizedSetChartData = useCallback(
    () => ({
      labels: ['Spent', 'Remaining'],
      datasets: [
        {
          label: 'Budget Overview',
          data: [5, budgetValue - 5],
          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
          borderWidth: 1,
          barPercentage: isMobile ? 1.0 : 0.7,
        },
      ],
    }),
    [budgetValue, isMobile]
  );

  // Effect to update chart data when budget value changes
  useEffect(() => {
    setChartData(memoizedSetChartData());
  }, [memoizedSetChartData]);

  // Handler for saving changes
  const handleSaveChanges = () => {
    // Handle Save Changes logic here
    setEditMode(false);
  };

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render component
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Budget Header */}
      <div className="budget-header mb-4">
        <h2>Viewing {userParam ? `${user.username}'s` : 'your'} budget.</h2>
      </div>

      {/* Budget Input Form */}
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

        {/* Edit and Save Buttons */}
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

      {/* Budget Chart */}
      <div className={`w-full mt-4 ${isMobile ? '' : 'md:w-3/4 lg:w-2/3'}`}>
        <Bar data={chartData} height={isMobile ? 100 : 100} />
      </div>
    </div>
  );
};

export default Budget;
