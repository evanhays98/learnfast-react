import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme, theme } from 'src/libs/theme';
import { Button, Icon, ModalDelete, ModalSide } from '../../../libs/core';
import classnames from 'classnames';
import { ModalUpdateChapter } from './ModalUpdateChapter';
import { Chapter } from '../../../libs/dtos';
import { useNavigate } from 'react-router-dom';
import { useDeleteChapter } from '../../../libs/api';

const colorEdit = (alpha = 1) => `rgb(113, 180, 201, ${alpha})`;
const colorDelete = (alpha = 1) => `rgb(204, 114, 154, ${alpha})`;

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: `linear-gradient(100deg, ${'rgba(15,7,28,0.5)'} 0%, ${'rgba(8,6,24,0.5)'} 100%)`,
  },
  buttonDelete: {
    borderRight: `2px solid ${colorDelete(0.2)}`,
    borderLeft: `2px solid ${colorDelete(0.2)}`,
    borderTop: `2px solid ${colorDelete(0.8)}`,
    borderBottom: `2px solid ${colorDelete(0.8)}`,
  },
  buttonEdit: {
    borderRight: `2px solid ${colorEdit(0.2)}`,
    borderLeft: `2px solid ${colorEdit(0.2)}`,
    borderTop: `2px solid ${colorEdit(0.8)}`,
    borderBottom: `2px solid ${colorEdit(0.8)}`,
  },
  iconEdit: {
    color: colorEdit(),
  },
  iconDelete: {
    color: colorDelete(),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.marginBase * 2,
    width: '100%',
    paddingTop: theme.marginBase * 2,
  },
}));

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  chapter: Chapter;
}

export const ModalEditChapter = ({ isOpen, setIsOpen, chapter }: Props) => {
  const classes = useStyles({ theme });
  const [openEditChapter, setOpenEditChapter] = useState(false);
  const [openDeleteChapter, setOpenDeleteChapter] = useState(false);
  const { mutateAsync: deleteChapter } = useDeleteChapter(chapter.id);
  const navigate = useNavigate();

  return (
    <div>
      <ModalSide isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className={classes.container}>
          <Button
            className={classnames(classes.button, classes.buttonEdit)}
            text="Edit chapter"
            onClick={() => {
              setOpenEditChapter(true);
            }}
            iconClassName={classes.iconEdit}
            icon={Icon.edit}
          />
          <Button
            className={classnames(classes.button, classes.buttonDelete)}
            text="Delete chapter"
            onClick={() => {
              setOpenDeleteChapter(true);
            }}
            icon={Icon.delete}
            iconClassName={classes.iconDelete}
          />
        </div>
      </ModalSide>
      <ModalUpdateChapter
        chapter={chapter}
        isOpened={openEditChapter}
        onRequestClose={() => {
          setOpenEditChapter(false);
        }}
        onSuccess={() => {
          setIsOpen(false);
        }}
      />
      <ModalDelete
        title="Delete chapter"
        onDelete={async () => {
          await deleteChapter();
        }}
        isOpened={openDeleteChapter}
        onRequestClose={() => setOpenDeleteChapter(false)}
        toastWarning="Chapter was not deleted"
        toastSuccess="Chapter was deleted"
        message="Are you sure you want to confirm the deletion of this chapter ?
          It will delete all created cards and person will not be able to work
          on this chapter."
        onSuccess={() => {
          setIsOpen(false);
          navigate('/');
        }}
      />
    </div>
  );
};
