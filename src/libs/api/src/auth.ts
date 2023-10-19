import { useMutation, useQuery, useQueryClient } from 'react-query';
import { queryCreate, queryGet } from './fetch';
import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { CreateUser, LoginUser, User, UserAccessToken } from '../../dtos';

export const useLogout = () => {
  const queryClient = useQueryClient();

  const onLogout = useCallback(async () => {
    await queryClient.invalidateQueries();
    queryClient.removeQueries();
    localStorage.removeItem('userToken');
    window.location.replace('/#/login');
  }, [queryClient]);

  return { mutate: onLogout };
};

export const useMe = () => {
  const queryClient = useQueryClient();

  return useQuery<User, AxiosError>(['users', 'me'], queryGet('/users/me'), {
    staleTime: 100000 * 60, // 100 minutes
    enabled: !!localStorage.getItem('userToken'),
    onSuccess: (data) => {
      queryClient.setQueryData(['users', data.id], data);
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation<UserAccessToken, AxiosError, LoginUser>(
    queryCreate(`/auth/login`),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['users', data.id], data.userInfo);
        queryClient.setQueryData(['users', 'me'], data.userInfo);
      },
    },
  );
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation<UserAccessToken, undefined, CreateUser>(
    queryCreate(`/auth/register`),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['users', data.id], data.userInfo);
        queryClient.setQueryData(['users', 'me'], data.userInfo);
      },
    },
  );
};
