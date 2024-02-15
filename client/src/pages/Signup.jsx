"use client";
import { useState } from 'react';
import { Button, Label } from 'flowbite-react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations'; 
import Auth from '../utils/auth';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate



const Signup = () => {
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate(); 
  const [addUser, { error, data }] = useMutation(ADD_USER);
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({
      ...userFormData, 
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    //console.log(userFormData);
    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);
      navigate('/home'); // Redirect user to the homepage
    } catch (err) {
      console.error(err);
      // Handle error or show alert
    }

    
  };

  return (
    <main className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mt-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="h-12 w-auto mx-auto" src="/src/assets/images/webImages/BudgetBuddy-Logo.png" alt="Budget Buddy Logo"></img>
        <h2 className="mt-10 text-center text-2xl leading-9 tracking-tight">Sign Up</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <Label className='block text-sm font-medium leading-6' htmlFor="username1" value="username" />
            <input 
              className='block w-full rounded-md py-1.5' 
              id="username1"
              name="username"
              type="text"
              placeholder="username"
              required
              value={userFormData.username}
              onChange={handleInputChange}
            />
          </div>
          <div>
            
            <Label className='block text-sm font-medium leading-6' htmlFor="email1" value="Your email" />
            <input 
              className='block w-full rounded-md' 
              id="email1"
              name="email"
              type="email"
              placeholder="yourname@email.com"
              required
              value={userFormData.email}
              onChange={handleInputChange}
              
            />
            
          </div>
          <div>
            
            <Label className='block text-sm font-medium leading-6' htmlFor="password1" value="Your password" />
            <input 
              className='block w-full rounded-md shadow-sm focus:ring-2 focus:ring-inset focus:ring-[#3b7cae]' 
              id="password1" 
              name="password"
              type="password" 
              required
              value={userFormData.password}
              onChange={handleInputChange}
            />
          </div>
          <Button className='flex w-full mb-1 justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#3b7cae] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#2b5b88]'
            // disabled={!(userFormData.email && userFormData.password)}
            type='submit'
            variant='success'
            >
            Create New Account
          </Button>
          <div className='mt-10 text-center text-sm'>
            Already have an Account?
            <Link to="/login" className="font-semibold ml-1 leading-6 text-[#2b5b88] hover:text-[#3b7cae]">Log In</Link>
          </div>  
        </form>
        {error && <div className="mt-4 text-center text-sm text-red-600">{error.message}</div>}
      </div>
    </main>
  );
};

export default Signup;
