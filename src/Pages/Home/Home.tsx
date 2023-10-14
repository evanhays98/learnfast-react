import React from 'react';
import { createUseStyles } from 'react-jss';
import { Theme, theme } from 'src/libs/theme';
import { Icon, Icons } from '../../libs/core';
import { Button } from 'src/libs/core/Buttons';
import { Modal } from '../../libs/core/Modal';
import { Form, Formik } from 'formik';
import Input from '../../libs/core/Input/Input';
import * as Yup from 'yup';
import { useChapters, useCreateChapter } from '../../libs/api/src/chapter';
import { useNavigate } from 'react-router-dom';


const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  globalContainer: {
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: theme.marginBase * 6,
    flexDirection: 'column',
    padding: theme.marginBase,
    paddingBottom: theme.marginBase * 6,
  },
  titleContainer: {
    ...theme.basicFlex,
    gap: theme.marginBase * 3,
  },
  title: {
    ...theme.fonts.h2,
    color: theme.colors.orange,
  },
  modalContainer: {
    ...theme.basicFlex,
    gap: theme.marginBase * 3,
  },
  chapterContainer: {
    ...theme.basicFlex,
    flexDirection: 'column',
    padding: theme.marginBase * 2,
    backgroundColor: theme.colors.transparentYellow,
    borderRadius: theme.borderRadius.std,
    gap: theme.marginBase * 2,
  },
  chapterTitle: {
    ...theme.fonts.h3,
  },
  chapterDesc: {
    ...theme.fonts.caption,
  },
}));

interface Values {
  title: string,
  description: string,
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Required').min(3, 'Too short'),
  description: Yup.string().required('Required').min(3, 'Too short'),
});


export const Home = () => {
  const classes = useStyles({ theme });
  const { mutateAsync: createChapter } = useCreateChapter();
  const { data: chapters } = useChapters();
  const navigate = useNavigate();
  const [isOpened, setIsOpened] = React.useState(false);
  const submit = async (values: Values) => {
    try {
      await createChapter(values);
      setIsOpened(false);
    } catch (e) {
      throw e;
    }
  };

  return (
    <div className={classes.globalContainer}>
      <div className={classes.titleContainer}>
        <h1 className={classes.title}>Chapters</h1>
        <Button square onClick={() => {
          setIsOpened(true);
        }
        }>
          <Icons icon={Icon.addFolder} size={theme.icon.normal + 8} />
        </Button>
      </div>
      {chapters?.map((chapter) => (
        <div key={chapter.id} className={classes.chapterContainer}>
          <h2 className={classes.chapterTitle}>{chapter.title}</h2>
          <p className={classes.chapterDesc}>{chapter.description}</p>
          <Button text='Work on this chapter' full onClick={
            () => {
              navigate('/chapter/' + chapter.id);
            }
          } />
        </div>
      ))}
      <Modal isOpen={isOpened} setIsOpen={setIsOpened} title='Add a chapter'>
        <Formik initialValues={{ title: '', description: '' }} onSubmit={submit}
                validationSchema={validationSchema}>
          <Form>
            <div className={classes.modalContainer}>
              <Input title='title' name='title' />
              <Input title='description' name='description' />
              <Button text='submit' type='submit' full />
            </div>
          </Form>
        </Formik>
      </Modal>
    </div>

  );
};
