import React from 'react';
import { createUseStyles } from 'react-jss';
import { Theme, theme } from 'src/libs/theme';
import { Button } from 'src/libs/core/Buttons';
import { FormikHelpers } from 'formik';
import { Modal } from '../../../libs/core/Modal';
import {
  FormikButton,
  Formix,
  FormixError,
  useToast,
} from '../../../libs/core';
import { AxiosError } from 'axios';

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
  title?: string;
  onRequestClose: () => void;
  isOpened: boolean;
  onDelete: () => Promise<void>;
  onSuccess?: () => void;
  toastSuccess?: string;
  toastWarning?: string;
  message: string;
}

const initialValues: Values = {
  validate: undefined,
};

export const ModalDelete = ({
  title,
  onRequestClose,
  isOpened,
  onDelete,
  onSuccess,
  toastWarning,
  toastSuccess,
  message,
}: Props) => {
  const classes = useStyles({ theme });
  const toast = useToast();

  const submit = async (values: Values, helpers: FormikHelpers<any>) => {
    try {
      if (typeof values?.validate === 'undefined') {
        helpers.setErrors({
          error: 'Choice is required',
        });
        return;
      }
      if (!values.validate) {
        if (toastWarning) toast.warning(toastWarning);
        onRequestClose();
        helpers.resetForm();
        return;
      } else {
        await onDelete();
        if (toastSuccess) toast.saved(toastSuccess);
        onRequestClose();
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
    <Modal
      isOpen={isOpened}
      onRequestClose={() => {
        onRequestClose();
      }}
      title={title}
    >
      <Formix
        initialValues={initialValues}
        onSubmit={submit}
        className={classes.modalContainer}
      >
        <p className={classes.text}>{message}</p>
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
