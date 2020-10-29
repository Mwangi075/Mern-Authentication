import React, { useState, useEffect } from 'react'
import{BrowserRouter,Switch,Route} from 'react-router-dom';
import Axios from 'axios';
import Header from './components/layout/header';
import home from './components/pages/home';
import login from './components/auth/login';
import Register from './components/auth/register';
import UserContext from './context/userContext';

import './style.css';




export default function App() {
    const [userData,setUserData]=useState({
        token:undefined,
        user:undefined,
    });
    useEffect(()=>{
        const checkUser=async()=>{
          let token=localStorage.getItem("auth-token");
          if(token===null){
              localStorage.setItem('auth-token','');
              token='';
          }
          const tokenRes=await Axios.post('http://localhost:3000/api/user/tokenisvalid',null,
          {headers:{'x-auth-token':token}})
          if(tokenRes.data){
              const userRes=await Axios.get('http://localhost:3000/api/user/',
              {headers:{'x-auth-token':token}});
              setUserData({
                  token,
                  user:userRes.data,
              })

          }
        }
        checkUser();
    },[]);
    return (
        <>
        <BrowserRouter>
        <UserContext.Provider value={{userData,setUserData}}>
        <Header/>
        <Route exact path="/home" component={home} />
        <div className='container'>
         <Switch>
            <Route  path="/login" component={login} />
            <Route  path="/Register" component={Register} />
        </Switch>
        </div>
        </UserContext.Provider>
        
        </BrowserRouter>
        </>
    )
}
