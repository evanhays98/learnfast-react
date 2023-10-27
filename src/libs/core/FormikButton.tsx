import React, { useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from 'src/libs/theme';
import classnames from 'classnames';
import { FormikValues, useFormikContext } from 'formik';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  button: {
    outline: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    opacity: 0.6,
  },
  check: {
    opacity: 1,
  },
}));

interface Props {
  name: string;
  nameValue?: string;
  value: string | boolean;
  className?: string;
  children?: React.ReactNode;
}

export const FormikButton = ({
  name,
  nameValue,
  value,
  className,
  children,
}: Props) => {
  const classes = useStyles({ theme });
  const { setFieldValue, values } = useFormikContext<FormikValues>();

  const isCheck = useMemo(() => {
    const formikValue = values[name];
    if (nameValue && Array.isArray(formikValue)) {
      return formikValue.some(
        (item) => item[0] === nameValue && item[1] === value,
      );
    }
    if (typeof formikValue === 'string' || typeof formikValue === 'boolean') {
      return formikValue === value;
    }
    return false;
  }, [name, nameValue, value, values]);

  return (
    <button
      type="button"
      className={classnames(
        classes.button,
        {
          [classes.check]: isCheck,
        },
        className,
      )}
      onClick={async () => {
        const formikValue = values[name];
        if (nameValue && Array.isArray(formikValue)) {
          const item = formikValue.find((item) => item[0] === nameValue);
          const res = formikValue.filter((item) => item[0] !== nameValue);
          if (item && item[1] === value) {
            await setFieldValue(name, res);
          } else {
            await setFieldValue(name, [...res, [nameValue, value]]);
          }
        }
        if (typeof formikValue === 'string') {
          await setFieldValue(name, value);
        }
        if (typeof value === 'boolean') {
          if (formikValue === value) {
            await setFieldValue(name, undefined);
          } else {
            await setFieldValue(name, value);
          }
        }
      }}
    >
      {children}
    </button>
  );
};
