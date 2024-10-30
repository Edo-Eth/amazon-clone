
import React, { useEffect, useContext } from 'react'
import './App.css'
import Routing from './Router.jsx'
import { DataContext } from './components/DataProvider/DataProvider.jsx'
import { Type } from './Utility/action.type.js'
import { auth } from './Utility/firebase.js'


function App() {
  const [{user}, dispatch] = useContext(DataContext)

  useEffect(() => {
     auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);
      console.log(authUser)
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
    
  
  return (
    <>
      
         <Routing /> 
        
    </>
  );
}

export default App
