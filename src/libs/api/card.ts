import { useInfiniteQuery } from 'react-query';
import { Card, computePaginationParams, PaginatedQueryParams, PaginatedResults } from '../dtos';
import { AxiosError } from 'axios';
import { queryGet } from './fetch';

interface PaginatedParams {
  queryParams: PaginatedQueryParams;
  nextPageUrl: string;
}

export const useCards = (id?: string, pageParamsSelect: PaginatedQueryParams = { limit: 20 }) => {
  const params = Object.entries(pageParamsSelect).reduce((acc, [key, value]) => {
    if (key === 'page') {
      return acc;
    }
    return acc + '&' + key + '=' + value.toString();
  }, '' as string);
  return useInfiniteQuery<PaginatedResults<Card>, AxiosError>(
    ['chapters', id, 'cards', params],
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

      return await queryGet(
        `/chapters/${id}/cards${urlParams}`,
      )();
    },
    {
      enabled: !!id,
      getNextPageParam: (lastPage): PaginatedParams | undefined => {
        if (!lastPage.links.next) {
          return undefined;
        }
        return { queryParams: pageParamsSelect, nextPageUrl: '?' + lastPage.links.next?.split('?')[1] };
      },

    },
  );
};