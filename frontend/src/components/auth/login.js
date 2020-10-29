import React,{useState,useContext} from 'react'
import UseContext from '../../context/userContext';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import ErrorNotice from '../Errors/errorNotice';
import {Link} from 'react-router-dom';

export default function Login() {

    const[email,setEmail]=useState();
    const[password,setPassword]=useState();
    const[error,setError]=useState();

    const {setUserData}=useContext(UseContext);
    const history=useHistory()

    const submit=async(e)=>{
        e.preventDefault();
        try{
        const loginUser={email,password,};

        const loginRes= await Axios.post('http://localhost:3000/api/user/login',loginUser);
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
        <div>
           <h2>log In</h2>
           {error &&<ErrorNotice message={error} clearError={()=>setError(undefined)}/>}
           <form className='form'>
        <label htmlFor='login-email'>Email</label>
        <input id="login-email" type="email" onChange={(e)=>setEmail(e.target.value)}/>

        <label htmlFor='login-password'>Password</label>
        <input id="login-password" type="password" onChange={(e)=>setPassword(e.target.value)}/>

        <input type="submit" value="login" onClick={submit}/>
        </form>
          <div className="moveTo">
              <p>Don't Have an Account? 
                  <Link to='/register'> Create an account</Link>
              </p>
          </div>
        </div>
      )
}

