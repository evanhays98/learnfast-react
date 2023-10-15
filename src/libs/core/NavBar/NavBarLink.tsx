import React from 'react';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from '../../theme/Theme';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { Icon, Icons } from '../Icons';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  container: {
    ...theme.basicFlex,
    padding: theme.marginBase / 2,
    borderRadius: theme.borderRadius.std,
  },
  active: {
    background: `linear-gradient( -80deg, ${'#7E6CA1'} 0%, ${'#5C4565'} 100%)`,
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
  },
  icon: {
    fontSize: theme.icon.large,
    color: theme.colors.lightGray,
  },
}));


interface Props {
  icon: Icon,
  to: string,
}


export const NavBarLink = ({ icon, to }: Props) => {
  const classes = useStyles({ theme });
  return (
    <NavLink to={to} className={({ isActive }: any) => classnames(classes.container, { [classes.active]: isActive })}>
      {icon === Icon.home && <Icons icon={Icon.home} />}
      {icon === Icon.work && <Icons icon={Icon.work} />}
      {icon === Icon.profile && <Icons icon={Icon.profile} />}
    </NavLink>
  );
};