import React, { useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from '../../../libs/theme';
import classnames from 'classnames';
import { WorkingCard } from '../../../libs/dtos';

interface Props {
  workingCard: WorkingCard;
}


const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  content: {
    ...theme.basicFlex,
    alignItems: 'right',
    justifyContent: 'right',
    gap: theme.marginBase,
    width: '100%',
  },
  points: {
    width: 10,
    height: 10,
    border: `1px solid ${'rgba(111,71,180,0.5)'}`,
  },
  pointsUp: {
    border: 'none',
    borderRadius: 2,
    background: `radial-gradient(circle, ${'rgb(162,52,156)'} 0%, ${'rgb(162,93,180)'} 100%)`,
  },
}));

export const Points = ({ workingCard }: Props) => {

  const classes = useStyles({ theme });
  const list = useMemo(() => {
      const list = [];
      for (let i = 0; i < workingCard.maxPoints; i++) {
        list.push(i);
      }
      return list;
    }
    , [workingCard.maxPoints]);


  return (
    <div className={classes.content}>
      {list.map((num) => (
        <div key={num} className={classnames(classes.points, {
          [classes.pointsUp]: num < workingCard.points,
        })} />
      ))}

    </div>
  );
};