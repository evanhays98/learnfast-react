import React from 'react';
import { createUseStyles } from 'react-jss';
import {
  AiFillPushpin,
  AiOutlineFolderAdd,
  AiOutlineHome,
} from 'react-icons/ai';
import {
  MdDelete,
  MdOutlineAdminPanelSettings,
  MdOutlineEdit,
  MdWorkOutline,
} from 'react-icons/md';
import { RiUser3Line, RiUserFollowLine } from 'react-icons/ri';
import { IoMdClose } from 'react-icons/io';
import { Colors, ColorsTest, Theme, theme } from '../theme';
import { BsCardList, BsCheck } from 'react-icons/bs';
import { IoSearch } from 'react-icons/io5';
import {
  BiAddToQueue,
  BiArrowToLeft,
  BiArrowToRight,
  BiArrowToTop,
} from 'react-icons/bi';
import {
  HiDotsVertical,
  HiSortAscending,
  HiSortDescending,
} from 'react-icons/hi';
import { FaFilter } from 'react-icons/fa';
import classnames from 'classnames';
import { TbReload } from 'react-icons/tb';

const useStyles = createUseStyles<string, { size: number; color: Colors }, any>(
  (theme: Theme) => ({
    active: {
      background: theme.colors.orange,
    },
    icon: (props) => ({
      fontSize: props.size,
      color: theme.colors[props.color],
      fontWeight: 700,
      position: 'relative',
    }),
  }),
);

export enum Icon {
  home = 'home',
  work = 'work',
  profile = 'profile',
  close = 'close',
  check = 'check',
  pin = 'pin',
  edit = 'edit',
  addFolder = 'addFolder',
  search = 'search',
  addCard = 'addCard',
  toTop = 'toTop',
  delete = 'delete',
  dotsVertical = 'dotsVertical',
  arrowLeft = 'arrowLeft',
  arrowRight = 'arrowRight',
  sortAsc = 'sortAsc',
  sortDesc = 'sortDesc',
  filter = 'filter',
  follower = 'follower',
  card = 'card',
  load = 'load',
  admin = 'admin',
}

interface Props {
  icon: Icon;
  size?: number;
  color?: Colors;
  className?: string;
  style?: React.CSSProperties;
}

export const Icons = ({ icon, size, color, className, style }: Props) => {
  const classes = useStyles({
    size: size || theme.icon.large,
    color: color || ColorsTest.lightGray,
    theme,
  });
  const classNames = classnames(classes.icon, className);
  return (
    <>
      {icon === Icon.home && (
        <AiOutlineHome className={classNames} style={style} />
      )}
      {icon === Icon.work && (
        <MdWorkOutline className={classNames} style={style} />
      )}
      {icon === Icon.profile && (
        <RiUser3Line className={classNames} style={style} />
      )}
      {icon === Icon.close && (
        <IoMdClose className={classNames} style={style} />
      )}
      {icon === Icon.check && <BsCheck className={classNames} style={style} />}
      {icon === Icon.pin && (
        <AiFillPushpin className={classNames} style={style} />
      )}
      {icon === Icon.edit && (
        <MdOutlineEdit className={classNames} style={style} />
      )}
      {icon === Icon.addFolder && (
        <AiOutlineFolderAdd className={classNames} style={style} />
      )}
      {icon === Icon.search && (
        <IoSearch className={classNames} style={style} />
      )}
      {icon === Icon.addCard && (
        <BiAddToQueue className={classNames} style={style} />
      )}
      {icon === Icon.toTop && (
        <BiArrowToTop className={classNames} style={style} />
      )}
      {icon === Icon.delete && (
        <MdDelete className={classNames} style={style} />
      )}
      {icon === Icon.dotsVertical && (
        <HiDotsVertical className={classNames} style={style} />
      )}
      {icon === Icon.arrowLeft && (
        <BiArrowToLeft className={classNames} style={style} />
      )}
      {icon === Icon.arrowRight && (
        <BiArrowToRight className={classNames} style={style} />
      )}
      {icon === Icon.sortAsc && (
        <HiSortAscending className={classNames} style={style} />
      )}
      {icon === Icon.sortDesc && (
        <HiSortDescending className={classNames} style={style} />
      )}
      {icon === Icon.filter && (
        <FaFilter className={classNames} style={style} />
      )}
      {icon === Icon.follower && (
        <RiUserFollowLine className={classNames} style={style} />
      )}
      {icon === Icon.card && (
        <BsCardList className={classNames} style={style} />
      )}
      {icon === Icon.load && <TbReload className={classNames} style={style} />}
      {icon === Icon.admin && (
        <MdOutlineAdminPanelSettings className={classNames} style={style} />
      )}
    </>
  );
};
