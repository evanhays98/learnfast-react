import React from 'react';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from '../theme';
import { Icon, Icons } from './Icons';
import { Button } from './Buttons';
import classnames from 'classnames';

const useStyles = createUseStyles<string, { height: number }, any>((theme: Theme) => ({
  mainContainer: {
    background: `${theme.colors.orange}20`,
    backdropFilter: 'blur(2px)',
    position: 'fixed',
    height: window.innerHeight,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 90,
    transition: 'all 0.3s ease-in-out',
  },
  animationMainContainer: {
    transition: 'all 0.3s ease-in-out',
    top: -window.innerHeight,
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
  animationContainer: {
    transition: 'all 0.3s ease-in-out',
    bottom: ({ height }) => `-${height}px !important`,
  },
  headerContainer: {
    width: '100%',
    ...theme.basicFlex,
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    marginBottom: theme.marginBase * 2,
  },
  title: {
    ...theme.fonts.h4,
    textTransform: 'uppercase',
  },
}));


interface Props {
  children?: React.ReactNode,
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
  title?: string,
}

export const Modal = ({ children, isOpen, setIsOpen, title }: Props) => {
  const [height, setHeight] = React.useState(0);
  const classes = useStyles({ theme, height: height });

  return (

    <div>
      <div
        className={classnames(classes.mainContainer, { [classes.animationMainContainer]: !isOpen })} />
      <div className={classnames(classes.container, { [classes.animationContainer]: !isOpen })}
           ref={ref => ref && setHeight(ref.clientHeight)}>
        <div className={classes.headerContainer}>
          <Button square={true} onClick={() => {
            setIsOpen(false);
          }}>
            <Icons icon={Icon.close} size={theme.icon.normal + 2}></Icons>
          </Button>
          {title && <p className={classes.title}>{title}</p>}
        </div>
        {children}
      </div>
    </div>);
};