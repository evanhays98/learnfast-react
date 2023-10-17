import React from 'react';
import { createUseStyles } from 'react-jss';
import { Theme, theme } from 'src/libs/theme';
import { Icon, Icons } from '../../libs/core';
import { Button } from 'src/libs/core/Buttons';
import { Modal } from '../../libs/core/Modal';
import { Form, Formik } from 'formik';
import Input from '../../libs/core/Input/Input';
import * as Yup from 'yup';
import { useChapters, useCreateChapter } from '../../libs/api/src';
import { ChapterInformation } from './component/ChapterInformation';
import PWAInstallButton from '../../libs/core/PWAInstallButton';


const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  globalContainer: {
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: theme.marginBase * 6,
    flexDirection: 'column',
    paddingBottom: theme.marginBase * 6,
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: theme.marginBase * 3,
    padding: theme.marginBase * 2,
    flexDirection: 'column',
    paddingBottom: theme.marginBase * 6,
  },
  titleContainer: {
    ...theme.basicFlex,
    gap: theme.marginBase,
    alignItems: 'flex-end',
    flexDirection: 'column',
    boxShadow: `0px 0px 50px -15px ${'rgba(30,1,30,0.75)'}`,
    padding: theme.marginBase,
    backdropFilter: 'blur(10px)',
    background: `-webkit-linear-gradient(180deg, ${'rgba(170,174,220,0.1)'} 0%, ${'rgba(79,105,171,0.1)'} 100%)`,
  },
  firstTitleContainer: {
    ...theme.basicFlex,
    width: '100%',
    gap: theme.marginBase * 3,
    justifyContent: 'space-between',
    padding: theme.marginBase,
  },
  title: {
    ...theme.fonts.h1,
    background: `-webkit-linear-gradient(100deg, ${'#EF706F'} 0%, ${'#c27437'} 100%)`,
    WebkitBackgroundClip: 'text',
    color: 'transparent',
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
    gap: theme.marginBase,
  },
  chapterTitle: {
    ...theme.fonts.h3,
  },
  chapterDesc: {
    ...theme.fonts.caption,
  },
  button: {
    background: `repeating-linear-gradient(45deg, ${'rgba(232,202,229,0.5)'} 0%, ${'rgba(225,185,218,0.5)'} 50%, ${'rgba(169,123,169,0.5)'} 100%)`,
    position: 'relative',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
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
        <div className={classes.firstTitleContainer}>
          <h1 className={classes.title}>Chapters</h1>
          <Button className={classes.button} square onClick={() => {
            setIsOpened(true);
          }}>
            <Icons icon={Icon.addFolder} size={theme.icon.normal + 8} />
          </Button>
        </div>
        <PWAInstallButton />
      </div>
      <div className={classes.container}>
        {chapters?.map((chapter) => (
          <ChapterInformation chapter={chapter} key={chapter.id} />
        ))}
      </div>
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
