import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { useParams } from 'react-router-dom';

const Home = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is yours

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4 className="text-center mt-8 text-red-500">
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  if (Auth.loggedIn()) {
    return (
      <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
        <p className="text-lg font-semibold mb-2">
          Viewing {user.username}'s profile
        </p>
        <p className="mb-2">
          Money left in budget: ${user.budget}
        </p>
        <p className="mb-2">Top Expenses:</p>
        <p className="mb-2">Recent Purchases:</p>
      </div>
    );
  }
};

export default Home;
