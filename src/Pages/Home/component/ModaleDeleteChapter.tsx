import React from 'react';
import { createUseStyles } from 'react-jss';
import { Theme, theme } from 'src/libs/theme';
import { Button } from 'src/libs/core/Buttons';
import { FormikHelpers } from 'formik';
import { Chapter } from '../../../libs/dtos';
import { Modal } from '../../../libs/core/Modal';
import {
  FormikButton,
  Formix,
  FormixError,
  useToast,
} from '../../../libs/core';
import { AxiosError } from 'axios';
import { useDeleteChapter } from '../../../libs/api';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  modalContainer: {
    ...theme.basicFlex,
    gap: theme.marginBase * 3,
  },
  text: {
    ...theme.fonts.caption,
    textAlign: 'justify',
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    gap: theme.marginBase * 3,
  },
  button: {
    background: '#fff',
    ...theme.fonts.label,
    padding: theme.marginBase,
    borderRadius: theme.borderRadius.std,
    flex: 1,
    color: 'black',
  },
}));

interface Values {
  validate: boolean | undefined;
}

interface Props {
  setIsOpened: (value: boolean) => void;
  isOpened: boolean;
  chapter: Chapter;
  onSuccess?: () => void;
}

const initialValues: Values = {
  validate: undefined,
};

export const ModalDeleteChapter = ({
  setIsOpened,
  isOpened,
  chapter,
  onSuccess,
}: Props) => {
  const classes = useStyles({ theme });
  const toast = useToast();
  const { mutateAsync: deleteChapter } = useDeleteChapter(chapter.id);

  const submit = async (values: Values, helpers: FormikHelpers<any>) => {
    try {
      if (typeof values?.validate === 'undefined') {
        helpers.setErrors({
          error: 'Choice is required',
        });
        return;
      }
      if (!values.validate) {
        toast.warning('Chapter was not deleted');
        setIsOpened(false);
        helpers.resetForm();
        return;
      } else {
        await deleteChapter();
        toast.saved('Chapter was deleted');
        setIsOpened(false);
        if (onSuccess) onSuccess();
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        helpers.setErrors({
          error: e.response?.data?.message || "Une erreur s'est produite",
        });
      }
      throw e;
    }
  };

  return (
    <Modal isOpen={isOpened} setIsOpen={setIsOpened} title="Delete chapter">
      <Formix
        initialValues={initialValues}
        onSubmit={submit}
        className={classes.modalContainer}
      >
        <p className={classes.text}>
          Are you sure you want to confirm the deletion of this chapter ?<br />{' '}
          It will delete all created cards and person will not be able to work
          on this chapter.
        </p>
        <div className={classes.buttonContainer}>
          <FormikButton name="validate" value={true} className={classes.button}>
            Yes
          </FormikButton>
          <FormikButton
            name="validate"
            value={false}
            className={classes.button}
          >
            No
          </FormikButton>
        </div>
        <FormixError />
        <Button text="submit" type="submit" full />
      </Formix>
    </Modal>
  );
};
