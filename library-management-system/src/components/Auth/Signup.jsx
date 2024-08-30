import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../../gqloperations/mutations';
import {
    Button, TextField, FormControl, InputLabel, Select, MenuItem, Typography,
    Box, Snackbar, Alert, Grid, CircularProgress, InputAdornment
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { Slide } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', password: '', role: 'user'
    });
    const [signupUser, { loading, error }] = useMutation(SIGNUP_USER);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleChange = (e) => setFormData(prev => ({
        ...prev, [e.target.name]: e.target.value
    }));

    const handleRoleChange = (event) => setFormData(prev => ({
        ...prev, role: event.target.value
    }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await signupUser({ variables: { userNew: formData } });
            if (data.signupUser) {
                setSnackbarMessage(`${data.signupUser.firstName} is signed up. You can log in now!`);
                setOpenSnackbar(true);
                setTimeout(() => {
                    navigate('/login'); 
                },500);
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
            sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
                padding: 2, backgroundColor: theme.palette.background.default
            }}
        >
            <Box
                sx={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    backgroundColor: theme.palette.background.paper, padding: '2rem',
                    borderRadius: '12px', boxShadow: `0 4px 8px ${theme.palette.grey[300]}`,
                    width: '100%', maxWidth: 400
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{
                        color: theme.palette.text.primary, fontWeight: 'bold',
                        mb: 2, textAlign: 'center'
                    }}
                >
                    Sign Up
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error.message}</Alert>}

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
                    <Grid container spacing={2}>
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
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ borderRadius: '12px' }}
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
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ borderRadius: '12px' }}
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
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ borderRadius: '12px' }}
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
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ borderRadius: '12px' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Role</InputLabel>
                                <Select
                                    value={formData.role}
                                    onChange={handleRoleChange}
                                    label="Role"
                                    sx={{ borderRadius: '12px' }}
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
                                sx={{ mt: 2, borderRadius: '12px' }}
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
                    TransitionComponent={(props) => <Slide {...props} direction="up" />}
                >
                    <Alert onClose={() => setOpenSnackbar(false)} severity={error ? 'error' : 'success'}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
}
