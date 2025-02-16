import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid, Box, Button, TextField } from '@mui/material';
import { validarCamposVacios } from '../funccions/EmptyFields';
import { AlertBox } from '../funccions/AlertBox';
import { isValidPassword, isPasswordMatch, PasswordField } from '../funccions/validations/Password';
import { isValidPhoneNumber } from '../funccions/validations/Phone';
import '../styles/Register.css';

const Registro = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        appaterno: '',
        apmaterno: '',
        telefono: '',
        correo: '',
        password: '',
        confirmPassword: ''
    });
    const [mensaje, setMensaje] = useState('');
    const [errores, setErrores] = useState({
        nombreError: '',
        appaternoError: '',
        apmaternoError: '',
        telefonoError: '',
        correoError: '',
        passwordError: '',
        confirmPasswordError: ''
    });
    const [emptyFields, setEmptyFields] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === 'password') {
            setErrores({
                ...errores,
                passwordError: isValidPassword(value),
            });
        } else if (name === 'confirmPassword') {
            setErrores({
                ...errores,
                confirmPasswordError: isPasswordMatch(formData.password, value),
            });
        } else if (name === 'telefono') {
            setErrores({
                ...errores,
                telefonoError: isValidPhoneNumber(value),
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmptyFields([]);
        setMensaje('');

        const camposVacios = validarCamposVacios(formData, setShowAlert, setEmptyFields);

        if (camposVacios || errores.passwordError || errores.confirmPasswordError || errores.telefonoError) {
            setMensaje('Por favor, corrige los errores antes de enviar el formulario.');
            return;
        }

        try {
            setFormData({
                nombre: '',
                appaterno: '',
                apmaterno: '',
                telefono: '',
                correo: '',
                password: '',
                confirmPassword: ''
            });

            setMensaje('Registro exitoso');
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            setMensaje('Error de conexión. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div className="registro-container">
            <div className="registro-header">
                <ArrowBackIcon className="back-arrow" onClick={handleBackClick} />
                <h1>  </h1>
            </div>

            <Box 
                sx={{ 
                    backgroundColor: 'white', 
                    padding: '30px', 
                    borderRadius: '8px', 
                    boxShadow: 3, 
                    marginTop: '30px', 
                    maxWidth: '600px', 
                    margin: '0 auto' 
                }}
            >
                <div className="intro-text" style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h1>¡Empezar!</h1>
                    <h3 className="subtitulo-letrero">Regístrate para continuar</h3>
                </div>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                fullWidth
                                error={emptyFields.includes('nombre')}
                                helperText={emptyFields.includes('nombre') ? 'Campo obligatorio' : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Apellido Paterno"
                                name="appaterno"
                                value={formData.appaterno}
                                onChange={handleChange}
                                fullWidth
                                error={emptyFields.includes('appaterno')}
                                helperText={emptyFields.includes('appaterno') ? 'Campo obligatorio' : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Apellido Materno"
                                name="apmaterno"
                                value={formData.apmaterno}
                                onChange={handleChange}
                                fullWidth
                                error={emptyFields.includes('apmaterno')}
                                helperText={emptyFields.includes('apmaterno') ? 'Campo obligatorio' : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Teléfono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                fullWidth
                                error={!!errores.telefonoError || emptyFields.includes('telefono')}
                                helperText={errores.telefonoError || (emptyFields.includes('telefono') ? 'Campo obligatorio' : '')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Correo"
                                name="correo"
                                value={formData.correo}
                                onChange={handleChange}
                                fullWidth
                                error={emptyFields.includes('correo')}
                                helperText={emptyFields.includes('correo') ? 'Campo obligatorio' : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <PasswordField
                                label="Contraseña"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                error={!!errores.passwordError}
                                helperText={errores.passwordError || (emptyFields.includes('password') ? 'Campo obligatorio' : '')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <PasswordField
                                label="Confirmar Contraseña"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                error={!!errores.confirmPasswordError}
                                helperText={errores.confirmPasswordError || (emptyFields.includes('confirmPassword') ? 'Campo obligatorio' : '')}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ padding: '12px 0' }}>
                                Registrarse
                            </Button>
                        </Grid>
                    </Grid>
                    {mensaje && <p className="mensaje">{mensaje}</p>}
                </form>

                <div style={{ padding: '10px', textAlign: 'center' }}>
                    <h5 className="subtitulo-letrero">¿Ya tienes cuenta? <a href="/login">Iniciar sesión</a></h5>
                </div>

                <AlertBox showAlert={showAlert} setShowAlert={setShowAlert} />
            </Box>
        </div>
    );
};

export default Registro;
