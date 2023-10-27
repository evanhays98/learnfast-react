import React from 'react';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from '../../../libs/theme';
import { Button, Input, useToast } from '../../../libs/core';
import * as Yup from 'yup';
import { Modal } from '../../../libs/core/Modal/Modal';
import { Form, Formik } from 'formik';
import { useCreateCard } from '../../../libs/api';
import { CardType } from '../../../libs/enums';

interface Props {
  setIsOpened: (value: boolean) => void;
  isOpened: boolean;
  chapterId: string;
}

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  workCard: {},
  translation: {
    color: theme.colors.orange,
  },
  indication: {
    color: '#cea3cd',
  },
  infoContainer: {
    ...theme.basicFlex,
    gap: theme.marginBase * 2,
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  modalContainer: {
    ...theme.basicFlex,
    gap: theme.marginBase * 3,
  },
}));

interface Values {
  sentence: string;
  translation: string;
  information: string;
}

const validationSchema = Yup.object().shape({
  sentence: Yup.string()
    .required('Required')
    .min(3, 'Too short')
    .test(
      'is-valid',
      'Sentence is not valid need to select an answer',
      async (value) => {
        return value?.split('//').length === 3;
      },
    ),
  translation: Yup.string().required('Required').min(3, 'Too short'),
  information: Yup.string().required('Required').min(3, 'Too short'),
});

const initialValues = {
  sentence: '',
  translation: '',
  information: '',
};

export const ModalCreateCard = ({
  setIsOpened,
  isOpened,
  chapterId,
}: Props) => {
  const classes = useStyles({ theme });
  const { mutateAsync: createCard } = useCreateCard();
  const toast = useToast();

  const submit = async (values: Values) => {
    try {
      await createCard({
        type: CardType.TRANSLATION,
        chapterId,
        field: values,
      });
      toast.saved('Card updated');
      setIsOpened(false);
    } catch (e) {
      toast.error("Can't update card");
    }
  };

  return (
    <Modal
      isOpen={isOpened}
      onRequestClose={() => {
        setIsOpened(false);
      }}
      title="Create Card"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        <Form>
          <div className={classes.modalContainer}>
            <Input textarea title="Sentence" name="sentence" />
            <Input title="Translation" name="translation" />
            <Input title="Indication" name="information" />
            <Button full type="submit" text="Create card" />
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};
