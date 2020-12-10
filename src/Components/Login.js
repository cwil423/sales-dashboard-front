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
    height: '100px',
    width: '500px',
    padding: '25px',
    /* margin: 100px 50px, */
  },

  quickbooksButton: {
    backgroundImage: `url(${Image})`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    // color: 'white',
    // backgroundColor: 'green',
    backgroundSize: '100%',
    marginBottom: '10px',
    width: '300px',
    height: '52px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    '&:hover': { backgroundImage: `url(${hoverImage})` },
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(6),
    margin: '100px',
  },
  formArea: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '80%',
  },
  emailAndPassword: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    // width: '80%',
  },
}));

function Login() {
  const classes = useStyles();
  const [signup, setSignup] = useState(true);

  const loginHandler = () => {
    axios.get();
  };

  const signupHandler = (values) => {
    axios({
      method: 'post',
      url: 'http://localhost:4000/users/signup',
      data: values,
    });
  };

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('Required')
      .min(2, 'First Name is Too Short'),
    lastName: Yup.string()
      .required('Required')
      .min(2, 'Last Name is Too Short'),
    isSalesPerson: Yup.boolean().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required').min(8, 'Password is Too Short'),
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
        title="Login"
        subtitle="Log in to access site features."
      />
      <Card className={classes.card}>
        {signup ? (
          <div className={classes.formArea}>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                isSalesPerson: null,
                email: '',
                password: '',
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
                    <Field as={TextField} label="First Name" name="firstName" />
                    <ErrorMessage name="firstName" />
                    <Field as={TextField} label="Last Name" name="lastName" />
                    <ErrorMessage name="lastName" />
                    <Field
                      as={TextField}
                      select
                      label="Are you a Salesperson"
                      name="isSalesPerson"
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Field>
                    <ErrorMessage name="isSalesPerson" />
                    <Field as={TextField} label="Email" name="email" />
                    <ErrorMessage name="email" />
                    <Field as={TextField} label="Password" name="password" />
                    <ErrorMessage name="password" />
                    {/* <Field as={TextField} name="passwordConfirmation" /> */}
                    <Button type="submit">Submit</Button>
                    <Typography onClick={() => setSignup(!signup)}>
                      Have an account? Click here to sign in.
                    </Typography>
                    <pre>{JSON.stringify(values, null, 4)}</pre>
                    <pre>{JSON.stringify(errors, null, 4)}</pre>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        ) : null}
        {!signup ? (
          <div className={classes.formArea}>
            <Formik
              initialValues={{ email: '', password: '', password2: '' }}
              validationSchema={LoginSchema}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className={classes.emailAndPassword}>
                    <Typography>Sign In</Typography>
                    <Field as={TextField} label="Email" name="email" />
                    <ErrorMessage name="email" />
                    <Field as={TextField} label="Password" name="password" />
                    <ErrorMessage name="password" />
                    <Button type="submit">Submit</Button>
                    <Typography onClick={() => setSignup(!signup)}>
                      Need to create an account? Click here to sign up.
                    </Typography>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        ) : null}

        {/* <a
          className={classes.quickbooksButton}
          href="http://localhost:4000/oauth"
        >
          quickbooks Button
        </a> */}
      </Card>
    </div>
  );
}

export default Login;
