import React from 'react';
import { createUseStyles } from 'react-jss';
import { AiFillPushpin, AiOutlineFolderAdd, AiOutlineHome } from 'react-icons/ai';
import { MdDelete, MdOutlineEdit, MdWorkOutline } from 'react-icons/md';
import { RiUser3Line } from 'react-icons/ri';
import { IoMdClose } from 'react-icons/io';
import { Colors, ColorsTest, Theme, theme } from '../theme';
import { BsCheck } from 'react-icons/bs';
import { IoSearch } from 'react-icons/io5';
import { BiAddToQueue, BiArrowToLeft, BiArrowToRight, BiArrowToTop } from 'react-icons/bi';
import { HiDotsVertical, HiSortAscending, HiSortDescending } from 'react-icons/hi';
import { FaFilter } from 'react-icons/fa';
import classnames from 'classnames';

const useStyles = createUseStyles<string, { size: number, color: Colors }, any>((theme: Theme) => ({
  container: {
    ...theme.basicFlex,
    padding: theme.marginBase / 2,
    borderRadius: theme.borderRadius.std,
  },
  active: {
    background: theme.colors.orange,
  },
  icon: props => ({
    fontSize: props.size,
    color: theme.colors[props.color],
    fontWeight: 700,
  }),
}));

export enum Icon {
  home,
  work,
  profile,
  close,
  check,
  pin,
  edit,
  addFolder,
  search,
  addCard,
  toTop,
  delete,
  dotsVertical,
  arrowLeft,
  arrowRight,
  sortAsc,
  sortDesc,
  filter,
}

interface Props {
  icon: Icon,
  size?: number,
  color?: Colors,
  className?: string,
}

export const Icons = ({ icon, size, color, className }: Props) => {
  const classes = useStyles({ size: size || theme.icon.large, color: color || ColorsTest.lightGray, theme });
  const classNames = classnames(classes.icon, className);
  return (
    <>
      {icon === Icon.home && <AiOutlineHome className={classNames} />}
      {icon === Icon.work && <MdWorkOutline className={classNames} />}
      {icon === Icon.profile && <RiUser3Line className={classNames} />}
      {icon === Icon.close && <IoMdClose className={classNames} />}
      {icon === Icon.check && <BsCheck className={classNames} />}
      {icon === Icon.pin && <AiFillPushpin className={classNames} />}
      {icon === Icon.edit && <MdOutlineEdit className={classNames} />}
      {icon === Icon.addFolder && <AiOutlineFolderAdd className={classNames} />}
      {icon === Icon.search && <IoSearch className={classNames} />}
      {icon === Icon.addCard && <BiAddToQueue className={classNames} />}
      {icon === Icon.toTop && <BiArrowToTop className={classNames} />}
      {icon === Icon.delete && <MdDelete className={classNames} />}
      {icon === Icon.dotsVertical && <HiDotsVertical className={classNames} />}
      {icon === Icon.arrowLeft && <BiArrowToLeft className={classNames} />}
      {icon === Icon.arrowRight && <BiArrowToRight className={classNames} />}
      {icon === Icon.sortAsc && <HiSortAscending className={classNames} />}
      {icon === Icon.sortDesc && <HiSortDescending className={classNames} />}
      {icon === Icon.filter && <FaFilter className={classNames} />}


    </>
  );
};