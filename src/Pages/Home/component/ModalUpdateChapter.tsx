import React, { useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme, theme } from 'src/libs/theme';
import { Button } from 'src/libs/core/Buttons';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useUpdateChapter } from '../../../libs/api';
import { Chapter } from '../../../libs/dtos';
import { Modal } from '../../../libs/core/Modal';
import { FormixError, Input, useToast } from '../../../libs/core';
import { AxiosError } from 'axios';


const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  modalContainer: {
    ...theme.basicFlex,
    gap: theme.marginBase * 3,
  },
}));

interface Values {
  title: string,
  description: string,
  lng: string,
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Required').min(3, 'Too short'),
  description: Yup.string().required('Required').min(3, 'Too short'),
  lng: Yup.string().required('Required').min(3, 'Too short'),
});

interface Props {
  setIsOpened: (value: boolean) => void,
  isOpened: boolean,
  chapter: Chapter,
}


export const ModalUpdateChapter = ({ setIsOpened, isOpened, chapter }: Props) => {
  const classes = useStyles({ theme });
  const { mutateAsync: updateChapter } = useUpdateChapter(chapter.id);
  const toast = useToast();

  const initialValues = useMemo(() => (
    {
      title: chapter.title,
      description: chapter.description,
      lng: chapter.lng,
    }
  ), [chapter]);

  const valueChanged = (values: Values) => {
    return values.title !== chapter.title || values.description !== chapter.description || values.lng !== chapter.lng;
  };

  const submit = async (values: Values, helpers: FormikHelpers<any>) => {
    try {
      await updateChapter(values);
      setIsOpened(false);
      toast.saved('Chapter updated');
    } catch (e) {
      if (e instanceof AxiosError && e?.code === '403') {
        helpers.setErrors({ error: e.response?.data?.message || 'Une erreur s\'est produite' });
      }
      throw e;
    }
  };

  return (

    <Modal isOpen={isOpened} setIsOpen={setIsOpened} title='Update chapter'>
      <Formik initialValues={initialValues} onSubmit={submit}
              validationSchema={validationSchema}>
        {({ values }) => (
          <Form>
            <div className={classes.modalContainer}>
              <Input title='title' name='title' />
              <Input title='description' name='description' textarea autoSize />
              <Input title='Lang' name='lng' />
              <FormixError />
              <Button text='submit' type='submit' full disabled={!valueChanged(values)} />
            </div>
          </Form>
        )}
      </Formik>
    </Modal>

  );
};
