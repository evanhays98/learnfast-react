import React from 'react';
import { createUseStyles } from 'react-jss';
import { Theme, theme } from 'src/libs/theme';
import { Form, Formik, FormikValues, useFormikContext } from 'formik';
import { FormikConfig } from 'formik/dist/types';
import classnames from 'classnames';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  container: {
    ...theme.basicFlex,
    flexDirection: 'column',
    gap: theme.marginBase * 3,
    margin: theme.marginBase * 2,
  },
  error: {
    ...theme.fonts.caption,
    fontSize: theme.fonts.caption.fontSize - 1,
    paddingLeft: theme.marginBase + 2,
    paddingTop: theme.marginBase / 2,
    fontWeight: 600,
    color: '#de507b',
  },
}));

type FormikProps = FormikConfig<any>;

interface Props {
  className?: string;
  children:
    | React.ReactNode
    | ((props: Partial<FormikProps>) => React.ReactNode);
}

type GenericProps = Props & FormikProps;

export const FormixError = () => {
  const classes = useStyles({ theme });
  const { errors } = useFormikContext<FormikValues>();
  return (
    <>
      {errors.error && (
        <div className={classes.error}>{errors.error.toString()}</div>
      )}
    </>
  );
};

export const Formix = ({ className, children, ...rest }: GenericProps) => {
  const classes = useStyles({ theme });

  return (
    <Formik {...rest}>
      {(formikProps) => (
        <Form style={{ width: '100%' }}>
          <div className={classnames(classes.container, className)}>
            {typeof children === 'function' ? children(formikProps) : children}
          </div>
        </Form>
      )}
    </Formik>
  );
};
