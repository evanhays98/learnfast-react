import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { ColorsTest, theme, Theme } from 'src/libs/theme';
import { Icon, Icons } from './Icons';
import classnames from 'classnames';
import { FilterAndSortConfig } from '../config';
import { SearchInput } from './Input';
import { PaginatedQueryParams } from '../dtos';
import { Formix } from './Formix';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  globalContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
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
  filterContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    borderBottomLeftRadius: theme.borderRadius.std,
    borderBottomRightRadius: theme.borderRadius.std,
    background: `linear-gradient(100deg, ${'rgba(236,230,239,0.01)'} 0%, ${'rgba(236,241,243,0.01)'} 100%)`,
    borderBottom: `2px solid ${'rgba(209,209,224,0.8)'}`,
    padding: theme.marginBase * 2,
    gap: theme.marginBase * 2,
  },
  buttonSortContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.marginBase * 2,
  },
  buttonSort: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: theme.marginBase,
    borderRadius: theme.borderRadius.std,
    background: 'rgba(238,245,245,1)',
  },
  deActiveFilter: {
    opacity: 0.5,
  },
  activeFilter: {
    border: `2px solid ${'rgba(209,209,224,0.8)'}`,
  },
}));

interface Props {
  columnsNames: FilterAndSortConfig[];
}

const initialValues: PaginatedQueryParams = {
  limit: 20,
};

export const FilterHeader = ({ columnsNames }: Props) => {
  const classes = useStyles({ theme });
  const refContainer = useRef<HTMLDivElement>(null);
  const [scrollInterval, setScrollInterval] = useState<
    string | number | NodeJS.Timeout | null | undefined
  >(null);
  const [atRight, setAtRight] = useState<boolean>(false);
  const [atLeft, setAtLeft] = useState<boolean>(false);
  const [filterIndex, setFilterIndex] = useState<number | null>(null);
  const [paginateQuery, setPaginateQuery] = useState<PaginatedQueryParams>({
    limit: 20,
  });

  const handleScroll = useCallback(() => {
    if (refContainer.current) {
      setAtRight(
        refContainer.current.offsetWidth + refContainer.current.scrollLeft >
          refContainer.current.scrollWidth - 10,
      );
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
      refContainer.current.scrollBy({
        behavior: 'smooth',
        left: scrollStep * direction,
      });
    }
    const interval = setInterval(() => {
      if (refContainer.current) {
        refContainer.current.scrollBy({
          behavior: 'smooth',
          left: scrollStep * direction,
        });
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

  const submit = (values: PaginatedQueryParams) => {
    setPaginateQuery(values);
  };

  return (
    <Formix initialValues={initialValues} onSubmit={submit}>
      <SearchInput name={'search'} nameValue={'fjeiso'} />
      <div className={classes.globalContainer}>
        <div className={classes.mainContainer}>
          <div
            className={classnames(
              classes.scrollButtonContainer,
              classes.scrollButtonContainerLeft,
              {
                [classes.scrollButtonRight]: atLeft,
              },
            )}
            onMouseDown={() => startScroll(-1)}
            onMouseUp={stopScroll}
            onMouseLeave={stopScroll}
          >
            <Icons icon={Icon.arrowLeft} size={theme.icon.normal} />
          </div>
          <div ref={refContainer} className={classes.container}>
            {columnsNames.map(({ name, value }, index) => (
              <div
                className={classnames(classes.columnContainer, {
                  [classes.deActiveFilter]:
                    filterIndex !== null && Number(filterIndex) !== index,
                  [classes.activeFilter]:
                    filterIndex !== null && Number(filterIndex) === index,
                })}
                onClick={() => {
                  if (filterIndex === index) {
                    setFilterIndex(null);
                    return;
                  }
                  setFilterIndex(index);
                }}
              >
                <p className={classes.text}>{name}</p>
                <Icons icon={Icon.dotsVertical} size={theme.icon.normal} />
              </div>
            ))}
          </div>
          <div
            className={classnames(
              classes.scrollButtonContainer,
              classes.scrollButtonContainerRight,
              {
                [classes.scrollButtonLeft]: atRight,
              },
            )}
            onMouseDown={() => startScroll(1)}
            onMouseUp={stopScroll}
            onMouseLeave={stopScroll}
          >
            <Icons icon={Icon.arrowRight} size={theme.icon.normal} />
          </div>
        </div>
        {filterIndex !== null && (
          <div className={classnames(classes.filterContainer)}>
            <SearchInput
              name={columnsNames[filterIndex].value}
              nameValue={columnsNames[filterIndex].value}
            />
            <div className={classes.buttonSortContainer}>
              <div className={classes.buttonSort}>
                <Icons
                  icon={Icon.sortAsc}
                  size={theme.icon.large}
                  color={ColorsTest.black}
                />
              </div>
              <div className={classes.buttonSort}>
                <Icons
                  icon={Icon.sortDesc}
                  size={theme.icon.large}
                  color={ColorsTest.black}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Formix>
  );
};
