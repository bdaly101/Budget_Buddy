import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { Bar } from 'react-chartjs-2';

// Import necessary components from chart.js
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { BarController, CategoryScale as CategoryScaleController, LinearScale as LinearScaleController } from 'chart.js';

// Register the necessary components
Chart.register(CategoryScale, LinearScale, BarElement, BarController, CategoryScaleController, LinearScaleController);

const Budget = () => {
  // Extract the username parameter from the URL
  const { username: userParam } = useParams();

  // Fetch user data based on the username parameter using Apollo Client's useQuery hook
  const { loading, data } = useQuery(QUERY_ME);

  // Destructure user data from the query result
  const user = data?.me || {};

  // State for controlling edit mode
  const [editMode, setEditMode] = useState(false);
  const [budgetValue, setBudgetValue] = useState(100); // Initial value

  // Chart data state
  const [chartData, setChartData] = useState({
    labels: ['Spent', 'Remaining'],
    datasets: [
      {
        label: 'Budget Overview',
        data: [5, budgetValue - 5], // Assuming $5 has been spent, adjust accordingly
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'], // Blue for spent, Red for remaining
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    // Check if budgetValue is a valid number
    if (!isNaN(budgetValue)) {
      // Create a copy of the chart data
      const updatedChartData = { ...chartData };

      // Update the data in the copy
      updatedChartData.datasets[0].data = [5, budgetValue - 5]; // Assuming $5 has been spent, adjust accordingly

      // Set the updated chart data
      setChartData(updatedChartData);
    }
  }, [budgetValue, chartData]);

  // Display a loading message while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Budget header section */}
      <div className="budget-header mb-4">
        <h2>Viewing {userParam ? `${user.username}'s` : 'your'} budget.</h2>
      </div>

      {/* Budget form section */}
      <div className="w-1/3 bg-gray-100 p-10 rounded-md shadow-md flex flex-col items-center">
        {/* Budget input */}
        <label htmlFor="moneyAvailable" className="block mt-4 mb-2 text-sm font-medium text-gray-700">
          Budget:
        </label>
        <input
          type="text"
          id="moneyAvailable"
          value={budgetValue}
          readOnly={!editMode}
          onChange={(e) => setBudgetValue(Number(e.target.value))}
          className="w-13 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />

        {/* Edit Budget button */}
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

            {/* Save changes and Cancel changes buttons in edit mode */}
            {editMode && (
              <div className="ml-4 flex">
                <button
                  onClick={() => {
                    // Handle Save Changes logic here
                    setEditMode(false);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Budget Overview Chart */}
      <div className="w-1/3 mt-4">
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Budget;
