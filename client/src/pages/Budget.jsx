import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Budget = () => {
  // Extract the username parameter from the URL
  const { username: userParam } = useParams();

  // Fetch user data based on the username parameter using Apollo Client's useQuery hook
  const { loading, data } = useQuery(QUERY_ME);

  // Destructure user data from the query result
  const user = data?.me || {};

  // State for controlling edit mode
  const [editMode, setEditMode] = useState(false);

  // Redirect to the personal profile page if the logged-in user is viewing their own profile
  // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  //   return <Navigate to="/me" />;
  // }

  // Display a loading message while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  /* If the user is not logged in or the queried user doesn't exist, display a message
  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }
*/
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Budget header section */}
      <div className="budget-header mb-4">
        <h2>
          Viewing {userParam ? `${user.username}'s` : 'your'} budget.
        </h2>
      </div>

{/* Budget form section */}
<div className="w-1/3 bg-gray-100 p-10 rounded-md shadow-md flex flex-col items-center">
  <label htmlFor="moneyAvailable" className="block mt-4 mb-2 text-sm font-medium text-gray-700">
    Budget:
  </label>
  <input
    type="text"
    id="moneyAvailable"
    value="10"
    readOnly={!editMode}
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
    </div>
  );
};

export default Budget;
