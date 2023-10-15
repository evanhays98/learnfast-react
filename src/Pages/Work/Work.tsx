import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme, theme } from 'src/libs/theme';
import { useNavigate, useParams } from 'react-router-dom';
import { useChapter } from '../../libs/api/src/chapter';
import { useWorkingCards } from '../../libs/api/src';
import { Button, CenteredLoader, Icon } from '../../libs/core';
import { WorkCard } from './component/WorkCard';


const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  globalContainer: {
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: theme.marginBase * 6,
    flexDirection: 'column',
    padding: theme.marginBase,
    paddingBottom: theme.marginBase * 6,
  },
  errorContainer: {
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    ...theme.fonts.h2,
    padding: theme.marginBase,
    paddingBottom: theme.marginBase * 6,
  },
  titleContainer: {
    ...theme.basicFlex,
    justifyContent: 'space-between',
    gap: theme.marginBase * 3,
  },
  textTitleContainer: {
    ...theme.basicFlex,
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: theme.marginBase,
  },
  title: {
    ...theme.fonts.h2,
    color: theme.colors.orange,
  },
  description: {
    ...theme.fonts.label,
    color: theme.colors.lightBeige,
  },
  cardBlockContainer: {
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
}));


export const Work = () => {
  const classes = useStyles({ theme });
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: chapter, isLoading: chapterLoading } = useChapter(id);
  const { data: workingCards, isLoading: workingCardsLoading, refetch: resetWorkingCards } = useWorkingCards(id);
  const [number, setNumber] = React.useState(0);
  useEffect(() => {
    console.log('number', number);
  }, [number]);

  if (chapterLoading || workingCardsLoading) {
    return <CenteredLoader />;
  }

  if (!chapter) {
    return <div className={classes.globalContainer}>
      <div className={classes.titleContainer}>
        <Button icon={Icon.close} square={true} onClick={() => {
          navigate('/home');
        }} />
      </div>
      <div className={classes.errorContainer}>Chapter not found</div>
    </div>;
  }

  if (!workingCards || workingCards.length === 0) {
    return <div className={classes.globalContainer}>
      <div className={classes.titleContainer}>
        <div className={classes.textTitleContainer}>
          <h1 className={classes.title}>{chapter.title}</h1>
          <p className={classes.description}>{chapter.description}</p>
        </div>
        <Button icon={Icon.close} square={true} onClick={() => {
          navigate('/home');
        }} />
      </div>
      <div className={classes.errorContainer}>Working cards not found</div>
    </div>;
  }

  const onFinish = async () => {
    if (number === workingCards.length - 1) {
      await resetWorkingCards();
      setNumber(0);
      return;
    }
    setNumber(number + 1);
  };

  return (
    <div className={classes.globalContainer}>
      <div className={classes.titleContainer}>
        <div className={classes.textTitleContainer}>
          <h1 className={classes.title}>{chapter.title}</h1>
          <p className={classes.description}>{chapter.description}</p>
        </div>
        <Button icon={Icon.close} square={true} onClick={() => {
          navigate('/home');
        }} />
      </div>
      <div className={classes.cardBlockContainer}>
        <WorkCard workingCardId={workingCards[number].id}
                  onFinish={onFinish}
        />
      </div>
    </div>

  );
};
