// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useNavigate } from 'react-router-dom';
// import CopyRights from '../components/CopyRights';

// const defaultTheme = createTheme();

// const SignUp = () => {
//     const navigate = useNavigate();

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const data = new FormData(event.currentTarget);
//         console.log({
//             email: data.get('email'),
//             password: data.get('password'),
//         });
//     };

//     return (
//         <ThemeProvider theme={defaultTheme}>
//             <Container component="main" maxWidth="xs">
//                 <CssBaseline />
//                 <Box
//                     sx={{
//                         marginTop: 8,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                     }}
//                 >
//                     <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//                         {/* <LockOutlinedIcon /> */}
//                     </Avatar>
//                     <Typography component="h1" variant="h5">
//                         Register Here ! 😍
//                     </Typography>
//                     <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//                         <TextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             id="email"
//                             label="Email Address"
//                             name="email"
//                             autoComplete="email"
//                             autoFocus
//                         />
//                         <TextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             name="password"
//                             label="Password"
//                             type="password"
//                             id="password"
//                         />
//                         <TextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             name="Conformpassword"
//                             label="Conformpassword"
//                             type="password"
//                             id="password"
//                         />
//                         <FormControlLabel
//                             control={<Checkbox value="remember" color="primary" />}
//                             label="Remember me"
//                         />
//                         <Button
//                             type="submit"
//                             fullWidth
//                             variant="contained"
//                             sx={{ mt: 3, mb: 2 }}
//                         >
//                             Create an Account
//                         </Button>
// <Grid>
//     <Typography sx={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => navigate("/")} variant="body2">
//         {"Already a User"}
//     </Typography>
// </Grid>
//                     </Box>
//                 </Box>
//                 <Grid sx={{ mt: 5 }}>
//                     <CopyRights />
//                 </Grid>
//             </Container>
//         </ThemeProvider>
//     );
// }

// export default SignUp




import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import CopyRights from '../components/CopyRights';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const defaultTheme = createTheme();

const SignIn = () => {
    const navigate = useNavigate();





    const {
        register,
        handleSubmit,
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
        // Make a GET request using Axios
        axios.post(apiUrl, userData)
            .then(response => {
                // Handle the response data here
                console.log("redfghjnkm", response.data);
            })
            .catch(error => {
                // Handle errors here
                console.error('Error fetching data:', error);
            });
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
                                <Grid sx={{ display: 'flex', justifyContent: 'center', paddingBottom: 3 }}>
                                    <Button type='submit' variant='contained'>
                                        sign in
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

