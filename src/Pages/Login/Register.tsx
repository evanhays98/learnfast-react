import React from 'react';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from '../../libs/theme';
import { Button, CenteredLoader, PageTitle } from '../../libs/core';
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
  },
  container: {
    ...theme.basicFlex,
    gap: theme.marginBase * 3,
    margin: theme.marginBase * 2,
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
  const { mutateAsync: register } = useRegister();
  const { data: me, isLoading } = useMe(true);
  const navigate = useNavigate();

  const submit = async (values: Values) => {
    await register({
      mail: values.mail,
      password: values.password,
      pseudo: values.pseudo,
    });
    navigate('/home');
  };

  if (isLoading) {
    return <CenteredLoader />;
  }

  if (me) {
    navigate('/home');
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
            <Button text='Join' type='submit' full />
          </div>
        </Form>
      </Formik>
      <Button text='Already have an account' line={true} onClick={() => {
        navigate('login');
      }} />

    </div>
  );
};