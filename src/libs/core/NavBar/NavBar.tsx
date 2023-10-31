import React from 'react';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from '../../theme/Theme';
import { NavBarLink } from './NavBarLink';
import { Icon } from '../Icons';
import { useLastChapterWorked } from '../../api';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  page: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    overscrollBehavior: 'none',
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
    boxShadow: '0px -10px 30px -10px rgba(80, 84, 133, 0.8)',
    overflow: 'hidden',
    overscrollBehavior: 'none',
  },
  pageContainer: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    overscrollBehavior: 'none',
  },
}));

interface Props {
  children?: React.ReactNode;
}

export const NavBar = ({ children }: Props) => {
  const classes = useStyles({ theme });
  const { data: lastChapter } = useLastChapterWorked();
  return (
    <div className={classes.page}>
      <div className={classes.pageContainer} id="main-container">
        {children}
      </div>
      <div className={classes.navBar}>
        <NavBarLink icon={Icon.home} to="/" />
        {lastChapter && (
          <NavBarLink icon={Icon.work} to={`/work/${lastChapter.id}`} />
        )}
        <NavBarLink icon={Icon.profile} to="/profile" />
      </div>
    </div>
  );
};
