import React, { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from 'src/libs/theme';
import classnames from 'classnames';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  inputContainer: {
    width: '100%',
    position: 'relative',
    marginTop: theme.marginBase * 2,
    ...theme.basicFlex,
    transition: 'all ease-in-out 0.3s',
    borderLeft: ` solid 2px ${theme.colors.transparentDarkGray}`,
    borderRight: ` solid 2px ${theme.colors.transparentDarkGray}`,
    borderRadius: theme.borderRadius.std,
    borderBottom: `2px solid ${theme.colors.lightGray}50`,
    '&:focus-within': {
      borderBottom: `2px solid ${theme.colors.lightGray}`,
    },
  },
  eyeContainer: {
    padding: theme.marginBase / 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    bottom: 6,
    marginRight: 10,
  },
  eye: {
    fontSize: theme.icon.normal,
    color: theme.colors.lightGray,
  },
  input: {
    resize: 'none',
    outline: 'none',
    borderRadius: [theme.borderRadius.std, theme.borderRadius.std, 0, 0],
    backgroundColor: 'transparent',
    flex: 1,
    margin: 'auto',
    ...theme.fonts.caption,
    padding: theme.marginBase,
    height: 'fit-content',
    border: 'none',
    '&:focus + label': {
      top: -theme.marginBase * 3,
      left: 0,
      fontWeight: 700,
      color: '#a3d8db',
      transition: 'all ease-in-out 0.2s',
      paddingLeft: '1%',
    },
  },
  label: {
    position: 'absolute',
    left: '2%',
    ...theme.fonts.label,
    marginLeft: 0,
    top: 9,
    paddingLeft: theme.marginBase / 2,
    transition: 'all ease-in-out 0.2s',
    pointerEvents: 'none',
  },
  hasValue: {
    fontWeight: 700,
    color: '#a3d8db',
    top: -theme.marginBase * 3,
    left: 0,
    transition: 'all ease-in-out 0.2s',
    paddingLeft: '1%',
  },
  error: {
    ...theme.fonts.caption,
    fontSize: theme.fonts.caption.fontSize - 1,
    marginLeft: '2%',
    paddingLeft: theme.marginBase / 2,
    paddingTop: theme.marginBase / 2,
    fontWeight: 500,
    color: '#de507b',
  },
}));

interface Props {
  title?: string;
  name: string;
  value?: string;
  maxLength?: number;
  className?: string;
  rows?: number;
}

const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string,
) => {
  useEffect(() => {
    if (textAreaRef) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.style.height = '0px';
      const scrollHeight = textAreaRef.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.style.height = scrollHeight + 'px';
    }
  }, [textAreaRef, value]);
};

export const TextArea = ({
  title,
  className,
  name,
  value,
  rows = 1,
  maxLength = 200,
}: Props) => {
  const formik = useFormikContext<any>();
  const [val, setVal] = useState(formik.values[name] || value || '');
  const classes = useStyles({ theme });
  const ref = React.useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(ref.current, val);

  const handleValue = (e: any) => {
    setVal(e.value);
    formik.setFieldValue(name, e.value);
  };

  return (
    <div className={classes.inputContainer}>
      <textarea
        ref={ref}
        rows={rows}
        className={classnames(classnames(classes.input, className))}
        name={name}
        maxLength={maxLength}
        value={val}
        onChange={(e) => {
          handleValue(e.target);
        }}
      />
      {title && (
        <label
          className={classnames(classes.label, {
            [classes.hasValue]: val,
          })}
        >
          {title}
        </label>
      )}
    </div>
  );
};
