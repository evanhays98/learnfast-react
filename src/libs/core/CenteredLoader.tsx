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
  iconContainer: {
    background: 'rgba(14,6,47,0.2)',
    backdropFilter: 'blur(2px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: '50%',
  },
}));

interface Props {
  back?: boolean;
}

export const CenteredLoader = ({ back }: Props) => {
  const classes = useStyles({ theme });
  return (
    <div className={classes.globalContainer}>
      {back ? (
        <div className={classes.iconContainer}>
          <Icons icon={Icon.load} className={classes.icon} />
        </div>
      ) : (
        <Icons icon={Icon.load} className={classes.icon} />
      )}
    </div>
  );
};
