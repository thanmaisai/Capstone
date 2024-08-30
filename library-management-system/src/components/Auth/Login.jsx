import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_USER } from '../../gqloperations/mutations';
import { useUser } from '../UserContext';
import { Container, TextField, Button, Typography, Box, CircularProgress, Alert, Grid } from '@mui/material';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { setUser } = useUser();
    const [signinUser, { data, loading, error }] = useMutation(LOGIN_USER);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await signinUser({
                variables: {
                    userSignin: formData
                }
            });

            if (result.data) {
                const { token, role } = result.data.signinUser;
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);

                setUser({ role });

                if (role === 'admin') {
                    navigate('/admin-dashboard', { state: { role } });
                } else {
                    navigate('/user-dashboard', { state: { role } });
                }
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    if (loading) return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
        </Box>
    );

    return (
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'background.paper',
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    width: '100%',
                    maxWidth: 400
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error.message}</Alert>}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        width: '100%',
                        mt: 2
                    }}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
