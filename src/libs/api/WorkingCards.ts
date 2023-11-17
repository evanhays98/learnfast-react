import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  AnswerWorkingCard,
  LastUsageUser,
  PaginatedQueryParams,
  useCustomInfiniteQuery,
  WorkingCard,
} from '../dtos';
import { AxiosError } from 'axios';
import { queryCreate, queryGet } from './fetch';

export const useWorkingCards = (id?: string) => {
  const queryClient = useQueryClient();
  return useQuery<WorkingCard[], AxiosError>(
    ['working-cards', 'chapters', id],
    queryGet(`/working-cards/chapters/${id}`, {
      enabled: !!queryClient.getQueryData(['users', 'me']) && !!id,
    }),
  );
};

export const useVerificationWorkingCard = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation<WorkingCard, undefined, AnswerWorkingCard>(
    queryCreate(`/working-cards/verification/${id}`),
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(['working-cards', data.id]);
      },
    },
  );
};

export const useValidateWorkingCard = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation<WorkingCard, AxiosError>(
    queryCreate(`/working-cards/${id}/validate`),
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(['working-cards', data.id]);
      },
    },
  );
};

export const useWorkingCard = (id?: string) => {
  const queryClient = useQueryClient();
  return useQuery<WorkingCard, AxiosError>(
    ['working-cards', id],
    queryGet(`/working-cards/${id}`, {
      enabled: !!id && !!queryClient.getQueryData(['users', 'me']),
    }),
  );
};

export const useLastUsageUser = (pageParamSelect: PaginatedQueryParams) => {
  return useCustomInfiniteQuery<LastUsageUser>(
    ['working-cards', 'last-usage-user'],
    '/working-cards/last-usage-user/',
    pageParamSelect,
  );
};
