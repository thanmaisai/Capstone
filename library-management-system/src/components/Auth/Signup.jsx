/* The above code is a React component for a signup form. Here is a summary of what the code is doing: */
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
import ErrorIcon from '@mui/icons-material/Error';
import { Slide } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

// Reusable InputField component
const InputField = ({ label, name, type, value, onChange, error, helperText, icon }) => (
    <TextField
        label={label}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!error}
        helperText={helperText}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    {icon}
                </InputAdornment>
            ),
        }}
        sx={{ borderRadius: '8px' }}
    />
);

export default function Signup() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', password: '', confirmPassword: '', role: 'user'
    });
    const [signupUser, { loading, error }] = useMutation(SIGNUP_USER);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First Name is required';
        if (!formData.lastName) newErrors.lastName = 'Last Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        return newErrors;
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    };

    const handleRoleChange = (event) => {
        setFormData(prev => ({ ...prev, role: event.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const { confirmPassword, ...signupData } = formData;

        try {
            const { data } = await signupUser({ variables: { userNew: signupData } });
            if (data.signupUser) {
                setSnackbarMessage(`${data.signupUser.firstName} is signed up. You can log in now!`);
                setOpenSnackbar(true);
                setTimeout(() => navigate('/login'), 500);
            }
        } catch (err) {
            const errorMessage = err.graphQLErrors?.[0]?.message || err.message || 'An error occurred';
            setSnackbarMessage(`Signup failed: ${errorMessage}`);
            setOpenSnackbar(true);
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
                            backgroundImage: 'url(https://plus.unsplash.com/premium_vector-1711987700677-d3d893fc82c0?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
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
                            Sign Up
                        </Typography>

                        {error && <Alert severity="error" icon={<ErrorIcon />} sx={{ mb: 2 }}>{error.message}</Alert>}

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <InputField
                                    label="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    error={errors.firstName}
                                    helperText={errors.firstName}
                                    icon={<PersonIcon />}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputField
                                    label="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    error={errors.lastName}
                                    helperText={errors.lastName}
                                    icon={<PersonIcon />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                    helperText={errors.email}
                                    icon={<EmailIcon />}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputField
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={errors.password}
                                    helperText={errors.password}
                                    icon={<LockIcon />}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputField
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    error={errors.confirmPassword}
                                    helperText={errors.confirmPassword}
                                    icon={<LockIcon />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Role</InputLabel>
                                    <Select
                                        value={formData.role}
                                        onChange={handleRoleChange}
                                        label="Role"
                                        sx={{ borderRadius: '8px' }}
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
                                    sx={{ mt: 2, borderRadius: '8px' }}
                                >
                                    Sign Up
                                </Button>
                            </Grid>
                        </Grid>

                        <Typography
                            variant="body2"
                            sx={{ mt: 2, color: theme.palette.text.secondary }}
                        >
                            Already have an account? <Link to="/login" style={{ color: theme.palette.primary.main, textDecoration: 'underline' }}>Login here</Link>
                        </Typography>

                        <Snackbar
                            open={openSnackbar}
                            autoHideDuration={6000}
                            onClose={() => setOpenSnackbar(false)}
                            TransitionComponent={(props) => <Slide {...props} direction="up" />}
                        >
                            <Alert onClose={() => setOpenSnackbar(false)} severity={error ? 'error' : 'success'} icon={<ErrorIcon />}>
                                {snackbarMessage}
                            </Alert>
                        </Snackbar>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
