"use client";
// see SignupForm.js for comments
import { useState } from 'react';
import { Button, Checkbox, Label, TextInput, Alert } from 'flowbite-react';
//import { IoIosAlert } from "react-icons/io";
import { LOGIN_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate

const LoginForm = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const navigate = useNavigate(); // Initialize the useNavigate hook
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
      navigate('/homepage'); // Redirect user to the homepage
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  const isFormValid = formState.email && formState.password;

  return (
    <main className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mt-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="h-12 w-auto" src="/src/assets/images/webImages/BudgetBuddy-Logo.png" alt="Budget Buddy Logo" />
        <h2 className="mt-10 text-center text-2xl leading-9 tracking-tight">Sign in to your account</h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" noValidate onSubmit={handleFormSubmit}>
          <div>
            <TextInput
              id="email"
              type="email"
              name="email"
              placeholder="Your email"
              onChange={handleChange}
              value={formState.email}
              required
              className="block w-full rounded-md"
            />
          </div>
          <div>
            <TextInput
              id="password"
              type="password"
              name="password"
              placeholder="Your password"
              onChange={handleChange}
              value={formState.password}
              required
              className="block w-full rounded-md"
            />
          </div>
          <Button type="submit" className="w-full rounded-md bg-blue-500 text-gray-700">Submit</Button> {/* Changed text color to dark grey */}
        </form>
        {error && <div className="mt-4 text-center text-sm text-red-600">{error.message}</div>}
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/signup" className="text-indigo-600 hover:text-indigo-500">Sign up</Link>
        </p>
      </div>
    </main>
  );
};

export default LoginForm;