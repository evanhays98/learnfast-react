import React, { useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from '../../../libs/theme';
import {
  Button,
  Formix,
  Icon,
  Icons,
  Input,
  ModalDelete,
  useToast,
} from '../../../libs/core';
import { Card } from '../../../libs/dtos';
import * as Yup from 'yup';
import classnames from 'classnames';
import { useDeleteCard, useUpdateCard } from '../../../libs/api';
import { CardType } from '../../../libs/enums';

interface Props {
  card: Card;
}

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  workCard: {
    background: `repeating-linear-gradient(${120}deg, ${'rgba(209,206,250,0.12)'} 0%, ${'rgba(182,179,227,0.04)'} 50%, ${'rgba(165,160,236,0.14)'} 100%)`,
    borderRadius: theme.borderRadius.std,
    boxShadow: `0px 0px 20px 0px ${'rgba(215,154,239,0.18)'}`,
    border: `1px solid ${'rgba(129,96,248,0.1)'}`,
    ...theme.basicFlex,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.marginBase * 5,
    padding: [theme.marginBase * 2, theme.marginBase * 2],
    maxWidth: theme.marginBase * 70,
    margin: 0,
  },
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
  submitButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  },
  button: {
    background: `linear-gradient(90deg, ${'rgba(166,135,205,0.5)'} 0%, ${'rgba(97,224,206,0.5)'} 100%)`,
  },
  submitButton: {
    height: 0,
    opacity: 0,
    padding: 0,
    fontSize: 0,
    transition: 'all ease 0.3s',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginBottom: -theme.marginBase * 2,
  },
  buttonHeader: {
    ...theme.basicFlex,
    borderRadius: theme.borderRadius.std,
    boxShadow: `0px 0px 20px 0px ${'rgba(201,119,168,0.3)'}`,
    width: theme.marginBase * 5,
    height: theme.marginBase * 5,
  },
  iconDelete: {
    color: '#de4d80',
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
  translation: Yup.string().required('Required'),
  information: Yup.string().required('Required'),
});

export const UpdateFieldTranslation = ({ card }: Props) => {
  const classes = useStyles({ theme });
  const { mutateAsync: updateCard } = useUpdateCard(card.id);
  const { mutateAsync: deleteCard } = useDeleteCard(card.id, card.chapterId);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const toast = useToast();

  const initialValues = useMemo(
    () => ({
      sentence: card.fieldTranslation?.sentence,
      translation: card.fieldTranslation?.translation,
      information: card.fieldTranslation?.information,
    }),
    [card],
  );

  const valuesChanged = (values: Values) => {
    return (
      values.sentence !== card.fieldTranslation?.sentence ||
      values.translation !== card.fieldTranslation?.translation ||
      values.information !== card.fieldTranslation?.information
    );
  };

  const submit = async (values: Values) => {
    try {
      await updateCard({ field: values, type: CardType.TRANSLATION });
      toast.saved('Card updated');
    } catch (e) {
      toast.error("Can't update card");
    }
  };

  const onDelete = async () => {
    await deleteCard();
  };

  return (
    <>
      <Formix
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submit}
        className={classes.workCard}
      >
        {({ values }: any) => (
          <>
            <div className={classes.iconContainer}>
              <div
                className={classes.buttonHeader}
                onClick={() => {
                  setDeleteModalIsOpen(true);
                }}
              >
                <Icons icon={Icon.delete} className={classes.iconDelete} />
              </div>
            </div>
            <Input title="Sentence" name="sentence" textarea />
            <Input
              className={classes.translation}
              title="Translation"
              name="translation"
            />
            <Input
              className={classes.indication}
              title="Indication"
              name="information"
            />
            {valuesChanged(values) && (
              <div className={classes.submitButtonContainer}>
                <Button
                  type="submit"
                  text="Update card"
                  className={classnames(classes.button)}
                />
              </div>
            )}
          </>
        )}
      </Formix>
      <ModalDelete
        title="Delete Card"
        isOpened={deleteModalIsOpen}
        onRequestClose={() => {
          setDeleteModalIsOpen(false);
        }}
        onDelete={onDelete}
        message="Are you sure you want to delete this card? All person that was working on it will never see it again."
        toastSuccess="Card was deleted"
        toastWarning="Card was not deleted"
      />
    </>
  );
};
