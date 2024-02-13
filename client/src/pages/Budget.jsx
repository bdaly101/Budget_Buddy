import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const BudgetPage = () => {
  // Extract the username parameter from the URL
  const { username: userParam } = useParams();

  // Fetch user data based on the username parameter using Apollo Client's useQuery hook
  const { loading, data } = useQuery(QUERY_ME);

  // Destructure user data from the query result
  const user = data?.me || {};

  // State for controlling edit mode
  const [editMode, setEditMode] = useState(false);

  // Redirect to the personal profile page if the logged-in user is viewing their own profile
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  // Display a loading message while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  // If the user is not logged in or the queried user doesn't exist, display a message
  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div className="budget-container">
      {/* Budget header section */}
      <div className="budget-header">
        <h2>
          Viewing {userParam ? `${user.username}'s` : 'your'} budget.
        </h2>
        {/* Button to toggle edit mode */}
        {!userParam && (
          <button onClick={() => setEditMode(true)}>Edit Budget</button>
        )}
      </div>

      {/* Budget form section */}
      <div className="budget-form">
        {/* Your input fields and select options here */}

        {/* Save changes button in edit mode */}
        {editMode && (
          <button onClick={() => setEditMode(false)}>Save Changes</button>
        )}
      </div>
    </div>
  );
};

export default BudgetPage;
