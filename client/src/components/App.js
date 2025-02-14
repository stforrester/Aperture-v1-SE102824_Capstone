import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Login from './Login.js'
import CreateAccount from './CreateAccount.js'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchUser()
  },[])

  const fetchUser = () => (
    fetch('/logged_in')
    .then(response => {
      if(response.ok){
        response.json()
        .then(data =>{
          setUser(data)
        })
      } else {
        setUser(null)
      }
    })
  )

  const updateUser = (user) => setUser(user)

  if(!user) return (
    <Routes>
      <Route path="/" element={<Login updateUser={updateUser}/>} />
    </Routes>
  )

  return(
    <>
    
    </>
  )
}

export default App;
