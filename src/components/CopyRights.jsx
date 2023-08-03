import { Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

const CopyRights = () => {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                MyMOney
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    ); 
}

export default CopyRights