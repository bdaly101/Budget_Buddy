import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { useParams, Navigate } from 'react-router-dom';

const Home = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  console.log("Start")
  console.log(data)
  console.log(user);
  console.log(user.username)
  console.log("end")
  // navigate to personal profile page if username is yours

  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  if (Auth.loggedIn()) {

    return (<>
      <p>Viewing {user.username}'s profile</p>
      <p>Money left in budget: {user.budget}</p>
      <p>Top Expenses:</p>
      <p>Recent Purchases:</p>
    </>
    );
  }
};

export default Home;

