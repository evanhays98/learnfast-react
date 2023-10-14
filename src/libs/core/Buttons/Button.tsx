import classnames from 'classnames';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { Colors, theme, Theme } from '../../theme';
import { Link, LinkProps } from 'react-router-dom';
import { Icon, Icons } from '../Icons';

const useStyles = createUseStyles<string, { line: boolean, bgColor: Colors, color: Colors }, any>((theme: Theme) => ({
  blockColor: props => ({
    background: props.line ? theme.colors.transparent : theme.colors[props.bgColor],
    minWidth: !props.line && theme.marginBase * 10,
    borderRadius: theme.borderRadius.std,
    ...theme.fonts.label,
    color: props.line ? theme.colors.lightBeige : theme.colors[props.color],
    textDecoration: props.line ? 'underline' : 'none',
    fontWeight: 'bold',
    display: 'flex',
    border: 0,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    padding: !props.line ? theme.marginBase / 2 : [theme.marginBase / 4, theme.marginBase],
    gap: !props.line ? theme.marginBase * 2 : theme.marginBase,
  }),
  full: {
    width: '100%',
  },
  square: {
    width: theme.marginBase * 5,
    height: theme.marginBase * 5,
    minWidth: `${theme.marginBase * 5}px !important`,
  },
}));


interface Props {
  className?: string;
  bgColor?: Colors;
  color?: Colors;
  iconColor?: Colors;
  text?: string;
  children?: React.ReactNode;
  full?: boolean;
  icon?: Icon;
  line?: boolean;
  square?: boolean;
  sizeIcon?: number;
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface AProps extends React.LinkHTMLAttributes<HTMLLinkElement> {
  href: string;
}

export type GenericButtonProps = ButtonProps | LinkProps | AProps;


export const Button = (props: Props & GenericButtonProps) => {
  const classes = useStyles({
    line: props.line || false,
    theme,
    bgColor: props.bgColor || 'brownGradiant',
    color: props.color || 'lightGray',
  });
  let ButtonComp: any = 'button';
  if ('to' in props) {
    ButtonComp = (lprops: any) => <Link to={props.to} {...lprops} />;
  }
  if ('href' in props) {
    ButtonComp = 'a';
  }
  return <ButtonComp className={classnames(classes.blockColor, {
    [classes.full]: props.full,
    [classes.line]: props.line,
    [classes.square]: props.square,
  }, props.className)} {...props} >
    {props.children}
    {props.text && props.text}
    {props.icon && <Icons icon={props.icon} size={16} />}
  </ButtonComp>;
};
