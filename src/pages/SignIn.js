import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import CopyRights from '../components/CopyRights';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../store/userDetails/UserActions';
import { Heading } from '@chakra-ui/react';
import { getDashboard } from '../store/dashboardApis/DashboardAction';

const defaultTheme = createTheme();

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const value = useSelector((store)=>store.user);
    // console.log("loginvalaueee", value);



    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(()=>{
        const localCookies = Cookies.get('token')
        if (localCookies) {
            navigate("/dashboard")
        }
    },[])

    const onSubmit = (data) => {
        const userData = {
            email: data.email,
            password: data.password,
        };

        dispatch(getUser(userData)).then((res) => {
            console.log("reeeeeee", res);
            if (res.payload.login) {
                reset();
                Cookies.set('token', res.payload.token, { expires: 7 })
                navigate("/dashboard");
            }
            else {
                toast.error(res.payload.msg)

            }
        })

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
                            Sign in
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Heading>Hellooo</Heading>
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
                                    {...register('password', { required: true })}
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
                                        sign in
                                    </Button>
                                </Grid>
                            </form>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Typography sx={{ cursor: 'pointer' }} onClick={() => navigate("/signup")} variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Typography>
                                </Grid>
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

