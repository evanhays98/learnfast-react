import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme, theme } from 'src/libs/theme';
import { useNavigate, useParams } from 'react-router-dom';
import { useChapter, useWorkingCards } from '../../libs/api/src';
import { Button, CenteredLoader, Icon } from '../../libs/core';
import { WorkCard } from './component/WorkCard';


const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  globalContainer: {
    backdropFilter: 'blur(2px)',
    position: 'fixed',
    height: window.innerHeight,
    top: 0,
    left: 0,
    right: 0,
    overflow: 'scroll',
    transition: 'all 0.3s ease-in-out',
  },
  firstTitleContainer: {
    ...theme.basicFlex,
    justifyContent: 'space-between',
    width: '100%',
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
  container: {
    zIndex: 91,
    background: `${theme.colors.black}AA`,
    backdropFilter: 'blur(10px)',
    borderRadius: [theme.borderRadius.large, theme.borderRadius.large, 0, 0],
    boxShadow: theme.boxShadow.std,
    width: '100%',
    padding: theme.marginBase * 2,
    position: 'fixed',
    bottom: 0,
    left: 0,
    minHeight: 400,
    height: 'fit-content',
    transition: 'all 0.3s ease-in-out',
  },
  titleContainer: {
    ...theme.basicFlex,
    gap: theme.marginBase,
    flexDirection: 'column',
    alignItems: 'flex-start',
    boxShadow: `0px 0px 50px -15px ${'rgba(30,1,30,0.75)'}`,
    padding: theme.marginBase,
    backdropFilter: 'blur(10px)',
    background: `-webkit-linear-gradient(180deg, ${'rgba(170,174,220,0.1)'} 0%, ${'rgba(79,105,171,0.1)'} 100%)`,
    position: 'sticky',
    top: 0,
  },
  title: {
    ...theme.fonts.h2,
    background: `-webkit-linear-gradient(100deg, ${'#EF706F'} 0%, ${'#c27437'} 100%)`,
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  },
  description: {
    ...theme.fonts.label,
    color: theme.colors.lightGray,
  },
  cardBlockContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    background: `repeating-linear-gradient(45deg, ${'rgba(232,202,229,0.5)'} 0%, ${'rgba(225,185,218,0.5)'} 50%, ${'rgba(169,123,169,0.5)'} 100%)`,
    position: 'relative',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
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
    setNumber(0);
  }, [workingCards]);

  if (chapterLoading || workingCardsLoading) {
    return <CenteredLoader />;
  }

  console.log(number, workingCards?.length);

  if (!chapter) {
    return <div className={classes.globalContainer}>
      <div className={classes.titleContainer}>
        <Button icon={Icon.close} square onClick={() => {
          navigate('/');
        }} />
      </div>
      <div className={classes.errorContainer}>Chapter not found</div>
    </div>;
  }

  if (!workingCards || workingCards.length === 0) {
    return <div className={classes.globalContainer}>
      <div className={classes.titleContainer}>
        <div className={classes.firstTitleContainer}>
          <h1 className={classes.title}>{chapter.title}</h1>
          <Button className={classes.button} square sizeIcon={theme.icon.large + 10} icon={Icon.close} onClick={() => {
            navigate('/');
          }
          } />
        </div>
        <p className={classes.description}>{chapter.description}</p>
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
        <div className={classes.firstTitleContainer}>
          <h1 className={classes.title}>{chapter.title}</h1>
          <Button className={classes.button} square sizeIcon={theme.icon.large + 10} icon={Icon.close} onClick={() => {
            navigate('/');
          }
          } />
        </div>
        <p className={classes.description}>{chapter.description}</p>
      </div>
      <div className={classes.container}>
        <div className={classes.cardBlockContainer}>
          <WorkCard workingCardId={workingCards[number].id}
                    onFinish={onFinish}
          />
        </div>
      </div>
    </div>

  );
};
