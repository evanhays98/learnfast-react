import React, { useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme, theme } from 'src/libs/theme';
import { CenteredLoader, Icon } from '../../libs/core';
import { Button } from 'src/libs/core/Buttons';
import { useCards, useChapter } from '../../libs/api';
import { Navigate, useParams } from 'react-router-dom';
import { ModalUpdateChapter } from './component/ModalUpdateChapter';
import { Card } from '../../libs/dtos';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  globalContainer: {
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: theme.marginBase * 6,
    flexDirection: 'column',
    paddingBottom: theme.marginBase * 6,
  },
  firstTitleContainer: {
    ...theme.basicFlex,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    ...theme.fonts.h2,
    flex: 1,
    background: `-webkit-linear-gradient(100deg, ${'#EF706F'} 0%, ${'#c27437'} 100%)`,
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  },
  titleContainer: {
    ...theme.basicFlex,
    gap: theme.marginBase,
    flexDirection: 'column',
    alignItems: 'flex-start',
    boxShadow: `0px 0px 50px -15px ${'rgba(30,1,30,0.75)'}`,
    padding: theme.marginBase * 2,
    background: `-webkit-linear-gradient(180deg, ${'rgba(170,174,220,0.1)'} 0%, ${'rgba(79,105,171,0.1)'} 100%)`,
    zIndex: 1,
  },
  description: {
    ...theme.fonts.label,
  },
}));

export const Chapter = () => {
  const classes = useStyles({ theme });
  const { id } = useParams();
  const [modalIsOpened, setModalIsOpened] = useState<boolean>(false);
  const { data: cardsPaginated, fetchNextPage, hasNextPage } = useCards(id);
  const { data: chapter, isLoading } = useChapter(id);
  const [atBottom, setAtBottom] = useState<boolean>(false);
  const container = useMemo(() => {
    return document.getElementById('main-container');
  }, []);


  const cards = cardsPaginated?.pages.reduce((acc, page) => {
    return [...acc, ...page.data];
  }, [] as Card[]) || [];


  const handleScroll = () => {
    if (
      container?.offsetHeight && container?.scrollTop && container?.scrollHeight && container.offsetHeight + container.scrollTop >= container.scrollHeight - 10
    ) {
      console.log(container.offsetHeight + container.scrollTop, container.scrollHeight - 2);
      setAtBottom(true);
    }
  };

  useEffect(() => {
    if (!container) {
      return;
    }
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [container, handleScroll]);

  useEffect(() => {
    if (atBottom && hasNextPage) {
      fetchNextPage();
      setAtBottom(false);
    }
  }, [atBottom, fetchNextPage, hasNextPage]);

  if (isLoading) {
    return <CenteredLoader />;
  }

  if (!chapter) {
    return <Navigate to='/home' />;
  }

  return (
    <div className={classes.globalContainer}>
      <div className={classes.titleContainer}>
        <div className={classes.firstTitleContainer}>
          <h1 className={classes.title}>{chapter.title}</h1>
          <Button
            className={classes.button}
            square
            icon={Icon.edit}
            onClick={() => {
              setModalIsOpened(true);
            }}
          />
        </div>
        <p className={classes.description}>{chapter.description}</p>
      </div>
      {cards.map((card) => {
        return <div key={card.id} className={classes.description}>{card.fieldTranslation?.sentence}</div>;
      })}
      <ModalUpdateChapter chapter={chapter} isOpened={modalIsOpened} setIsOpened={setModalIsOpened} />
    </div>
  );
};
