import React from 'react';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from '../../libs/theme';
import { Button, PageTitle } from '../../libs/core';
import Input from '../../libs/core/Input/Input';
import { useLogin, useMe } from '../../libs/api/src';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formix, FormixError } from '../../libs/core/Formix';
import { FormikHelpers } from 'formik';
import { AxiosError } from 'axios';

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
  identifier: string;
  password: string;
  error?: string;
}

const validationSchema = Yup.object().shape({
  identifier: Yup.string()
    .required('Field is required')
    .min(3, 'Identifier must be at least 3 characters long'),
  password: Yup.string().required('Field is required'),
});

export const Login = () => {
  const classes = useStyles({ theme });
  const { data: me, isLoading } = useMe();
  const { mutateAsync: login } = useLogin();
  const navigate = useNavigate();

  const submit = async (values: Values, helpers: FormikHelpers<Values>) => {
    try {
      await login(values);
      navigate('/');
    } catch (e) {
      if (e instanceof AxiosError) {
        helpers.setErrors({
          error: e.response?.data?.message || "Une erreur s'est produite",
        });
      }
      throw e;
    }
  };

  if (me && !isLoading) {
    navigate('/');
  }

  return (
    <div className={classes.page}>
      <PageTitle text={'Sign in'} />
      <Formix
        initialValues={{ identifier: '', password: '' }}
        onSubmit={submit}
        validationSchema={validationSchema}
      >
        <Input title="Mail or Pseudo" name="identifier" />
        <Input title="Password" name="password" type="password" eye />
        <FormixError />
        <Button className={classes.button} type="submit" full>
          <div className={classes.buttonText}>Connect</div>
        </Button>
        <Button
          line
          onClick={() => {
            navigate('/register');
          }}
        >
          <div className={classes.createAccount}>Don't have an account</div>
        </Button>
      </Formix>
    </div>
  );
};
