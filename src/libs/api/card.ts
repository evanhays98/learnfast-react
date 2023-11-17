import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import {
  Card,
  computePaginationParams,
  CreateCard,
  PaginatedParams,
  PaginatedQueryParams,
  PaginatedResults,
  UpdateCard,
} from '../dtos';
import { AxiosError } from 'axios';
import { queryCreate, queryDelete, queryGet } from './fetch';

export const useCreateCard = () => {
  const queryClient = useQueryClient();
  return useMutation<Card, undefined, CreateCard>(queryCreate(`/cards`), {
    onSuccess: async (data) => {
      queryClient.setQueryData(['cards', data.id], data);
      await queryClient.invalidateQueries(['chapters', data.chapterId]);
    },
  });
};

export const useUpdateCard = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<Card, undefined, UpdateCard>(queryCreate(`/cards/${id}`), {
    onSuccess: async (data) => {
      queryClient.setQueryData(['cards', id], data);
      await queryClient.invalidateQueries(['chapters', data.chapterId]);
    },
  });
};

export const useDeleteCard = (id: string, chapterId: string) => {
  const queryClient = useQueryClient();
  return useMutation<{ chapterId: string }, AxiosError>(
    queryDelete(`/cards/${id}`),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['cards', id]);
        await queryClient.invalidateQueries(['chapters', chapterId]);
      },
    },
  );
};

export const useCards = (
  id?: string,
  pageParamsSelect: PaginatedQueryParams = {
    limit: 20,
    search: '',
    sortBy: [],
  },
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

      return await queryGet(`/chapters/${id}/cards${urlParams}`)();
    },
    {
      enabled: !!id,
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
