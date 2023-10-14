import React from 'react';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from '../../theme/Theme';
import { NavBarLink } from './NavBarLink';
import { Icon } from '../Icons';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  page: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  navBar: {
    width: '100%',
    padding: [theme.marginBase * 2, theme.marginBase * 3],
    background: theme.colors.yellowGradient,
    ...theme.basicFlex,
    justifyContent: 'space-evenly',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 100,
  },
  pageContainer: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
  },
}));

interface Props {
  children?: React.ReactNode;
}

export const NavBar = ({ children }: Props) => {
  const classes = useStyles({ theme });
  return (
    <div className={classes.page}>
      <div className={classes.pageContainer}>
        {children}
      </div>
      <div className={classes.navBar}>
        <NavBarLink icon={Icon.home} to='/home' />
        <NavBarLink icon={Icon.work} to='/work' />
        <NavBarLink icon={Icon.profile} to='/profile' />
      </div>
    </div>
  );
};