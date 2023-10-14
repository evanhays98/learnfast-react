import React from 'react';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from '../../libs/theme';
import { Button, CenteredLoader, PageTitle } from '../../libs/core';
import Input from '../../libs/core/Input/Input';
import { Form, Formik } from 'formik';
import { useLogin, useMe } from '../../libs/api/src';
import { useNavigate } from 'react-router-dom';


const useStyles = createUseStyles((theme: Theme) => ({
  page: {
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: theme.marginBase * 6,
    flexDirection: 'column',
    padding: theme.marginBase,
    paddingBottom: theme.marginBase * 6,
  },
  container: {
    ...theme.basicFlex,
    gap: theme.marginBase * 3,
    margin: theme.marginBase * 2,
  },
}));

interface Values {
  identifier: string,
  password: string,
}

export const Login = () => {
  const classes = useStyles({ theme });
  const { mutateAsync: login } = useLogin();
  const { data: me, isLoading } = useMe(true);
  const navigate = useNavigate();


  const submit = async (values: Values) => {
    try {
      await login(values);
      navigate('/home');
    } catch (e) {
      throw e;
    }
  };

  if (isLoading) {
    return <CenteredLoader />;
  }

  if (me) {
    navigate('/home');
  }


  return (
    <div className={classes.page}>
      <PageTitle text={'Sign in'} />
      <Formik initialValues={{ identifier: '', password: '' }} onSubmit={submit}>
        <Form>
          <div className={classes.container}>
            <Input title='Mail or Pseudo' name='identifier' />
            <Input title='Password' name='password' type='password' eye />
            <Button text='Connect' type='submit' full={true} />
          </div>
        </Form>
      </Formik>
      <Button text="Don't have an account" line={true} onClick={() => {
        navigate('/register');
      }} />
    </div>
  );
};