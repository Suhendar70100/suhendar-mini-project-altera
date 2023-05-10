import { useState } from 'react'
import Dashboard from './pages/dashboard/Dashboard'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RoomRequest from './components/RoomRequest'
import DashboardUser from './pages/dashboardUser/DashboardUser'
import RoomRequestUser from './components/RoomRequestUser'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
      <BrowserRouter>
        <Navbar />
        <div className="col">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/room-request" element={<RoomRequest />}></Route>
            <Route path="/dashboard-user/:id" element={<DashboardUser />}></Route>
            <Route path="/request-user/:id" element={<RoomRequestUser />}></Route>
          </Routes>
        </div>
      </BrowserRouter></>


  )
}

export default App
