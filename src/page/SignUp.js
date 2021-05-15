import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link,useHistory} from "react-router-dom"
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Formik,Form} from "formik";
import Alert from '@material-ui/lab/Alert';
import * as Yup from "yup";
import axios from "axios";
import api from '../api';
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
const validationSchema = Yup.object({
    name: Yup.string("Enter a name").required("Name is required"),
    email: Yup.string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
    password: Yup.string("")
        .min(6, "Password must contain at least 6 characters")
        .required("Enter your password"),
});
export default function SignUp() {
    const classes = useStyles();
    const history = useHistory();
    const [alert,setAlert] = useState('')
    
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Alert style={{marginTop: 10,display: alert.length?'block':'none'}} variant="outlined" severity="error">
                    {alert}
                </Alert>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                    }}
                    onSubmit={(values) => {
                        api.post('auth/register', values)
                            .then(function (response) {
                                if (response.data){
                                    history.push('/signIn')
                                }else {
                                    setAlert(response.error)
                                }
                            })
                            .catch(function (error) {
                                console.error(error)
                                setAlert("Invalid data")
                            });
                    }}
                    validationSchema={validationSchema}
                >
                    {(props) => {
                        const {
                            values,
                            errors,
                            handleBlur,
                            handleChange,
                        } = props
                        return (<Form>
                            <Grid container spacing={2}>
                                <Grid style={{marginTop: 20}} item xs={12} sm={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        value={values.name}
                                        id="name"
                                        label="Name"
                                        name="name"
                                        autoComplete="name"
                                        helperText={
                                            errors.name ? errors.name: ""
                                        }
                                        error={
                                            errors.name ? true: null
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        value={values.email}
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        helperText={
                                            errors.email ? errors.email: ""
                                        }
                                        error={
                                            errors.email ? true: null
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        value={values.password}
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        helperText={
                                            errors.password ? errors.password: ""
                                        }
                                        error={
                                            errors.password ? true: null
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign Up
                            </Button>
                        </Form>)
                    }}
                </Formik>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link style={{textDecoration: "none",color: "#3f51b5"}} to="/signIn">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}
