import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme, theme } from 'src/libs/theme';
import { FilterHeader, SimpleTable, useScrollToEnd } from '../../../libs/core';
import { lastUsageConfig, usePaginatedConfig } from '../../../libs/config';
import { PaginatedQueryParams } from '../../../libs/dtos';
import { useLastUsageUser } from '../../../libs/api';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({}));

export const LastUsageByUser = () => {
  const classes = useStyles({ theme });

  const { filterAndSortConfig } = usePaginatedConfig(lastUsageConfig);

  const isAtEnd = useScrollToEnd();

  const [paginateQuery, setPaginateQuery] = useState<PaginatedQueryParams>({
    limit: 4,
    search: '',
    sortBy: [],
  });
  const {
    data: lastUsageByUser,
    fetchNextPage,
    hasNextPage,
  } = useLastUsageUser(paginateQuery);

  useEffect(() => {
    (async () => {
      if (isAtEnd && hasNextPage) {
        await fetchNextPage();
      }
    })();
  }, [fetchNextPage, hasNextPage, isAtEnd]);

  return (
    <>
      <FilterHeader
        columnsNames={filterAndSortConfig}
        paginateQuery={paginateQuery}
        onFilter={(values) => {
          setPaginateQuery(values);
        }}
      />
      <SimpleTable pages={lastUsageByUser} />
    </>
  );
};
