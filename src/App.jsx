import { useState } from 'react'
import Dashboard from './pages/dashboard/Dashboard'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

function App() {

  return (
    // <>
    //   <Dashboard />
    // </>
    <div className="d-flex">
      <div className="w-auto">
        <Sidebar />
      </div>
      <div className="col">
        <Navbar />
        <div className="container">
          <div className="row">
            <Dashboard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
