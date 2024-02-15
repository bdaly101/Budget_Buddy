import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  const [editMode, setEditMode] = useState(false);

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4 className="text-center mt-8 text-red-500">
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div className="profile-container bg-gray-100 p-8 rounded-md">
      <div className="profile-header mb-4">
        <h2 className="text-2xl font-semibold">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>
        {!userParam && (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            Edit Information
          </button>
        )}
      </div>

      <div className="profile-info">
        <p className="mb-2">
          <span className="font-semibold">Username:</span> {user.username}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Budget:</span> {user.budget}
        </p>

        {editMode && (
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        )}

        {editMode && (
          <button
            onClick={() => setEditMode(false)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
