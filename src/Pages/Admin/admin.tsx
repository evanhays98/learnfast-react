import React from 'react';
import { createUseStyles } from 'react-jss';
import { Theme, theme } from 'src/libs/theme';
import { useMe } from '../../libs/api';
import { LastUsageByUser } from './component';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  globalContainer: {
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: theme.marginBase * 6,
    flexDirection: 'column',
    paddingBottom: theme.marginBase * 6,
    transition: 'all 1s ease',
    padding: theme.marginBase * 2,
  },
  adminPanelTitle: {
    ...theme.fonts.h1,
    background: `-webkit-linear-gradient(100deg, ${'#EF706F'} 0%, ${'#c27437'} 100%)`,
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  },
}));

export const Admin = () => {
  const classes = useStyles({ theme });
  const { data: me } = useMe();

  if (!me) {
    return null;
  }

  return (
    <div className={classes.globalContainer}>
      <h1 className={classes.adminPanelTitle}>Admin Panel</h1>
      <LastUsageByUser />
    </div>
  );
};
