import React from 'react';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from 'src/libs/theme';
import classnames from 'classnames';
import { Icon, Icons } from '../Icons';
import { FormikValues, useFormikContext } from 'formik';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  inputContainer: {
    width: '100%',
    position: 'relative',
    ...theme.basicFlex,
    transition: 'all ease-in-out 0.3s',
    borderLeft: ` solid 2px ${'rgba(30,39,51,0.8)'}`,
    borderRight: ` solid 2px ${'rgba(30,39,51,0.8)'}`,
    borderRadius: theme.borderRadius.std,
    borderTop: `2px solid ${theme.colors.lightGray}50`,
    borderBottom: `2px solid ${theme.colors.lightGray}50`,
    '&:focus-within': {
      borderTop: `2px solid ${theme.colors.lightGray}`,
      borderBottom: `2px solid ${theme.colors.lightGray}`,
    },
    overflow: 'hidden',
  },
  eyeContainer: {
    padding: theme.marginBase / 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: 0,
    paddingBottom: -1,
    boxShadow: `0px 0px 50px 0px ${'rgba(62,143,131,0.75)'}`,
  },
  eye: {
    fontSize: theme.icon.normal,
    color: theme.colors.lightGray,
  },
  input: {
    resize: 'none',
    outline: 'none',
    borderRadius: [theme.borderRadius.std, theme.borderRadius.std, 0, 0],
    backgroundColor: 'transparent',
    flex: 1,
    margin: 'auto',
    ...theme.fonts.caption,
    padding: theme.marginBase,
    border: 'none',
    '&:focus + label': {
      top: -theme.marginBase * 3,
      left: 0,
      fontWeight: 700,
      color: '#a3d8db',
      transition: 'all ease-in-out 0.2s',
      paddingLeft: '1%',
    },
  },
  container: {
    width: '100%',
    margin: 0,
  },
  button: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
  },
}));

interface Props {
  name: string;
  nameValue?: string;
}

export const SearchInput = ({ name, nameValue }: Props) => {
  const classes = useStyles({ theme });
  const { setFieldValue, values } = useFormikContext<FormikValues>();

  return (
    <div className={classes.inputContainer}>
      <input
        className={classnames(classes.input)}
        placeholder="Search"
        name={name}
        onChange={(e) => {
          if (Array.isArray(values[name] && nameValue)) {
            const value = values[name];
            const valueNameFormik = values.find(
              (v: any) => v.name === nameValue,
            );
            setFieldValue(name, [e.target.value]);
          }
          setFieldValue(name, e.target.value);
        }}
      />
      <div className={classes.eyeContainer} onClick={() => {}}>
        <button className={classes.button} type="submit">
          <Icons icon={Icon.search} />
        </button>
      </div>
    </div>
  );
};
