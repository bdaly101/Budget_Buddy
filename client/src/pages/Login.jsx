"use client";
// see SignupForm.js for comments
import { useState } from 'react';
import { Button, Checkbox, Label, TextInput, Alert } from 'flowbite-react';
import { IoIosAlert } from "react-icons/io";
import { LOGIN_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [login, { error, data }] = useMutation(LOGIN_USER);
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
      const response = await login(userFormData);

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
    <>
      <form className="flex max-w-md flex-col gap-4" noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert color="failure" onDismiss={() => alert('Alert dismissed!')} icon={IoIosAlert}>
          Something went wrong, please try again.
        </Alert>
        <div>
          <div>
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput id="email1"
            type="email"
            placeholder="yourname@email.com"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput id="password1" type="password" 
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
