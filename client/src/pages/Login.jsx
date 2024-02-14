"use client";
// see SignupForm.js for comments
import { useState } from 'react';
import { Button, Checkbox, Label, TextInput, Alert } from 'flowbite-react';
//import { IoIosAlert } from "react-icons/io";
import { LOGIN_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';

const LoginForm = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

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
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mt-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="h-12 w-auto mx-auto" src="/src/assets/images/webImages/BudgetBuddy-Logo.png"></img>
        <h2 className="mt-10 text-center text-2xl leading-9 tracking-tight">Sign in to your account</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" noValidate onSubmit={handleFormSubmit}>
          {/* <Alert color="failure" onDismiss={() => alert('Alert dismissed!')} icon={IoIosAlert}>
            Something went wrong, please try again.
          </Alert> */}
          <div>
            <div>
              <Label className='block text-sm font-medium leading-6' htmlFor="email1" value="Your email" />
            </div>
            <TextInput className='block text-sm font-medium leading-6' id="email1"
              type="email"
              placeholder="yourname@email.com"
              required
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label className='block text-sm font-medium leading-6' htmlFor="password1" value="Your password" />
            </div>
            <TextInput className='block w-full rounded-md border-0 py-1.5 shadow-sm focus:ring-2 focus:ring-inset focus:ring-[#3b7cae]' id="password1" type="password" 
              required
            />
            <div class="text-sm">
            <a href="#" className="font-semibold text-[#2b5b88] hover:text-[#3b7cae]">Forgot password?</a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox className="rounded-sm active:bg-[#2b5b88]" id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button className='flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#3b7cae] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#2b5b88]'
            // disabled={!(userFormData.email && userFormData.password)}
            type='submit'
            variant='success'>
            Submit
          </Button>
          <div className='mt-10 text-center text-sm'>
            Not a member?
            <a href="/signup/" className="font-semibold leading-6 ml-1 text-[#2b5b88] hover:text-[#3b7cae]">Sign up</a>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginForm;
