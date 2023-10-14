import { useMutation, useQuery, useQueryClient } from 'react-query';
import { queryCreate, queryGet } from './fetch';
import { Chapter, CreateChapter } from '../../dtos';
import { AxiosError } from 'axios';


export const useCreateChapter = () => {
  const queryClient = useQueryClient();
  return useMutation<Chapter, undefined, CreateChapter>(
    queryCreate(`/chapters`),
    {
      onSuccess: async (data) => {
        queryClient.setQueryData(['chapters', data.id], data);
        await queryClient.invalidateQueries(['chapters']);
      },
    },
  );
};

export const useChapters = () => {
  const queryClient = useQueryClient();
  return useQuery<Chapter[], AxiosError>(
    ['chapters'],
    queryGet('/chapters'),
  );
};

export const useChapter = (id?: string) => {
  const queryClient = useQueryClient();
  return useQuery<Chapter, AxiosError>(
    ['chapters', id],
    queryGet(`/chapters/${id}`),
  );
};