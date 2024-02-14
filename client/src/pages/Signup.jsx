import { useState } from 'react';
import { Button, Alert } from 'flowbite-react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {

  const [addUser, { error, data }] = useMutation(ADD_USER);
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const response = await createUser(userFormData);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { token, user } = await response.json();
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <main className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mt-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="h-12 w-auto" src="/src/assets/images/webImages/BudgetBuddy-Logo.png" alt="Budget Buddy Logo" />
        <h2 className="mt-10 text-center text-2xl leading-9 tracking-tight">Create your account</h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" noValidate validated={validated} onSubmit={handleFormSubmit}>
          <div>
            <input
              type='text'
              placeholder='Your username'
              name='username'
              onChange={handleInputChange}
              value={userFormData.username}
              required
              className="block w-full rounded-md"
            />
          </div>
          <div>
            <input
              type='email'
              placeholder='Your email address'
              name='email'
              onChange={handleInputChange}
              value={userFormData.email}
              required
              className="block w-full rounded-md"
            />
          </div>
          <div>
            <input
              type='password'
              placeholder='Your password'
              name='password'
              onChange={handleInputChange}
              value={userFormData.password}
              required
              className="block w-full rounded-md"
            />
          </div>
          <Button type="submit" className="w-full rounded-md bg-blue-500 text-gray-700">Submit</Button>
        </form>
        {error && <div className="mt-4 text-center text-sm text-red-600">{error.message}</div>}
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-indigo-600 hover:text-indigo-500">Sign in</Link>
        </p>
      </div>
    </main>
  );
};


export default SignupForm;
