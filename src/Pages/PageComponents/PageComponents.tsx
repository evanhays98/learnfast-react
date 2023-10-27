import classnames from 'classnames';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { Colors, ColorsTest, theme, Theme } from '../../libs/theme';
import {
  Button,
  Icon,
  Input,
  PageHeader,
  PageTitle,
  QuestionTranslationCard,
  TextArea,
} from 'src/libs/core';
import mapValues from 'lodash/mapValues';
import { CheckBox } from 'src/libs/core/Input/CheckBox';
import { SentenceInformation } from '../../libs/core/SentenceInformation';
import { Modal } from '../../libs/core/Modal/Modal';

const useStyles = createUseStyles((theme: Theme) => ({
  page: {
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: theme.marginBase * 6,
    flexDirection: 'column',
    padding: theme.marginBase,
    paddingBottom: theme.marginBase * 6,
  },
  h1: {
    ...theme.fonts.h1,
  },
  h2: {
    ...theme.fonts.h2,
  },
  h3: {
    ...theme.fonts.h3,
  },
  h4: {
    ...theme.fonts.h4,
  },
  h5: {
    ...theme.fonts.h5,
  },
  label: {
    ...theme.fonts.label,
  },
  caption: {
    ...theme.fonts.caption,
  },
  blockColorContainer: {
    ...theme.basicFlex,
  },
  blockColor: {
    width: 100,
    height: 100,
    borderRadius: theme.borderRadius.std,
    border: '1px solid grey',
  },
  boxContainer: {
    ...theme.basicFlex,
    width: '100%',
    borderRadius: theme.borderRadius.std,
    padding: theme.marginBase * 2,
    gap: theme.marginBase * 3,
  },
}));

const useColorStyle = createUseStyles((theme: Theme) => {
  return mapValues(theme.colors, (def) => ({
    background: def,
  }));
});

interface Values {
  color: Colors;
}

const BlockColor = ({ color }: Values) => {
  const classes = useStyles({ theme });
  const colorClasses = useColorStyle({ theme });

  return (
    <div className={classnames(classes.blockColor, colorClasses[color])} />
  );
};

export const PageComponents = () => {
  const classes = useStyles({ theme });
  const testPolice = 'Je suis un test';
  const [isOpened, setIsOpened] = React.useState(true);

  return (
    <>
      <PageHeader title="Anglais -> Francais" />
      <div className={classes.page}>
        <PageTitle text={'Components'} />
        <div className={classes.blockColorContainer}>
          <h1 className={classes.h1}>{testPolice}</h1>
          <h2 className={classes.h2}>{testPolice}</h2>
          <h3 className={classes.h3}>{testPolice}</h3>
          <h4 className={classes.h4}>{testPolice}</h4>
          <h5 className={classes.h5}>{testPolice}</h5>
          <p className={classes.label}>{testPolice}</p>
          <p className={classes.caption}>{testPolice}</p>
        </div>
        <div className={classes.blockColorContainer}>
          {Object.keys(theme.colors).map((res) => {
            return <BlockColor color={res as Colors} />;
          })}
        </div>
        <div className={classes.blockColorContainer}>
          <Button>hello</Button>
          <Button icon={Icon.profile} onClick={() => setIsOpened(true)}>
            hello
          </Button>
          <Button full={true}>hello</Button>
          <Button
            full={true}
            line={true}
            bgColor="transparent"
            color={ColorsTest.orange}
          >
            Send again
          </Button>
        </div>
        <div className={classes.blockColorContainer}>
          <div className={classes.boxContainer}>
            <h1 className={classes.h3}>INPUT</h1>
            <Input title={'Email'} name="email" />
            <TextArea title={'Description'} name="description" />
            <CheckBox title="test" name="test" />
          </div>
        </div>
        <div className={classes.blockColorContainer}>
          <QuestionTranslationCard
            translation="abreuvoir"
            points={2}
            sentence="The pigs were eating out of a {/{trough}\}."
            help="nom m"
          />
          <SentenceInformation title="je ne sais pas quoi mettre fkeos fkoesp kfpoe skop" />
        </div>
        <Modal
          isOpen={isOpened}
          onRequestClose={() => setIsOpened(false)}
          title="Update Chapter"
        />
      </div>
    </>
  );
};
