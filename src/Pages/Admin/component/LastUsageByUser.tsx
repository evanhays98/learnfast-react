import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme, theme } from 'src/libs/theme';
import { FilterHeader, SimpleTable } from '../../../libs/core';
import { lastUsageConfig, usePaginatedConfig } from '../../../libs/config';
import { PaginatedQueryParams } from '../../../libs/dtos';
import { useLastUsageUser } from '../../../libs/api';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({}));

export const LastUsageByUser = () => {
  const classes = useStyles({ theme });

  const { filterAndSortConfig } = usePaginatedConfig(lastUsageConfig);
  const [paginateQuery, setPaginateQuery] = useState<PaginatedQueryParams>({
    limit: 50,
    search: '',
    sortBy: [],
  });
  const {
    data: lastUsageByUser,
    fetchNextPage,
    hasNextPage,
  } = useLastUsageUser(paginateQuery);

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
