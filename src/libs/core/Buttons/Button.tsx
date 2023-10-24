import classnames from 'classnames';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { Colors, theme, Theme } from '../../theme';
import { Link } from 'react-router-dom';
import { Icon, Icons } from '../Icons';

const useStyles = createUseStyles<
  string,
  { line: boolean; bgColor: Colors; color: Colors },
  any
>((theme: Theme) => ({
  blockColor: (props) => ({
    background: `${
      props.line ? theme.colors.transparent : theme.colors[props.bgColor]
    }`,
    minWidth: !props.line && theme.marginBase * 10,
    borderRadius: theme.borderRadius.std,
    ...theme.fonts.label,
    color: props.line ? theme.colors.lightGray : theme.colors[props.color],
    textDecoration: props.line ? 'underline' : 'none',
    fontWeight: 'bold',
    display: 'flex',
    border: 0,
    cursor: 'pointer',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    padding: !props.line
      ? theme.marginBase
      : [theme.marginBase / 4, theme.marginBase],
    gap: !props.line ? theme.marginBase * 2 : theme.marginBase,
    backdropFilter: props.line ? 'none' : 'blur(10px)',
    transition: 'all 0.3s ease-in-out',
  }),
  full: {
    width: '100%',
  },
  square: {
    width: theme.marginBase * 5,
    height: theme.marginBase * 5,
    minWidth: `${theme.marginBase * 5}px !important`,
    padding: 0,
  },
  disabled: {
    opacity: 0.5,
  },
}));

interface BaseButtonProps {
  className?: string;
  bgColor?: Colors; // Change to your Colors type
  color?: Colors; // Change to your Colors type
  iconColor?: string; // Change to your Colors type
  text?: string;
  children?: React.ReactNode;
  full?: boolean;
  icon?: Icon; // Change to your Icon type
  line?: boolean;
  square?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface AProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

type GenericButtonProps = ButtonProps | LinkProps | AProps;

export const Button = (props: BaseButtonProps & GenericButtonProps) => {
  const {
    full,
    line,
    icon,
    color,
    bgColor,
    square,
    className,
    disabled,
    onClick,
    type,
    ...rest
  } = props;
  const classes = useStyles({
    line: line || false,
    theme,
    bgColor: bgColor || 'brownGradiant',
    color: color || 'lightGray',
  });

  let ButtonComp: any = 'button';

  if ('to' in props) {
    ButtonComp = (lprops: any) => <Link to={props.to} {...lprops} />;
  }

  if ('href' in props) {
    ButtonComp = 'a';
  }

  return (
    <ButtonComp
      className={classnames(
        classes.blockColor,
        {
          [classes.full]: full,
          [classes.line]: line,
          [classes.square]: square,
          [classes.disabled]: disabled,
        },
        className,
      )}
      onClick={disabled ? undefined : onClick}
      onSubmit={disabled ? undefined : onClick}
      type={disabled ? 'button' : type}
      {...rest}
    >
      {props.children}
      {props.text && props.text}
      {icon && <Icons icon={icon} size={square ? 24 : 20} />}
    </ButtonComp>
  );
};
