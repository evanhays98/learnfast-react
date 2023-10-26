import { useMutation, useQuery, useQueryClient } from 'react-query';
import { queryCreate, queryGet, queryUpdate } from './fetch';
import { Chapter, CreateChapter, UpdateChapter } from '../dtos';
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

export const useUpdateChapter = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation<Chapter, AxiosError, UpdateChapter>(
    queryUpdate(`/chapters/${id}`),
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
  return useQuery<Chapter[], AxiosError>(['chapters'], queryGet('/chapters'), {
    enabled: !!queryClient.getQueryData(['users', 'me']),
  });
};

export const useLastChapterWorked = () => {
  const queryClient = useQueryClient();
  return useQuery<Chapter, AxiosError>(
    ['chapters', 'last-worked'],
    queryGet('/chapters/last-worked'),
    {
      enabled: !!queryClient.getQueryData(['users', 'me']),
    },
  );
};

export const useChapter = (id?: string) => {
  const queryClient = useQueryClient();
  return useQuery<Chapter, AxiosError>(
    ['chapters', id],
    queryGet(`/chapters/${id}`),
    {
      enabled: !!queryClient.getQueryData(['users', 'me']) && !!id,
    },
  );
};
