import React from 'react';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from '../../libs/theme';
import { Button, Formix, FormixError, PageTitle } from '../../libs/core';
import Input from '../../libs/core/Input/Input';
import { Navigate, useNavigate } from 'react-router-dom';
import { useMe, useRegister } from '../../libs/api';
import * as Yup from 'yup';
import { AxiosError } from 'axios';
import { FormikHelpers } from 'formik';

const useStyles = createUseStyles((theme: Theme) => ({
  page: {
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: theme.marginBase * 6,
    flexDirection: 'column',
    padding: theme.marginBase,
    paddingBottom: theme.marginBase * 6,
    zIndex: 1,
    position: 'relative',
  },
  container: {
    ...theme.basicFlex,
    gap: theme.marginBase * 2,
    margin: theme.marginBase * 2,
  },
  button: {
    marginTop: theme.marginBase * 2,
    background: `radial-gradient(circle, ${'rgba(145,186,231,0.2)'} 0%, ${'rgba(225,164,116,0.1)'} 100%)`,
    border: `1px solid ${'rgba(239,112,111,0.1)'}`,
    position: 'relative',
    boxShadow: `0px 0px 10px 3px ${'rgba(173,111,239,0.15)'}`,
  },
  buttonText: {
    background: `-webkit-linear-gradient(0deg, ${'#da88f1'} 0%, ${'#48abc9'} 100%)`,
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  },
  createAccount: {
    ...theme.fonts.caption2,
    color: theme.colors.lightGray,
  },
}));

interface Values {
  mail: string;
  password: string;
  pseudo: string;
  confirmPassword: string;
}

const initialValues: Values = {
  mail: '',
  password: '',
  pseudo: '',
  confirmPassword: '',
};

const validationSchema = Yup.object().shape({
  mail: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[A-Z])/,
      'Password must contain at least one uppercase letter',
    )
    .matches(
      /^(?=.*[a-z])/,
      'Password must contain at least one lowercase letter',
    )
    .matches(/^(?=.*[0-9])/, 'Password must contain at least one number'),
  pseudo: Yup.string()
    .required('Pseudo is required')
    .min(3, 'Pseudo must be at least 3 characters long')
    .max(20, 'Pseudo must be at most 20 characters long'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const Register = () => {
  const classes = useStyles({ theme });
  const { data: me, isLoading } = useMe();
  const { mutateAsync: register } = useRegister();
  const navigate = useNavigate();

  const submit = async (values: Values, helpers: FormikHelpers<any>) => {
    try {
      await register({
        mail: values.mail,
        password: values.password,
        pseudo: values.pseudo,
      });
      navigate('/');
    } catch (e) {
      if (e instanceof AxiosError) {
        helpers.setErrors({
          error: e.response?.data?.message || 'Une erreur s\'est produite',
        });
      }
      throw e;
    }
  };

  if (me && !isLoading) {
    return <Navigate to='/' />;
  }

  return (
    <div className={classes.page}>
      <PageTitle text={'Sign up'} />

      <Formix initialValues={initialValues} onSubmit={submit} validationSchema={validationSchema}>
        <Input title='Email' name='mail' />
        <Input title='Pseudo' name='pseudo' />
        <Input title='Password' name='password' type='password' eye />
        <Input
          title='Confirm Password'
          name='confirmPassword'
          type='password'
          eye
        />
        <FormixError />
        <Button className={classes.button} type='submit' full>
          <div className={classes.buttonText}>Register</div>
        </Button>
        <Button
          line
          onClick={() => {
            navigate('/login');
          }}
        >
          <div className={classes.createAccount}>Already have an account</div>
        </Button>
      </Formix>
    </div>
  );
};
