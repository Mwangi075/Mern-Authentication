import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom';
import UseContext from '../../context/userContext';


export default function AuthOptions() {
const{userData,setUserData}=useContext(UseContext);
    const history=useHistory();
    const login=()=>history.push('/login');
    const register=()=> history.push('/register');
    const logOut=()=>{
      setUserData({
        token:undefined,
        user:undefined
      });
      localStorage.setItem('auth-token',"")
    }
  

    return (
        <nav className='options'>
          {
            userData.user ?
            <button onClick={logOut}>Log Out</button> :(
            <>
            <button onClick={login}>Login</button>
            <button onClick={register}>Register</button>
            </>
            )
          }
           
        </nav>
    )
}
