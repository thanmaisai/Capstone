import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../../gqloperations/mutations';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Typography, Box, Snackbar, Alert, Grid, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

export default function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'user'
    });
    const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRoleChange = (event) => {
        setFormData({
            ...formData,
            role: event.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signupUser({ variables: { userNew: formData } });
            if (response.data.signupUser) {
                setSnackbarMessage(`${response.data.signupUser.firstName} is signed up. You can log in now!`);
                setOpenSnackbar(true);
            }
        } catch (err) {
            setSnackbarMessage(err.message);
            setOpenSnackbar(true);
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
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: 2 }}
        >
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                    padding: '2rem',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    width: '100%',
                    maxWidth: 500
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Sign Up
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error.message}</Alert>}

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ width: '100%' }}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Role</InputLabel>
                                <Select
                                    value={formData.role}
                                    onChange={handleRoleChange}
                                    label="Role"
                                >
                                    <MenuItem value="admin">Admin</MenuItem>
                                    <MenuItem value="user">User</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Sign Up
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={() => setOpenSnackbar(false)}
                >
                    <Alert onClose={() => setOpenSnackbar(false)} severity={error ? 'error' : 'success'}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </motion.div>
        </Box>
    );
}
