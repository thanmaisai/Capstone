/* The above code is a React component for a login form. Here is a summary of what the code is doing: */
import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_USER } from '../../gqloperations/mutations';
import { useUser } from '../UserContext';
import { TextField, Button, Typography, Box, CircularProgress, Alert, Grid, InputAdornment } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const theme = useTheme();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { setUser } = useUser();
    const [signinUser, { loading, error }] = useMutation(LOGIN_USER);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await signinUser({ variables: { userSignin: formData } });

            if (data) {
                const { token, role } = data.signinUser;
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);
                setUser({ role });

                navigate(role === 'admin' ? '/admin-dashboard' : '/user-dashboard', { state: { role } });
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: theme.palette.background.default }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            component="main"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: theme.palette.background.default }}
        >
            <Grid container spacing={2} sx={{ maxWidth: 'md', mx: 'auto' }}>
                <Grid item xs={12} md={7} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center' }}>
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            backgroundImage: 'url(https://plus.unsplash.com/premium_vector-1720980470208-79f49f4d8f61?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: theme.palette.background.paper,
                            padding: '2rem',
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            width: '100%',
                            maxWidth: 500,
                        }}
                    >
                        <Typography
                            variant="h4"
                            component="h1"
                            gutterBottom
                            sx={{
                                color: theme.palette.text.primary,
                                fontWeight: 'bold',
                                mb: 2,
                                textAlign: 'center'
                            }}
                        >
                            Login
                        </Typography>
                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error.message}
                            </Alert>
                        )}
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ width: '100%', mt: 2 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="email"
                                        label="Email"
                                        type="email"
                                        name="email"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        required
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        onChange={handleChange}
                                        sx={{ borderRadius: '8px' }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="password"
                                        label="Password"
                                        type="password"
                                        name="password"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        required
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        onChange={handleChange}
                                        sx={{ borderRadius: '8px' }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ mt: 2, borderRadius: '8px' }}
                                    >
                                        Login
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{ mt: 2, color: theme.palette.text.secondary }}
                        >
                            New to LMS? <Link to="/signup" style={{ color: theme.palette.primary.main, textDecoration: 'underline' }}>Sign up now</Link>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
