import { useMutation, useQuery, useQueryClient } from 'react-query';
import { queryCreate, queryGet } from './fetch';
import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { CreateUser, LoginUser, User } from '../../dtos';

export const useLogout = () => {
  const queryClient = useQueryClient();

  const onLogout = useCallback(async () => {
    await queryClient.invalidateQueries();
    queryClient.removeQueries();
    localStorage.removeItem('userToken');
    window.location.replace('/login');
  }, [queryClient]);

  return useMutation<void, AxiosError, void>(queryCreate(`/v2/auth/logout`), {
    onSuccess: onLogout,
    onError: onLogout,
  });
};

export const useMe = (allowAnonymous?: boolean) => {
  const queryClient = useQueryClient();
  const { mutate: logout } = useLogout();

  return useQuery<User, AxiosError>(
    ['users', 'me'],
    queryGet('/users/me'),
    {
      staleTime: 1000 * 60, // 1 min
      onSuccess: (data) => {
        queryClient.setQueryData(['users', data.id], data);
      },
      retry: (count, error) => {
        if (error.response && error.response.status === 401) {
          return false;
        }
        return count < 2;
      },
      onError: () => {
        if (!allowAnonymous) {
          logout();
        }
      },
    },
  );
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation<User, undefined, LoginUser>(
    queryCreate(`/auth/login`),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['users', data.id], data);
        queryClient.setQueryData(['auth', 'me'], data);
      },
    },
  );
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation<User, undefined, CreateUser>(
    queryCreate(`/auth/register`),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['users', data.id], data);
        queryClient.setQueryData(['auth', 'me'], data);
      },
    },
  );
};