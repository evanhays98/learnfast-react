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
    borderRadius: 10,
    backgroundColor: theme.colors.lightBeige,
  },
  pointsUp: {
    backgroundColor: theme.colors.orange,
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
        <div className={classnames(classes.points, {
          [classes.pointsUp]: num < workingCard.points,
        })} />
      ))}

    </div>
  );
};