import { Card, LastUsageUser } from '../dtos';

interface Config {
  sortable: boolean;
  filterable: boolean;
  name: string;
}

type ColumnConfig<T> = {
  [K in keyof T]?: Config | ColumnConfig<T[K]> | never;
};

export interface FilterAndSortConfig {
  value: string;
  name: string;
  sortable: boolean;
  filterable: boolean;
}

export const cardConfig: ColumnConfig<Card> = {
  type: {
    sortable: true,
    filterable: true,
    name: 'Type',
  },
  createdAt: {
    sortable: true,
    filterable: true,
    name: 'Created At',
  },
  updatedAt: {
    sortable: true,
    filterable: true,
    name: 'Updated At',
  },
  fieldTranslation: {
    sentence: {
      sortable: true,
      filterable: true,
      name: 'Sentence',
    },
    translation: {
      sortable: true,
      filterable: true,
      name: 'Translation',
    },
    information: {
      sortable: true,
      filterable: true,
      name: 'Information',
    },
  },
};

export const lastUsageConfig: ColumnConfig<LastUsageUser> = {
  pseudo: {
    sortable: true,
    filterable: true,
    name: 'Pseudo',
  },
  lastUsage: {
    sortable: true,
    filterable: true,
    name: 'Last Usage',
  },
};

export const getFilterAndSortConfig = <T>(
  config: ColumnConfig<T>,
  defaultValue = '',
): FilterAndSortConfig[] => {
  const result: FilterAndSortConfig[] = [];
  for (const key in config) {
    const value = config[key];
    // check if value instanceof Config
    if (
      value &&
      value.hasOwnProperty('name') &&
      value.hasOwnProperty('sortable') &&
      value.hasOwnProperty('filterable')
    ) {
      const vals = value as Config;
      result.push({
        value: defaultValue === '' ? key : defaultValue + '.' + key,
        name: vals.name,
        sortable: vals.sortable,
        filterable: vals.filterable,
      });
    } else {
      const childResult = getFilterAndSortConfig(
        value as ColumnConfig<T>,
        defaultValue === '' ? key : defaultValue + '.' + key,
      );
      result.push(...childResult);
    }
  }
  return result;
};

export const usePaginatedConfig = (config: ColumnConfig<any>) => {
  return {
    config,
    filterAndSortConfig: getFilterAndSortConfig(config),
  };
};
