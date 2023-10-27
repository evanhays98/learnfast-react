import React from 'react';
import { createUseStyles } from 'react-jss';
import { Theme, theme } from '../theme/Theme';
import { Icon, Icons } from './Icons';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  globalContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  icon: {
    animation: '$active 1s linear infinite',
  },
  '@keyframes active': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
}));

interface Props {
  sx?: any;
}

export const CenteredLoader = ({ sx }: Props) => {
  const classes = useStyles({ theme });
  return (
    <div className={classes.globalContainer}>
      <Icons icon={Icon.load} className={classes.icon} />
    </div>
  );
};
