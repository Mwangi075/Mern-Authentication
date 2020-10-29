import React from 'react'
import {Link} from 'react-router-dom';
import AuthOptions from '../auth/authOptions';


export default function header() {
    return (
        <header id='header' className='head'>
           <Link  to='/home'> <h1 className='title'>KK CLOSETS</h1>
           
           </Link>
           <AuthOptions/>
       </header>
       
    )
}
