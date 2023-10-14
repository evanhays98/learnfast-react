import { createUseStyles } from 'react-jss';
import { theme, Theme } from '../../theme';
import React from 'react';

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    ...theme.basicFlex,
    gap: theme.marginBase / 2,
  },
  emptyPoint: {
    width: theme.marginBase + 2,
    height: theme.marginBase + 2,
    border: '1px solid ' + theme.colors.orange,
    borderRadius: '50%',
  },
  filledPoint: {
    width: theme.marginBase + 2,
    height: theme.marginBase + 2,
    border: '1px solid ' + theme.colors.orange,
    borderRadius: '50%',
    backgroundColor: theme.colors.orange,
  },
}));

interface Props {
  points: number;
  maxPoints: number;
}

export const PointIndicator = ({ points, maxPoints }: Props) => {
  const classes = useStyles({ theme });
  return (
    <div className={classes.container}>
      {maxPoints > 0 && Array.from(Array(maxPoints).keys()).map((index) => {
        return (
          <div className={points > index ? classes.filledPoint : classes.emptyPoint} />
        );
      })}
    </div>
  );
};

