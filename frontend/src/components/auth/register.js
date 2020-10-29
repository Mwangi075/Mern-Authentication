import React, { useState, useContext} from 'react';
import UseContext from '../../context/userContext';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import ErrorNotice from '../Errors/errorNotice';
import {Link} from 'react-router-dom';


export default function Register() {
    const[email,setEmail]=useState();
    const[username,setUsername]=useState();
    const[password,setPassword]=useState();
    const[passwordcheck,setPasswordcheck]=useState();
    const[error,setError]=useState();

    const {setUserData}=useContext(UseContext);

    const history=useHistory()


    const submit=async(e)=>{
      e.preventDefault();
      try{
      const newUser={email,username,password,passwordcheck};
      await Axios.post('http://localhost:3000/api/user/register',newUser);
      const loginRes= await Axios.post('http://localhost:3000/api/user/login',{
          email,
          password,
      });
      setUserData({
          token:loginRes.data.token,
          user:loginRes.data.user,

      });
      localStorage.setItem('auth-token',loginRes.data.token);
      history.push('/home');
    }catch(err){
       err.response.data.msg && setError(err.response.data.msg)
    }
    }

    return (
        <div className='page'>
        <h2>Register</h2>
        {error &&<ErrorNotice message={error} clearError={()=>setError(undefined)}/>}
        <form className='form'>
        <label htmlFor='register-email'>Email</label>
        <input id="register-email" type="email" onChange={(e)=>setEmail(e.target.value)}/>

        <label htmlFor='register-username'>Username</label>
        <input id="register-username" type="username" onChange={(e)=>setUsername(e.target.value)}/>

        <label htmlFor='register-password'>Password</label>
        <input id="register-password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
        <input type="password" placeholder="verify password" onChange={(e)=>setPasswordcheck(e.target.value)}/>

        <input type="submit" value="register" onClick={submit}/>
        </form>
        <div className="moveTo">
            <p>Already have a account ?   
                < Link to='/login'> Login</Link>
            </p>
        </div>
        </div>
        
            

        
    )
}
