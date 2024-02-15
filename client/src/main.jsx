import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from './components/Header.jsx'

import App from './App.jsx'
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Budget from './pages/Budget';
import Profile from './pages/Profile';
import Expenses from './pages/Expenses';
import SingleExpense from './pages/SingleExpense';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <HomePage />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/home',
        element: <HomePage />
      }, {
        path: '/budget',
        element: <Budget />
      }, 
      {
        path: '/profile',
        element: <Profile />
      }, 
      {
        path: '/expenses',
        element: <Expenses />
      }, 
      {
        path: '/expenses/:expenseID',
        element: <SingleExpense />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
