import React from 'react';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from '../../libs/theme';
import { Button, PageTitle } from '../../libs/core';
import Input from '../../libs/core/Input/Input';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useMe, useRegister } from '../../libs/api/src';

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
  mail: string,
  password: string,
  pseudo: string,
  confirmPassword: string,
}

export const Register = () => {
  const classes = useStyles({ theme });
  const { data: me, isLoading } = useMe(true);
  const { mutateAsync: register } = useRegister();
  const navigate = useNavigate();

  const submit = async (values: Values) => {
    await register({
      mail: values.mail,
      password: values.password,
      pseudo: values.pseudo,
    });
    navigate('/');
  };

  if (me && !isLoading) {
    navigate('/');
  }


  return (
    <div className={classes.page}>
      <PageTitle text={'Sign up'} />

      <Formik initialValues={{ mail: '', password: '', pseudo: '', confirmPassword: '' }} onSubmit={submit}>
        <Form>
          <div className={classes.container}>
            <Input title='Email' name='mail' />
            <Input title='Pseudo' name='pseudo' />
            <Input title='Password' name='password' type='password' eye />
            <Input title='Confirm Password' name='confirmPassword' type='password' eye />
            <Button className={classes.button} type='submit' full>
              <div className={classes.buttonText}>Register</div>
            </Button>
            <Button line onClick={() => {
              navigate('/login');
            }}>
              <div className={classes.createAccount}>Already have an account</div>
            </Button>
          </div>
        </Form>
      </Formik>

    </div>
  );
};