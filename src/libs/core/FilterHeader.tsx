import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from 'src/libs/theme';
import { Icon, Icons } from './Icons';
import classnames from 'classnames';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    overflowX: 'auto',
    gap: theme.marginBase * 2,
    scrollbarWidth: 'none',
    MsOverflowStyle: 'none',
    padding: [0, theme.marginBase * 2],
    '&::-webkit-scrollbar': {
      display: 'none',
      width: 0,
    },
    flex: 1,
  },
  scrollButtonContainer: {
    width: theme.marginBase * 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderRadius: 4,
    opacity: 1,
    transition: 'all ease-in-out 0.3s',
  },
  scrollButtonContainerRight: {
    borderLeft: `2px solid ${'rgb(209,209,224)'}`,
  },
  scrollButtonContainerLeft: {
    borderRight: `2px solid ${'rgb(209,209,224)'}`,
  },
  columnContainer: {
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
    gap: theme.marginBase * 2,
    background: `linear-gradient(100deg, ${'rgba(133,78,155,0.48)'} 0%, ${'rgba(192,79,170,0.56)'} 100%)`,
    borderRadius: theme.borderRadius.std,
    padding: theme.marginBase,
  },
  scrollButtonRight: {
    borderRight: `2px solid ${'rgba(209,209,224,0.8)'}`,
    opacity: 0.5,
  },
  scrollButtonLeft: {
    borderLeft: `2px solid ${'rgba(209,209,224,0.8)'}`,
    opacity: 0.5,
  },
  text: {
    ...theme.fonts.label,
    '&:first-letter': {
      textTransform: 'uppercase',
    },
  },
}));

interface Props {
  columnsNames: { value: string, name: string }[];
}


export const FilterHeader = ({ columnsNames }: Props) => {
  const classes = useStyles({ theme });
  const refContainer = useRef<HTMLDivElement>(null);
  const [scrollInterval, setScrollInterval] = useState<string | number | NodeJS.Timeout | null | undefined>(null);
  const [atRight, setAtRight] = useState<boolean>(false);
  const [atLeft, setAtLeft] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    if (refContainer.current) {
      setAtRight(refContainer.current.offsetWidth + refContainer.current.scrollLeft > refContainer.current.scrollWidth - 10);
      setAtLeft(refContainer.current.scrollLeft < 10);
    }
  }, [refContainer]);

  useEffect(() => {
    if (!refContainer.current) {
      return;
    }
    refContainer.current.addEventListener('scroll', handleScroll);
    return () => {
      if (refContainer.current) {
        refContainer.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [refContainer, handleScroll]);


  const startScroll = (direction: number) => {
    const scrollStep = 100;
    if (refContainer.current) {
      refContainer.current.scrollBy({ behavior: 'smooth', left: scrollStep * direction });
    }
    const interval = setInterval(() => {
      if (refContainer.current) {
        refContainer.current.scrollBy({ behavior: 'smooth', left: scrollStep * direction });
      }
    }, 300);
    setScrollInterval(interval);
  };

  const stopScroll = () => {
    if (scrollInterval !== null) {
      clearInterval(scrollInterval);
      setScrollInterval(null);
    }
  };

  return (
    <div className={classes.mainContainer}>
      <div
        className={classnames(classes.scrollButtonContainer, classes.scrollButtonContainerLeft, {
          [classes.scrollButtonRight]: atLeft,
        })}
        onMouseDown={() => startScroll(-1)}
        onMouseUp={stopScroll}
        onMouseLeave={stopScroll}
      >
        <Icons icon={Icon.arrowLeft} size={theme.icon.normal} />
      </div>
      <div ref={refContainer} className={classes.container}>
        {columnsNames.map(({ name, value }) => (
          <div className={classes.columnContainer}>
            <p className={classes.text}>{name}</p>
            <Icons icon={Icon.dotsVertical} size={theme.icon.normal} />
          </div>
        ))
        }
      </div>
      <div
        className={classnames(classes.scrollButtonContainer, classes.scrollButtonContainerRight, {
          [classes.scrollButtonLeft]: atRight,
        })}
        onMouseDown={() => startScroll(1)}
        onMouseUp={stopScroll}
        onMouseLeave={stopScroll}
      >
        <Icons icon={Icon.arrowRight} size={theme.icon.normal} />
      </div>
    </div>
  );
};
