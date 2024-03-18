import { useState, useEffect } from 'react';
import { SignUp, Login, Homepage } from './components';
import {Routes, Route} from 'react-router-dom';
import './index.css';

const App = () => {

 const [token, setToken] = useState(false)

  if(token){
    sessionStorage.setItem('token',JSON.stringify(token))
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      let data = JSON.parse(sessionStorage.getItem('token')!);
      setToken(data.token);
    } else {
      sessionStorage.clear();
    }
    
  }, [])
  

 
  return (
    <div>
      <Routes>
        <Route path={'/signup'} element={ <SignUp />} />
        <Route path={'/'} element={ <Login setToken={setToken}/>} />
        {token?<Route path={'/homepage'} element={ <Homepage token={token} />} />:""}

      </Routes>
     
      
    </div>
  )
}

export default App