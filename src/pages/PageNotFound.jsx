import { Button } from '@mui/material'
import Cookies from 'js-cookie';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {

    useEffect(()=>{
        Cookies.remove('token');

    },[])
    const navigate = useNavigate()
    return (
        <div className='pageNotFound'>
        <div>You entered a wrong Page</div>
        <Button variant='contained' onClick={()=>navigate("/login")}>Back to Login</Button>
        </div>
    )
}

export default PageNotFound