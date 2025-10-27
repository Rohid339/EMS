import React, { useState, useEffect, useContext } from "react";
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { Authcontext } from './context/AuthProvider'

function App() {

  const [user, setUser] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const [userData, setUserData] = useContext(Authcontext)

  useEffect(() => {  
    const loggedInUser = localStorage.getItem('loggedInUser')

    if(loggedInUser){
      const userData = JSON.parse(loggedInUser)
      setUser(userData.role)
      setLoggedInUserData(userData.data)
    }

  }, [])
  
  const handleLogin = (email, password) => {
    if(email == 'rhd@gmail.com' && password == '123'){
      setUser('admin')
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }))
    }
    else if(userData){
      const employee = userData.find((e)=> email== e.email && password == e.password)
      if(employee){
        setUser('employee')
        setLoggedInUserData(employee)
        localStorage.setItem('loggedInUser',JSON.stringify({ role: 'employee',data:employee }))
      }
    }
    else{
      alert("Invalid Iredentials")
    }
  }


  return (
    <>
      {!user ? <Login handleLogin={handleLogin}/>: ''}
      {user == 'admin' ? <AdminDashboard changeUser={setUser}/>: (user == 'employee' ? <EmployeeDashboard changeUser={setUser} data={loggedInUserData}/>: null)}
    </>
  )
}

export default App
