import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

import { useParams, Navigate } from 'react-router-dom';

const Home = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return <Navigate to="/login" />;
  }

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return (
      <>
      <p>Viewing {userParam ? `${user.username}'s` : 'your'} profile</p>
      <p>Money left in budget: {user.budget}</p>
    </>
  );

  }
};

export default Home;

