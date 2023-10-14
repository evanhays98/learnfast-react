import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AnswerWorkingCard, WorkingCard } from '../../dtos';
import { AxiosError } from 'axios';
import { queryCreate, queryGet } from './fetch';

export const useWorkingCards = (id?: string) => {
  return useQuery<WorkingCard[], AxiosError>(
    ['working-cards', 'chapters', id],
    queryGet(`/working-cards/chapters/${id}`, {
      enabled: !!id,
    }),
  );
};

export const useVerificationWorkingCard = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation<WorkingCard, undefined, AnswerWorkingCard>(
    queryCreate(`/working-cards/verification/${id}`),
    {
      onSuccess: async (data) => {
        queryClient.invalidateQueries(['working-cards', data.id]);
      },
    },
  );
};

export const useWorkingCard = (id?: string) => {
  return useQuery<WorkingCard, AxiosError>(
    ['working-cards', id],
    queryGet(`/working-cards/${id}`, {
      enabled: !!id,
    }),
  );
};
