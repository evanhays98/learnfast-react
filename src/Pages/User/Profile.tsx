import React, { useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme, theme } from 'src/libs/theme';
import PWAInstallButton from '../../libs/core/PWAInstallButton';
import { useLogout, useMe, useUpdateUser } from '../../libs/api/src';
import Input from '../../libs/core/Input/Input';
import { Button, Formix, FormixError, useToast } from '../../libs/core';
import { AxiosError } from 'axios';
import { FormikHelpers } from 'formik';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  globalContainer: {
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: theme.marginBase * 6,
    flexDirection: 'column',
    paddingBottom: theme.marginBase * 6,
    transition: 'all 1s ease',
  },
  titleContainer: {
    ...theme.basicFlex,
    gap: theme.marginBase,
    alignItems: 'flex-start',
    flexDirection: 'column',
    boxShadow: `0px 0px 50px -15px ${'rgba(30,1,30,0.75)'}`,
    padding: theme.marginBase,
    backdropFilter: 'blur(10px)',
    background: `-webkit-linear-gradient(180deg, ${'rgba(170,174,220,0.1)'} 0%, ${'rgba(79,105,171,0.1)'} 100%)`,
  },
  title: {
    ...theme.fonts.h1,
    background: `-webkit-linear-gradient(100deg, ${'#EF706F'} 0%, ${'#c27437'} 100%)`,
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  },
  content: {
    ...theme.basicFlex,
    gap: theme.marginBase * 2,
    margin: theme.marginBase * 2,
  },
  content2: {
    ...theme.basicFlex,
    gap: theme.marginBase * 2,
  },
  buttonUpdate: {
    transition: 'all 1s ease',
    opacity: 1,
    animationDuration: '1s',
    animationTimingFunction: 'ease',
    animationFillMode: 'forwards',
    animationName: '$buttonAppear',
    marginTop: theme.marginBase * 2,
    border: `1px solid ${'rgba(218,136,241,0.24)'}`,
    boxShadow: `0px 0px 100px 20px ${'rgba(173,111,239,0.2)'}`,
    zoom: 1,
  },
  '@keyframes buttonAppear': {
    '0%': {
      opacity: 0,
      zoom: 0,
    },
    '100%': {
      opacity: 1,
      zoom: 1,
    },
  },
  buttonLogOut: {
    background: `-webkit-linear-gradient(60deg, ${'#ea2828'} 0%, ${'rgba(213,48,141,1)'} 100%)`,
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  },
}));

interface Values {
  mail: string;
  pseudo: string;
}

export const Profile = () => {
  const classes = useStyles({ theme });
  const { data: me } = useMe();
  const { mutate: logout } = useLogout();
  const { mutateAsync: updateProfile } = useUpdateUser();
  const toast = useToast();

  const initialValues: Values | null = useMemo(() => {
    if (!me) {
      return null;
    }
    return {
      mail: me.mail,
      pseudo: me.pseudo,
    };
  }, [me]);

  const valueUpdated = (values: Values) => {
    if (!initialValues) {
      return false;
    }
    return (
      initialValues.mail !== values.mail ||
      initialValues.pseudo !== values.pseudo
    );
  };

  const onSubmit = async (values: Values, helpers: FormikHelpers<any>) => {
    const valuesUpdated = valueUpdated(values);
    try {
      if (!valuesUpdated) {
        return;
      }
      await updateProfile(values);
      toast.saved('Profile updated');
    } catch (e) {
      if (e instanceof AxiosError) {
        helpers.setErrors({
          error: e.response?.data?.message || "Une erreur s'est produite",
        });
      }
      throw e;
    }
  };

  if (!me || !initialValues || !initialValues.mail) {
    return null;
  }

  return (
    <div className={classes.globalContainer}>
      <div className={classes.titleContainer}>
        <h1 className={classes.title}>Profile</h1>
        <PWAInstallButton />
      </div>

      <Formix initialValues={initialValues} onSubmit={onSubmit}>
        {({ values }: any) => (
          <>
            <Input title="Mail" name="mail" />
            <Input title="Pseudo" name="pseudo" />
            <FormixError />
            {valueUpdated(values) && (
              <Button
                className={classes.buttonUpdate}
                text="Update profile"
                type="submit"
              />
            )}
          </>
        )}
      </Formix>

      <div className={classes.content2}>
        <Button
          className={classes.buttonLogOut}
          line
          text="Log out"
          onClick={() => logout()}
        />
      </div>
    </div>
  );
};
