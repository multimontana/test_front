import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link,useHistory} from "react-router-dom"
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as Yup from "yup";
import {Formik,Form} from "formik";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
const validationSchema = Yup.object({
    email: Yup.string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
    password: Yup.string("")
        .min(6, "Password must contain at least 6 characters")
        .required("Enter your password"),
});
export default function SignIn() {
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
                <Typography style={{marginBottom: 10}} component="h1" variant="h5">
                    Sign in
                </Typography>
                <Alert style={{marginTop: 10,display: alert.length?'block':'none'}} variant="outlined" severity="error">
                    {alert}
                </Alert>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={(values) => {
                       api.post('auth/login', values)
                            .then(function (response) {
                                if (response.data){
                                    localStorage.setItem('token', response.data.token);
                                    history.push('/product')
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
                      return (  <Form>
                          <Grid container spacing={2}>
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
                          <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                              className={classes.submit}
                          >
                              Sign In
                          </Button>
                          </Grid>
                      </Form>)
                    }}
                </Formik>
                    <Grid container>
                        <Grid item xs>
                        </Grid>
                        <Grid item>
                            <Link style={{textDecoration: "none",color: "#3f51b5"}} to="/signUp">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
            </div>
        </Container>
    );
}
