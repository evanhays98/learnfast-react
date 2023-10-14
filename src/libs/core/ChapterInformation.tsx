import React from 'react';
import { createUseStyles } from 'react-jss';
import { ColorsTest, theme, Theme } from '../theme';
import { Button } from './Buttons';
import { Icon, Icons } from './Icons';

const useStyles = createUseStyles<string, { pin?: boolean }, any>((theme: Theme) => ({
  container: props => ({
    backgroundColor: props.pin ? `${theme.colors.lightBeige}25` : theme.colors.transparentDarkGray,
    borderRadius: theme.borderRadius.std,
    boxShadow: theme.boxShadow.std,
    ...theme.basicFlex,
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.marginBase * 2,
  }),
  headerContainer: {
    width: '100%',
    ...theme.basicFlex,
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    marginBottom: theme.marginBase / 2,
  },
  title: {
    ...theme.fonts.h3,
    marginBottom: theme.marginBase,
    color: theme.colors.orange,
  },
  description: {
    ...theme.fonts.label,
    textAlign: 'justify',
  },
}));


interface Props {
  pin?: boolean,
  title: string,
  description: string,
}

export const ChapterInformation = ({ pin, title, description }: Props) => {
  const classes = useStyles({ theme, pin });

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <Button square>
          <Icons icon={Icon.edit} size={theme.icon.normal + 2}></Icons>
        </Button>
        {pin && <Icons icon={Icon.pin} color={ColorsTest.lightBeige} size={theme.icon.normal} />}
      </div>
      <h1 className={classes.title}>{title}</h1>
      <p className={classes.description}>{description}</p>
    </div>);
};