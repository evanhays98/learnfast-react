import React, { useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { ColorsTest, Theme, theme } from '../../theme';

import { Icon } from '../Icons';
import { PointIndicator } from './PointIndicator';
import { Button } from '../Buttons/Button';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  container: {
    width: 580,
    ...theme.basicFlex,
    alignItems: 'flex-start',
    gap: theme.marginBase * 3,
    borderRadius: theme.borderRadius.std,
    boxShadow: theme.boxShadow.std,
    backgroundColor: theme.colors.transparentDarkGray,
    padding: theme.marginBase * 2,
  },
  header: {
    width: '100%',
    ...theme.basicFlex,
    justifyContent: 'space-between',
  },
  sentenceContainer: {
    width: '100%',
    ...theme.basicFlex,
    justifyContent: 'flex-start',
    gap: theme.marginBase,
  },
  sentence: {
    ...theme.fonts.label,
  },
  instructionContainer: {
    width: '100%',
    ...theme.basicFlex,
    justifyContent: 'space-between',
    gap: theme.marginBase * 2,
  },
  help: {
    ...theme.fonts.caption,
    color: theme.colors.lightBeige,
  },
  translation: {
    ...theme.fonts.label,
    color: theme.colors.orange,
  },
  buttonContainer: {
    ...theme.basicFlex,
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    justifySelf: 'flex-end',
    alignSelf: 'flex-end',
  },
}));

interface SentenceWrapped {
  first: string,
  word: string,
  last: string
}

interface Props {
  points: number,
  numberOfPoints?: number,
  sentence: string,
  translation: string,
  help?: string,
}

export const QuestionTranslationCard = ({ points, numberOfPoints = 5, help, translation, sentence }: Props) => {
  const classes = useStyles({ theme });

  const wrappedSentence = useMemo((): SentenceWrapped | null => {
    const regex = /{\/{(.*?)}\\}/;
    const match = sentence.match(regex);
    if (!match) {
      return null;
    }
    const startIndex = match.index || 0;
    const endIndex = startIndex + match[0].length;
    return {
      first: sentence.slice(0, startIndex),
      word: match[1],
      last: sentence.slice(endIndex),
    };
  }, [sentence]);

  if (!wrappedSentence) {
    return null;
  }


  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Button text='Mark as learn' line icon={Icon.check} bgColor={ColorsTest.transparentYellow}
                color={ColorsTest.lightBeige} iconColor={ColorsTest.lightBeige} />
        <PointIndicator points={points} maxPoints={numberOfPoints} />
      </div>
      <div className={classes.sentenceContainer}>
        <div className={classes.sentence}>{wrappedSentence.first}{wrappedSentence.word}{wrappedSentence.last}</div>
        <div className={classes.instructionContainer}>
          {help && <p className={classes.help}>help</p>}
          <p className={classes.translation}>{translation}</p>
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <Button className={classes.button} text='Valider' bgColor={ColorsTest.brownGradiant} />
      </div>
    </div>);
};