import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_USER } from '../../gqloperations/mutations';
import { useUser } from '../UserContext';
import { TextField, Button, Typography, Box, CircularProgress, Alert, Grid, InputAdornment } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

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
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            component="main"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: theme.palette.background.default }}
        >
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
                    maxWidth: 400
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
                    <Grid container spacing={3}>
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
            </Box>
        </Box>
    );
}