import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from 'src/libs/theme';
import classnames from 'classnames';
import { Formix } from '../Formix';
import * as Yup from 'yup';

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
  },
  eyeContainer: {
    padding: theme.marginBase / 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    bottom: 6,
    marginRight: 10,
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
}));

interface Props {
  onSearch: (value: string) => void;
}

const initialValues = {
  search: '',
};

const validationSchema = Yup.object().shape({
  search: Yup.string().required('Required'),
});

export const SearchInput = ({ onSearch }: Props) => {
  const classes = useStyles({ theme });

  return (
    <Formix
      className={classes.container}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSearch(values.search);
      }}
    >
      <div className={classes.inputContainer}>
        <input
          className={classnames(classes.input)}
          placeholder="Search"
          name="search"
        />
        <div className={classes.eyeContainer} onClick={() => {}}>
          <AiOutlineEye className={classes.eye} />
        </div>
      </div>
    </Formix>
  );
};
