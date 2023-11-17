import React from 'react';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from 'src/libs/theme';
import { InfiniteData } from 'react-query';
import { PaginatedResults } from '../dtos';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.marginBase * 3,
    width: '100%',
  },
  containerRow: {
    width: '100%',
    background: `repeating-linear-gradient(${120}deg, ${'rgba(209,206,250,0.12)'} 0%, ${'rgba(182,179,227,0.1)'} 50%, ${'rgba(165,160,236,0.14)'} 100%)`,
    borderRadius: theme.borderRadius.std,
    boxShadow: `0px 0px 20px 0px ${'rgba(215,154,239,0.16)'}`,
    border: `1px solid ${'rgba(129,96,248,0.1)'}`,
    ...theme.basicFlex,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.marginBase,
    padding: [theme.marginBase * 2, theme.marginBase * 2],
    maxWidth: theme.marginBase * 70,
    margin: 0,
  },
  containerColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  columnName: {
    ...theme.fonts.label,
    color: theme.colors.orange,
  },
  columnValue: {
    ...theme.fonts.caption,
  },
  tableContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.marginBase * 3,
  },
}));

interface Props<T> {
  pages: InfiniteData<PaginatedResults<T>> | undefined;
}

export const SimpleTable = <T extends { [key: string]: any }>({
  pages,
}: Props<T>) => {
  const classes = useStyles({ theme });

  if (!pages) {
    return null;
  }

  const getValue = (value: any) => {
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      return date
        .toLocaleString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
        .replace(':', 'h');
    }
    if (typeof value === 'boolean') {
      return value ? 'true' : 'false';
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    if (typeof value === 'number') {
      return value.toString();
    }
    if (typeof value === 'string') {
      return value;
    }
    return '';
  };

  return (
    <div className={classes.container}>
      {pages.pages.map((page) => {
        return (
          <div key={page.meta.currentPage} className={classes.tableContainer}>
            {page.data.map((data) => {
              return (
                <div
                  className={classes.containerRow}
                  key={data['id'] || data['pseudo'] || JSON.stringify(data)}
                >
                  {Object.keys(data).map((key) => {
                    return (
                      <div className={classes.containerColumn} key={key}>
                        <div className={classes.columnName}>{key}</div>
                        <div className={classes.columnValue}>
                          {getValue(data[key])}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
