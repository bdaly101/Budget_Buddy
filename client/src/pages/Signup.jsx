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
  const [email, setEmail] = useState(false);
  const checkEmail = (e) => {
    e.preventDefault();
    const emailCheck = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(e.target.value);
    console.log(emailCheck);
    if (!emailCheck) {
      setEmail(true);
    } else {
      setEmail(false);
    }
  };
  const checkText = (e) => {
    e.preventDefault();
    !e.target.value ? setText(true) : setText(false);
  };

  return (
    <main className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mt-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="h-12 w-auto mx-auto" src="/src/assets/images/webImages/BudgetBuddy-Logo.png"></img>
        <h2 className="mt-10 text-center text-2xl leading-9 tracking-tight">Sign Up</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" >
          {/* <Alert color="failure" onDismiss={() => alert('Alert dismissed!')} icon={IoIosAlert}>
            Something went wrong, please try again.
          </Alert> */}
          <div>
            <div className="">
              <Label className='block text-sm font-medium leading-6' htmlFor="username1" value="Username" />
            </div>
            <TextInput className='block w-full rounded-md border-0 py-1.5' id="username1"
              type="username"
              placeholder=""
              required
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label className='block text-sm font-medium leading-6' htmlFor="email1" value="Your email" />
            </div>
            <TextInput className='block w-full rounded-md border-0 py-1.5' id="email1"
              type="email"
              placeholder="yourname@email.com"
              required
              onBlur={checkEmail}
            />
            {email ? <p className="errMsg text-red-600">Please enter a valid email.</p> : <></>}
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label className='block text-sm font-medium leading-6' htmlFor="password1" value="Your password" />
            </div>
            <TextInput className='block w-full rounded-md border-0 py-1.5 shadow-sm focus:ring-2 focus:ring-inset focus:ring-[#3b7cae]' id="password1" type="password" 
              required
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label className='block text-sm font-medium leading-6' htmlFor="confirmpass1" value="Re-enter password" />
            </div>
            <TextInput className='block w-full rounded-md border-0 py-1.5 shadow-sm focus:ring-2 focus:ring-inset focus:ring-[#3b7cae]' id="password1" type="password" 
              required
            />
          </div>
          <Button className='flex w-full mb-1 justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#3b7cae] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#2b5b88]'
            // disabled={!(userFormData.email && userFormData.password)}
            type='submit'
            variant='success'>
            Create New Account
          </Button>
          Already have an Account?
          <a href="/login/" className="font-semibold ml-1 leading-6 text-[#2b5b88] hover:text-[#3b7cae]">Log In</a>
        </form>
      </div>
    </main>
  );
};


export default SignupForm;
