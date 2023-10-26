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
  value: string;
  className?: string;
  children?: React.ReactNode;
}

export const FormikButton = ({ name, nameValue, value, className, children }: Props) => {
  const classes = useStyles({ theme });
  const { setFieldValue, values } = useFormikContext<FormikValues>();

  const isCheck = useMemo(() => {
    const formikValue = values[name];
    if (nameValue && Array.isArray(formikValue)) {
      return formikValue.some((item) => item[0] === nameValue && item[1] === value);
    }
    if (typeof formikValue === 'string') {
      return formikValue === value;
    }
    return false;
  }, [name, nameValue, value, values]);

  return (
    <button type='button' className={classnames(classes.button, {
      [classes.check]: isCheck,
    }, className)} onClick={() => {
      const formikValue = values[name];
      if (nameValue && Array.isArray(formikValue)) {
        const item = formikValue.find((item) => item[0] === nameValue);
        const res = formikValue.filter((item) => item[0] !== nameValue);
        if (item && item[1] === value) {
          setFieldValue(name, res);
        } else {
          setFieldValue(name, [...res, [nameValue, value]]);
        }
      }
      if (typeof formikValue === 'string') {
        setFieldValue(name, value);
      }

    }}>
      {children}
    </button>
  );
};
