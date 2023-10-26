import React from 'react';
import { createUseStyles } from 'react-jss';
import { ColorsTest, theme, Theme } from '../../../libs/theme';
import { Button, Icon, Icons } from '../../../libs/core';
import { Chapter } from '../../../libs/dtos';
import { useNavigate } from 'react-router-dom';
import { useIsAdmin, useMe } from '../../../libs/api';

const useStyles = createUseStyles<string, { pin?: boolean }, any>((theme: Theme) => ({
  container: props => ({
    background: `repeating-linear-gradient(${Math.random() * 360}deg, ${'rgba(209,206,250,0.1)'} 0%, ${'rgba(182,179,227,0.05)'} 50%, ${'rgba(165,160,236,0.1)'} 100%)`,
    borderRadius: theme.borderRadius.std,
    boxShadow: `0px 0px 10px 2px ${'rgba(215,154,239,0.15)'}`,
    border: `1px solid ${'rgba(129,96,248,0.1)'}`,
    ...theme.basicFlex,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backdropFilter: 'blur(10px)',
    padding: theme.marginBase * 2,
    maxWidth: theme.marginBase * 70,
    width: '100%',
  }),
  headerContainer: {
    width: '100%',
    ...theme.basicFlex,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.marginBase / 2,
  },
  title: {
    ...theme.fonts.h3,
    marginBottom: theme.marginBase,
    color: theme.colors.lightGray,
    flex: 1,
  },
  description: {
    ...theme.fonts.caption,
    textAlign: 'justify',
  },
  button: {
    width: theme.marginBase * 4,
    height: theme.marginBase * 4,
    minWidth: `${theme.marginBase * 4}px !important`,
    padding: theme.marginBase / 2,
    background: `repeating-linear-gradient(120deg, ${'rgba(238,229,223,0.8)'} 0%, ${'rgba(232,217,206,0.8)'} 50%, ${'rgba(232,186,157,0.8)'} 100%)`,
    position: 'relative',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
  },
  buttonGo: {
    marginTop: theme.marginBase * 2,
    background: `radial-gradient(circle, ${'rgba(145,186,231,0.2)'} 0%, ${'rgba(225,164,116,0.1)'} 100%)`,
    border: `1px solid ${'rgba(239,112,111,0.1)'}`,
    position: 'relative',
    boxShadow: `0px 0px 10px 3px ${'rgba(173,111,239,0.15)'}`,
  },
  buttonGoText: {
    background: `-webkit-linear-gradient(0deg, ${'#da88f1'} 0%, ${'#48abc9'} 100%)`,
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  },
}));


interface Props {
  chapter: Chapter,
}

export const ChapterInformation = ({ chapter }: Props) => {
  const { data: me } = useMe();
  const classes = useStyles({ theme });
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <h2 className={classes.title}>{chapter.title}</h2>
        {(me?.id === chapter.ownerId || isAdmin) &&
          <Button className={classes.button} square onClick={() => {
            navigate(`/chapter/${chapter.id}`);
          }}>
            <Icons icon={Icon.edit} color={ColorsTest.black} size={theme.icon.normal + 2} />
          </Button>
        }
      </div>
      <p className={classes.description}>{chapter.description}</p>
      <Button full className={classes.buttonGo} onClick={() => {
        navigate(`/work/${chapter.id}`);
      }}>
        <div className={classes.buttonGoText}>Work on this chapter</div>
      </Button>
    </div>);
};