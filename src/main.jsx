import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './pages/dashboard/Dashboard';
import DashboardUser from './pages/dashboardUser/DashboardUser';
import RoomRequest from './pages/dashboard/RoomRequest';
import RoomRequestUser from './pages/dashboardUser/RoomRequestUser';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import Navbar from './components/Navbar';
import NavbarUser from './components/NavbarUser';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  // {
  //   path: '/dashboard',
  //   element: <Dashboard />,
  //   loader: () => {
  //     const isLogin = JSON.parse(localStorage.getItem("isLoggedIn"));
  //     if (!isLogin) {
  //       return redirect('/login')
  //     }
  //     return null
  //   },
  // },
  // {
  //   path: '/room-request',
  //   element: <RoomRequest />,
  //   loader: () => {
  //     const isLogin = JSON.parse(localStorage.getItem("isLoggedIn"));
  //     if (!isLogin) {
  //       return redirect('/login')
  //     }
  //     return null
  //   },
  // },
  // {
  //   path: '/dashboard-user/:id',
  //   element: <DashboardUser />,
  //   loader: () => {
  //     const isLogin = JSON.parse(localStorage.getItem("isLoggedIn"));
  //     if (!isLogin) {
  //       return redirect('/login')
  //     }
  //     return null
  //   },
  // },
  // {
  //   path: '/request-user/:id',
  //   element: <RoomRequestUser />,
  //   loader: () => {
  //     const isLogin = JSON.parse(localStorage.getItem("isLoggedIn"));
  //     if (!isLogin) {
  //       return redirect('/login')
  //     }
  //     return null
  //   },
  // },
  {
    path: 'dashboard',
    element: <Navbar />,
    loader: () => {
      const isLogin = JSON.parse(localStorage.getItem("isLoggedIn"));
      if (!isLogin) {
        return redirect('/login')
      }
      return null
    },
    children: [
      {
        element: <Dashboard />,
        index: true,
      },
      {
        path: 'room-request',
        element: <RoomRequest />,
      },
    ],
  },
  {
    path: 'dashboard-user/:id',
    element: <NavbarUser />,
    loader: () => {
      const isLogin = JSON.parse(localStorage.getItem("isLoggedIn"));
      if (!isLogin) {
        return redirect('/login')
      }
      return null
    },
    children: [
      {
        element: <DashboardUser />,
        index: true,
      },
      {
        path: 'request-user/:id',
        element: <RoomRequestUser />,
      },
    ],
  },

])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
