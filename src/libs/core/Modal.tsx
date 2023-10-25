import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from '../theme';
import { Icon, Icons } from './Icons';
import { Button } from './Buttons';
import classnames from 'classnames';

const useStyles = createUseStyles<string, { height: number }, any>(
  (theme: Theme) => ({
    mainContainer: {
      background: `-webkit-linear-gradient(90deg, ${'rgba(239,112,111,0.05)'} 0%, ${'rgba(194,116,55,0.1)'} 100%)`,
      backdropFilter: 'blur(2px)',
      position: 'fixed',
      height: window.innerHeight,
      top: 0,
      left: 0,
      right: 0,
      zIndex: 90,
      animationName: '$appearMainContainer',
      animationDuration: '.5s',
      animationTimingFunction: 'ease-in-out',
      animationFillMode: 'forwards',
    },
    animationMainContainer: {
      animationName: '$disappearMainContainer',
    },
    cont: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: window.innerHeight,
      zIndex: 91,
      overflow: 'scroll',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      animationName: '$appearContainer',
      animationDuration: '.4s',
      animationTimingFunction: 'ease-in-out',
      animationFillMode: 'forwards',
    },
    container: {
      background: `linear-gradient(100deg, ${'rgba(15,7,28,0.8)'} 0%, ${'rgba(8,6,24,0.8)'} 100%)`,
      backdropFilter: 'blur(10px)',
      borderRadius: [theme.borderRadius.large, theme.borderRadius.large, 0, 0],
      boxShadow: theme.boxShadow.std,
      width: '100%',
      padding: theme.marginBase * 2,
      minHeight: 400,
      marginBottom: theme.marginBase * 7,
      height: 'fit-content',
    },
    animationContainer: {
      animationName: '$disappearContainer',
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
    '@keyframes appearMainContainer': {
      '0%': {
        opacity: 1,
        transform: `translateY(-100vh)`,
      },
      '100%': {
        opacity: 1,
        transform: `translateY(0)`,
      },
    },
    '@keyframes disappearMainContainer': {
      '0%': {
        opacity: 1,
        transform: `translateY(0)`,
      },
      '100%': {
        opacity: 1,
        transform: `translateY(-100vh)`,
      },
    },
    '@keyframes appearContainer': {
      '0%': {
        opacity: 1,
        transform: `translateY(100vh)`,
      },
      '100%': {
        opacity: 1,
        transform: `translateY(0)`,
      },
    },
    '@keyframes disappearContainer': {
      '0%': {
        opacity: 1,
        transform: `translateY(0)`,
      },
      '100%': {
        opacity: 1,
        transform: `translateY(100vh)`,
      },
    },
  }),
);

interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title?: string;
}

export const Modal = ({ children, isOpen, setIsOpen, title }: Props) => {
  const [height, setHeight] = React.useState(0);
  const classes = useStyles({ theme, height: height });
  const [isClosing, setIsClosing] = React.useState(false);
  const [firstRender, setFirstRender] = React.useState(true);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }
    if (!isOpen && !isClosing && !firstRender) {
      setTimeout(() => {
        setIsClosing(false);
      }, 500);
    }
  }, [firstRender, isClosing, isOpen]);

  if (!isOpen && !isClosing) {
    return null;
  }

  return (
    <div>
      <div
        className={classnames(classes.mainContainer, {
          [classes.animationMainContainer]: !isOpen,
        })}
      />
      <div
        className={classnames(classes.cont, {
          [classes.animationContainer]: !isOpen,
        })}
      >
        <div
          className={classes.container}
          ref={(ref) => ref && setHeight(ref.clientHeight)}
        >
          <div className={classes.headerContainer}>
            <Button
              square
              onClick={() => {
                setIsClosing(true);
                setIsOpen(false);
              }}
            >
              <Icons icon={Icon.close} size={theme.icon.normal + 2}></Icons>
            </Button>
            {title && <p className={classes.title}>{title}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
