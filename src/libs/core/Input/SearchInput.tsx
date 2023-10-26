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
  },
  container: {
    width: '100%',
    margin: 0,
  },
  button: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    padding: theme.marginBase / 2,
  },
}));

interface Props {
  name: string;
  placeholder?: string;
}

export const SearchInput = ({ name, placeholder = 'Search' }: Props) => {
  const classes = useStyles({ theme });
  const { setFieldValue } = useFormikContext<FormikValues>();

  return (
    <div className={classes.inputContainer}>
      <input
        className={classnames(classes.input)}
        placeholder={placeholder}
        name={name}
        onChange={(e) => {
          setFieldValue(name, e.target.value);
        }}
      />
      <div className={classes.eyeContainer} onClick={() => {
      }}>
        <div className={classes.button}>
          <Icons icon={Icon.search} />
        </div>
      </div>
    </div>
  );
};
