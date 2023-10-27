import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from '../theme';
import { Button } from './Buttons';
import { Icon, Icons } from './Icons';
import classnames from 'classnames';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  mainContainer: {
    background: `-webkit-linear-gradient(90deg, ${'rgba(111,235,239,0.05)'} 0%, ${'rgba(164,55,194,0.1)'} 100%)`,
    backdropFilter: 'blur(20px)',
    position: 'absolute',
    width: '300px',
    borderTopLeftRadius: theme.borderRadius.large,
    borderBottomLeftRadius: theme.borderRadius.large,
    padding: theme.marginBase * 2,
    boxShadow: `0px 0px 50px 0px ${'rgba(220,113,220,0.2)'}`,
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 90,
    animationName: '$appearMainContainer',
    animationDuration: '.5s',
    animationTimingFunction: 'ease-in-out',
    animationFillMode: 'forwards',
    '@media (max-width: 300px)': {
      width: '100%',
    },
  },
  disappearMainContainer: {
    animationName: '$disappearMainContainer',
  },
  headerContainer: {
    width: '100%',
    ...theme.basicFlex,
    flexWrap: 'nowrap',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: theme.marginBase * 2,
  },
  '@keyframes appearMainContainer': {
    '0%': {
      transform: `translateX(100%)`,
    },
    '100%': {
      transform: `translateX(0)`,
    },
  },
  '@keyframes disappearMainContainer': {
    '0%': {
      transform: `translateX(0)`,
    },
    '100%': {
      transform: `translateX(100%)`,
    },
  },
}));

interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title?: string;
}

export const ModalSide = ({ children, isOpen, setIsOpen, title }: Props) => {
  const classes = useStyles({ theme });
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isClosing) {
      setTimeout(() => {
        setIsClosing(false);
      }, 500);
    }
  }, [isClosing, isOpen]);

  useEffect(() => {
    if (!isOpen) setIsClosing(true);
  }, [isOpen]);

  if (!isOpen && !isClosing) {
    return null;
  }

  return (
    <div
      className={classnames(classes.mainContainer, {
        [classes.disappearMainContainer]: isClosing,
      })}
    >
      <div className={classes.headerContainer}>
        <Button
          square
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <Icons icon={Icon.close} size={theme.icon.normal + 2}></Icons>
        </Button>
        {title && <p className={classes.title}>{title}</p>}
      </div>
      {children}
    </div>
  );
};
