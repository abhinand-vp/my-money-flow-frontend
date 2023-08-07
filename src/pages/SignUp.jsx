import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import CopyRights from '../components/CopyRights';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const defaultTheme = createTheme();

const SignIn = () => {
    const isAuthenticated = localStorage.getItem('token');
    
    useEffect(()=>{
        if(isAuthenticated){
            navigate("/dashboard")
        }
    },[])
    
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("eeeeeeee", data);
        debugger;
        const apiUrl = 'http://localhost:3001/signup';
        const userData = {
            name: data.username,
            email: data.email,
            password: data.password,
        };
        axios.post(apiUrl, userData , {withCredentials : true})
            .then(response => {
                reset()
                if (response.data.signup) {
                    Cookies.set('token',response.data.token, {expires : 7})
                    navigate("/dashboard");
                }
                else {
                    toast.error(response.data.msg)
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={6}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
                    <Toaster />

                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        </Avatar>
                        <Typography component="h1" variant="h5" sx={{ marginBottom: 3 }}>
                            Register Here ! 😍
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <TextField
                                    {...register('username')}
                                    label="username"
                                    fullWidth
                                    type={"username"}
                                    sx={{ marginBottom: 3 }}
                                    variant="outlined"
                                    error={!!errors.username}
                                    helperText={errors.username && 'username is required.'}
                                />
                                <TextField
                                    {...register('email', { required: true })}
                                    label="Email"
                                    fullWidth
                                    variant="outlined"
                                    type='text'
                                    sx={{ marginBottom: 3 }}
                                    error={!!errors.email}
                                    helperText={errors.email && 'email is required.'}
                                />
                                <TextField
                                    {...register('password')}
                                    label="Password"
                                    fullWidth
                                    type={"password"}
                                    sx={{ marginBottom: 3 }}
                                    variant="outlined"
                                    error={!!errors.password}
                                    helperText={errors.password && 'password is required.'}
                                />
                                <Grid sx={{ display: 'flex', justifyContent: 'center', paddingBottom: 3 }}>
                                    <Button type='submit' variant='contained'>
                                        sign Up
                                    </Button>
                                </Grid>

                            </form>
                            <Grid>
                                <Typography sx={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => navigate("/")} variant="body2">
                                    {"Already a User"}
                                </Typography>
                            </Grid>
                            <Grid sx={{ mt: 5 }}>
                                <CopyRights />
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default SignIn;

