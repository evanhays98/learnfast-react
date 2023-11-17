import { useInfiniteQuery } from 'react-query';
import { AxiosError } from 'axios';
import { queryGet } from '../api/fetch';

type Join<K, P> = K extends string
  ? P extends string
    ? `${K}${'' extends P ? '' : '.'}${P | `(${P}` | `${P})`}`
    : never
  : never;

type UnwrapArray<T> = T extends Array<infer U> ? UnwrapArray<U> : T;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ...0[]];

// unwrap Promise type
type UnwrapPromise<T> = T extends Promise<infer U> ? UnwrapPromise<U> : T;

export type Column<T, D extends number = 2> = [D] extends [never]
  ? never
  : T extends Record<string, any>
  ? {
      [K in keyof T]-?: K extends string
        ? T[K] extends Date
          ? `${K}`
          : T[K] extends Array<infer U>
          ? `${K}` | Join<K, Column<UnwrapArray<U>, Prev[D]>>
          : T[K] extends Promise<infer U>
          ? U extends Array<infer V>
            ? `${K}` | Join<K, Column<UnwrapArray<V>, Prev[D]>>
            : `${K}` | Join<K, Column<UnwrapPromise<U>, Prev[D]>>
          : `${K}` | Join<K, Column<T[K], Prev[D]>>
        : never;
    }[keyof T]
  : '';

export type Order<T> = [Column<T>, 'ASC' | 'DESC'];
export type SortBy<T> = Order<T>[];

export interface PaginatedResults<T> {
  data: T[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: SortBy<T>;
    searchBy: Column<T>[];
    search: string;
    select: string[];
    filter?: {
      [column: string]: string | string[];
    };
  };
  links: {
    first?: string;
    previous?: string;
    current: string;
    next?: string;
    last?: string;
  };
}

export interface PaginatedQueryParams {
  limit: number;
  search: string;
  sortBy: SortBy<any>;
}

export interface PaginatedParams {
  queryParams: PaginatedQueryParams;
  nextPageUrl: string;
}

export const computePaginationParams = (pageParams: PaginatedQueryParams) => {
  const { limit, search, sortBy } = pageParams;
  return `&limit=${limit}${search ? '&search=' + search : ''}${
    sortBy.length
      ? '&sortBy=' +
        sortBy.map(([column, order]) => `${column}:${order}`).join(',')
      : ''
  }`;
};

export const useCustomInfiniteQuery = <T>(
  queryKey: string[],
  path: string,
  pageParamsSelect: PaginatedQueryParams = {
    limit: 20,
    search: '',
    sortBy: [],
  },
  enabled?: boolean,
) => {
  const params = Object.entries(pageParamsSelect).reduce(
    (acc, [key, value]) => {
      if (key === 'page') {
        return acc;
      }
      return acc + '&' + key + '=' + value.toString();
    },
    '' as string,
  );
  return useInfiniteQuery<PaginatedResults<T>, AxiosError>(
    [...queryKey, params],
    async ({ pageParam }) => {
      let urlParams = `?page=1`;
      if (pageParam) {
        if (pageParam.queryParams === pageParamsSelect) {
          urlParams = pageParam.nextPageUrl;
        } else {
          urlParams += computePaginationParams(pageParamsSelect);
        }
      } else {
        urlParams += computePaginationParams(pageParamsSelect);
      }

      return await queryGet(`${path}${urlParams}`)();
    },
    {
      enabled,
      getNextPageParam: (lastPage): PaginatedParams | undefined => {
        if (!lastPage.links.next) {
          return undefined;
        }
        return {
          queryParams: pageParamsSelect,
          nextPageUrl: '?' + lastPage.links.next?.split('?')[1],
        };
      },
    },
  );
};
