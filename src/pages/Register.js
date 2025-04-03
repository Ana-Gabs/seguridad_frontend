import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid, Box, Button, TextField } from '@mui/material';
import { validarCamposVacios } from '../funccions/EmptyFields';
import { AlertBox } from '../funccions/AlertBox';
import { isValidPassword, isPasswordMatch, PasswordField } from '../funccions/validations/Password';
import { isValidPhoneNumber } from '../funccions/validations/Phone';
import '../styles/Register.css';


const WEBSERVICE_IP = process.env.REACT_APP_WEBSERVICE_IP;

const Registro = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        nombre: '',
        appaterno: '',
        apmaterno: '',
        telefono: '',
        email: '',
        password: '',
        confirmPassword: '',
        rol: 'common_user'
    });

    const [mensaje, setMensaje] = useState('');
    const [errores, setErrores] = useState({});
    const [emptyFields, setEmptyFields] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validaciones en tiempo real
        let newErrors = { ...errores };

        if (name === 'password') {
            newErrors.passwordError = isValidPassword(value);
        } else if (name === 'confirmPassword') {
            newErrors.confirmPasswordError = isPasswordMatch(formData.password, value);
        } else if (name === 'telefono') {
            newErrors.telefonoError = isValidPhoneNumber(value);
        }

        setErrores(newErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');
        setEmptyFields([]);

        // Validar campos vacíos
        const camposVacios = validarCamposVacios(formData, setShowAlert, setEmptyFields);
        const nuevosErrores = {
            passwordError: isValidPassword(formData.password),
            confirmPasswordError: isPasswordMatch(formData.password, formData.confirmPassword),
            telefonoError: isValidPhoneNumber(formData.telefono),
        };

        setErrores(nuevosErrores);

        if (camposVacios || nuevosErrores.passwordError || nuevosErrores.confirmPasswordError || nuevosErrores.telefonoError) {
            setMensaje('Por favor, corrige los errores antes de enviar el formulario.');
            return;
        }

        try {
            console.log("Enviando datos al backend:", formData);
            const response = await fetch(`${WEBSERVICE_IP}/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            console.log("Código de respuesta:", response.status);
            const result = await response.json();
            console.log("Respuesta del backend:", result);

            if (response.status === 201) {
                setMensaje('Registro exitoso, redirigiendo...');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setMensaje(result.error || 'Error al registrar usuario.');
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            setMensaje('Error de conexión. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div className="registro-container">
            <div className="registro-header">
                <ArrowBackIcon className="back-arrow" onClick={handleBackClick} />
            </div>

            <Box className="registro-box">
                <div className="intro-text" style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h1>¡Empezar!</h1>
                    <h3 className="subtitulo-letrero">Regístrate para continuar</h3>
                </div>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nombre de usuario"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                fullWidth
                                error={emptyFields.includes('username')}
                                helperText={emptyFields.includes('username') ? 'Campo obligatorio' : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Correo Electrónico"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                fullWidth
                                error={emptyFields.includes('email')}
                                helperText={emptyFields.includes('email') ? 'Campo obligatorio' : ''}
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
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Registrarse
                            </Button>
                        </Grid>
                    </Grid>
                    {mensaje && <p className="mensaje">{mensaje}</p>}
                </form>

                <div style={{ padding: '10px', textAlign: 'center' }}>
                    <h5>¿Ya tienes cuenta? <a href="/login">Iniciar sesión</a></h5>
                </div>

                <AlertBox showAlert={showAlert} setShowAlert={setShowAlert} />
            </Box>
        </div>
    );
};

export default Registro;
