import { useMutation } from 'react-query';
import { CreateFieldTranslation, FieldTranslation } from '../dtos';
import { AxiosError } from 'axios';
import { queryCreate, queryUpdate } from './fetch';

export const useUpdateFieldTranslation = (id?: string) => {
  return useMutation<FieldTranslation, AxiosError, CreateFieldTranslation>(
    queryUpdate(`/fields-translation/${id}`),
  );
};

export const useCreateFieldTranslation = () => {
  return useMutation<FieldTranslation, AxiosError, CreateFieldTranslation>(
    queryCreate(`/fields-translation`),
  );
};
