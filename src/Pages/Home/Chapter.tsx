import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme, theme } from 'src/libs/theme';
import { CenteredLoader, FilterHeader, Icon, Icons, SearchInput } from '../../libs/core';
import { Button } from 'src/libs/core/Buttons';
import { useCards, useChapter } from '../../libs/api';
import { Navigate, useParams } from 'react-router-dom';
import { ModalUpdateChapter } from './component/ModalUpdateChapter';
import { Card, PaginatedQueryParams } from '../../libs/dtos';
import { UpdateFieldTranslation } from './component/UpdateFieldTranslation';
import { CardType } from '../../libs/enums';
import { ModalCreateCard } from './component/ModalCreateCard';

const useStyles = createUseStyles<string, { atTop: boolean }, any>((theme: Theme) => ({
  globalContainer: {
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingBottom: theme.marginBase * 6,
  },
  contentContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: theme.marginBase * 6,
    flexDirection: 'column',
    padding: theme.marginBase * 3,
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
  buttonCreateContainer: {
    width: '100%',
    ...theme.basicFlex,
    padding: theme.marginBase * 2,
    gap: theme.marginBase * 2,
    position: 'sticky',
    top: 0,
    background: `linear-gradient(100deg, ${'#0b162b'} 0%, ${'#110116'} 100%)`,
    boxShadow: `0px 5px 30px -10px ${'rgba(30,1,30,1)'}`,
    zIndex: 1,
  },
  buttonCreateCard: {
    background: `linear-gradient(100deg, ${'rgb(98,190,180, 0.5)'} 0%, ${'rgb(82,146,166, 0.5)'} 100%)`,
    boxShadow: `0px 0px 20px 1px ${'rgba(98,191,180,0.5)'}`,
    border: `1px solid ${'rgba(98,191,180,0.4)'}`,
  },
  gotToTop: {
    position: 'fixed',
    bottom: theme.marginBase * 10,
    transition: 'all ease-in-out 0.3s',
    right: ({ atTop }) => atTop ? -theme.marginBase * 10 : theme.marginBase * 2,
    width: theme.marginBase * 5,
    height: theme.marginBase * 5,
    borderRadius: theme.borderRadius.std,
    background: `linear-gradient(100deg, ${'rgb(98,190,180, 0.1)'} 0%, ${'rgb(82,146,166, 0.1)'} 100%)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
  },
}));

export const Chapter = () => {
  const [atTop, setAtTop] = useState<boolean>(true);
  const [paginateQuery, setPaginateQuery] = useState<PaginatedQueryParams>({ limit: 20 });
  const classes = useStyles({ theme, atTop });
  const { id } = useParams();
  const [modalIsOpened, setModalIsOpened] = useState<boolean>(false);
  const [modalCreateIsOpened, setModalCreateIsOpened] =
    useState<boolean>(false);
  const { data: cardsPaginated, fetchNextPage, hasNextPage } = useCards(id, paginateQuery);
  const { data: chapter, isLoading } = useChapter(id);
  const [atBottom, setAtBottom] = useState<boolean>(false);
  const container = useMemo(() => {
    return document.getElementById('main-container');
  }, []);

  const cards =
    cardsPaginated?.pages.reduce((acc, page) => {
      return [...acc, ...page.data];
    }, [] as Card[]) || [];

  const handleScroll = useCallback(() => {
    if (
      container?.offsetHeight &&
      container?.scrollTop &&
      container?.scrollHeight &&
      container.offsetHeight + container.scrollTop >=
      container.scrollHeight - 10
    ) {
      setAtBottom(true);
    }
    if (container &&
      container?.scrollTop > 100
    ) {
      setAtTop(false);
    } else {
      setAtTop(true);
    }
  }, [container]);


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

  if (!chapter || !id) {
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
      <div className={classes.buttonCreateContainer}>
        <Button
          className={classes.buttonCreateCard}
          text='Create card'
          full
          icon={Icon.addCard}
          onClick={() => {
            setModalCreateIsOpened(true);
          }}
        />
        <SearchInput
          onSearch={(value: string) => {
            setPaginateQuery({ ...paginateQuery, search: value });
          }}
        />
        <FilterHeader columnsNames={[
          {
            name: 'type',
            value: 'type',
          },
          { name: 'sentence', value: 'fieldTranslation.sentence' },
          {
            name: 'translation',
            value: 'fieldTranslation.name',
          },
          {
            name: 'information',
            value: 'fieldTranslation.information',
          },
          {
            name: 'updatedAt',
            value: 'updatedAt',
          },
          {
            name: 'createdAt',
            value: 'createdAt',
          },
        ]} />
      </div>
      <div className={classes.contentContainer}>
        {cards.map((card) => {
          if (card.type === CardType.TRANSLATION && card.fieldTranslation) {
            return (
              <UpdateFieldTranslation
                key={card.id}
                fieldTranslation={card.fieldTranslation}
                chapterId={id}
              />
            );
          }
          return null;
        })}
      </div>
      <ModalUpdateChapter
        chapter={chapter}
        isOpened={modalIsOpened}
        setIsOpened={setModalIsOpened}
      />
      <ModalCreateCard
        isOpened={modalCreateIsOpened}
        setIsOpened={setModalCreateIsOpened}
        chapterId={chapter.id}
      />
      <div className={classes.gotToTop} onClick={() => {
        if (!container) {
          return;
        }
        container.scrollTo({ top: 0, behavior: 'smooth' });
      }}>
        <Icons icon={Icon.toTop} />
      </div>
    </div>
  );
};
