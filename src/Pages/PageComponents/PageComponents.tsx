import React from 'react';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from '../../libs/theme';

const useStyles = createUseStyles((theme: Theme) => ({
  page: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
  },
}));

export const PageComponents = () => {
  const classes = useStyles({ theme });

  return (
    <div id="main-container" className={classes.page}>
      <p>jdihf hfioes hfiose hfio</p>
    </div>
  );
};
