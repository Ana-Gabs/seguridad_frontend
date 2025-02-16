import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid, Box, Button, TextField } from '@mui/material';
import { PasswordField } from '../funccions/validations/Password';
import '../styles/Login.css'; 

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        correo: '',
        contra: ''
    });
    const [mensaje, setMensaje] = useState('');
    const [errores, setErrores] = useState({
        correoError: '',
        contraError: ''
    });

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');

        if (!formData.correo || !formData.contra) {
            setMensaje('Por favor, completa todos los campos.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                localStorage.setItem('token', result.token);
                navigate('/dashboard');
            } else {
                setMensaje('Error al iniciar sesión.');
            }
        } catch (error) {
            setMensaje('Error de conexión. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <ArrowBackIcon className="back-arrow" onClick={handleBackClick} />
            </div>

            <Box className="login-box">
                <div className="intro-text">
                    <h1>¡Bienvenido de nuevo!</h1>
                    <h3 className="subtitulo-letrero">Inicia sesión para continuar</h3>
                </div>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Correo"
                                name="correo"
                                value={formData.correo}
                                onChange={handleChange}
                                fullWidth
                                error={!!errores.correoError}
                                helperText={errores.correoError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <PasswordField
                                label="Contraseña"
                                name="contra"
                                value={formData.contra}
                                onChange={handleChange}
                                error={!!errores.contraError}
                                helperText={errores.contraError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Iniciar sesión
                            </Button>
                        </Grid>
                    </Grid>
                    {mensaje && <p className="mensaje">{mensaje}</p>}
                </form>

                <div style={{ padding: '10px', textAlign: 'center' }}>
                    <h5 className="subtitulo-letrero">
                        ¿No tienes cuenta? <a href="/register">Regístrate</a>
                    </h5>
                </div>
            </Box>
        </div>
    );
};

export default Login;
