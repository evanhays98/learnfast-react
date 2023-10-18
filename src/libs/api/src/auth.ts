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
  return useMutation<UserAccessToken, undefined, LoginUser>(
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