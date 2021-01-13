import React, { useState } from 'react';
import {
  Button,
  Card,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Image from '../assets/images/quickbooks.png';
import hoverImage from '../assets/images/quickbooksHover.png';
import PageHeader from './PageHeader';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  login: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },

  // quickbooksButton: {
  //   backgroundImage: `url(${Image})`,
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   textDecoration: 'none',
  //   // color: 'white',
  //   // backgroundColor: 'green',
  //   backgroundSize: '100%',
  //   marginBottom: '10px',
  //   width: '300px',
  //   height: '52px',
  //   border: 'none',
  //   borderRadius: '5px',
  //   cursor: 'pointer',
  //   '&:hover': { backgroundImage: `url(${hoverImage})` },
  // },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(6),
    margin: '150px',
    width: '400px',
  },
  formArea: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '80%',
  },
  emailAndPassword: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
}));

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [signup, setSignup] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loginHandler = (values) => {
    axios({
      method: 'post',
      url: 'http://localhost:4000/users/login',
      withCredentials: true,
      data: values,
    })
      .then((response) => {
        history.push('/');
      })
      .catch((error) => console.log(error));
  };

  const signupHandler = (values) => {
    axios({
      method: 'post',
      url: 'http://localhost:4000/users/signup',
      data: values,
    })
      .then((response) => setErrorMessage(response.data))
      .catch((error) => console.log(error));
  };

  const loginAndSignupChangeHandler = () => {
    setErrorMessage();
    setSignup(!signup);
  };

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('Required')
      .min(2, 'Not Enough Characters'),
    lastName: Yup.string().required('Required').min(2, 'Not Enough Characters'),
    isSalesperson: Yup.boolean().typeError('Required').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required').min(8, 'Password is Too Short'),
    administratorPassword: Yup.string().required('Required'),
    // passwordConfirmation: Yup.string().oneOf(
    //   [Yup.ref('password'), null],
    //   'Passwords must match'
    // ),
  });

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  return (
    <div>
      <PageHeader
        icon={<AccountCircleIcon fontSize="large" />}
        title="Sign In"
        subtitle="Sign in to access site features."
      />
      <div className={classes.login}>
        <Card className={classes.card}>
          {signup ? (
            <div className={classes.formArea}>
              <Formik
                initialValues={{
                  firstName: '',
                  lastName: '',
                  isSalesperson: null,
                  email: '',
                  password: '',
                  administratorPassword: '',
                  // passwordConfirmation: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                  signupHandler(values);
                }}
              >
                {({ values, errors, touched }) => (
                  <Form>
                    <div className={classes.emailAndPassword}>
                      <Typography>Sign Up</Typography>
                      <Field
                        as={TextField}
                        label="First Name"
                        name="firstName"
                      />
                      <ErrorMessage name="firstName" />
                      <Field as={TextField} label="Last Name" name="lastName" />
                      <ErrorMessage name="lastName" />
                      <Field
                        as={TextField}
                        select
                        label="Are you a Salesperson"
                        name="isSalesperson"
                      >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                      </Field>
                      <ErrorMessage name="isSalesperson" />
                      <Field as={TextField} label="Email" name="email" />
                      <ErrorMessage name="email" />
                      <Field
                        as={TextField}
                        type="password"
                        label="Password"
                        name="password"
                      />
                      <ErrorMessage name="password" />
                      <Field
                        as={TextField}
                        type="password"
                        label="Administrator Password"
                        name="administratorPassword"
                      />
                      <ErrorMessage name="administratorPassword" />
                      <Typography>{errorMessage}</Typography>

                      <Button type="submit">Submit</Button>
                      <Typography onClick={() => loginAndSignupChangeHandler()}>
                        Have an account? Click here to sign in.
                      </Typography>
                      {/* <pre>{JSON.stringify(values, null, 4)}</pre>
                    <pre>{JSON.stringify(errors, null, 4)}</pre> */}
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          ) : null}
          {!signup ? (
            <div className={classes.formArea}>
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                  loginHandler(values);
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className={classes.emailAndPassword}>
                      <Typography>Sign In</Typography>
                      <Field
                        as={TextField}
                        type="email"
                        label="Email"
                        name="email"
                      />
                      <ErrorMessage name="email" />
                      <Field
                        as={TextField}
                        type="password"
                        label="Password"
                        name="password"
                      />
                      <ErrorMessage name="password" />
                      <Typography>{errorMessage}</Typography>
                      <Button type="submit">Submit</Button>
                      <Typography onClick={() => loginAndSignupChangeHandler()}>
                        Need an account? Click here to sign up.
                      </Typography>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          ) : null}

          <a
            className={classes.quickbooksButton}
            href="http://localhost:4000/oauth"
          >
            quickbooks Button
          </a>
        </Card>
      </div>
    </div>
  );
}

export default Login;
