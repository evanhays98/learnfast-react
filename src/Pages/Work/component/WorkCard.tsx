import React, { useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from '../../../libs/theme';
import { Button, Icon } from '../../../libs/core';
import classnames from 'classnames';
import { useVerificationWorkingCard, useWorkingCard } from '../../../libs/api/src';
import { WorkingCardHistoryEnums } from '../../../libs/enums';
import { Points } from './Points';

interface Props {
  workingCardId?: string;
  onFinish: () => void;
}

interface CutSentence {
  sentence: string;
  hide: boolean;
}

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  contentSentence: {
    ...theme.basicFlex,
    flexDirection: 'column',
    alignItems: 'left',
    gap: theme.marginBase * 2,
    padding: theme.marginBase * 2,
    borderRadius: theme.borderRadius.std,
    backgroundColor: theme.colors.transparentYellow,
    width: '100%',
  },
  content1: {
    textAlign: 'justify',
  },
  content: {
    display: 'flex',
    justifyContent: 'right',
  },
  content2: {
    display: 'flex',
    gap: theme.marginBase / 2,
    justifyContent: 'left',
    flexDirection: 'column',
    marginBottom: theme.marginBase,
  },
  translation: {
    ...theme.fonts.label,
    color: theme.colors.orange,
  },
  indication: {
    ...theme.fonts.caption,
    color: theme.colors.lightBeige,
  },
  text: {
    ...theme.fonts.caption,
    color: theme.colors.lightGray,
    display: 'inline',
  },
  request: {
    display: 'inline',
    position: 'relative',
    padding: 6,
    margin: theme.marginBase / 2,
  },
  requestReveal: {
    padding: 2,
    margin: 0,
  },
  hidContent: {
    ...theme.fonts.label,
    color: theme.colors.green,
    display: 'inline',
  },
  revealInput: {
    opacity: 0,
    transition: 'all 2s ease',
  },
  input: {
    ...theme.fonts.label,
    backgroundColor: theme.colors.lightGray,
    textAlign: 'center',
    color: theme.colors.black,
    width: '100%',
    position: 'absolute',
    borderRadius: theme.borderRadius.std,
    top: 2,
    left: 0,
    opacity: 1,
    outline: 'none',
    border: 'none',
  },
  hideContentError: {
    color: theme.colors.red,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export const WorkCard = ({ workingCardId, onFinish }: Props) => {

  const classes = useStyles({ theme });
  const { data: workingCard } = useWorkingCard(workingCardId);
  const [value, setValue] = useState('');
  const [reveal, setReveal] = useState(false);
  const [miss, setMiss] = useState(false);
  const fieldTranslation = workingCard?.card?.fieldTranslation;
  const { mutateAsync: verificationWorkingCard } = useVerificationWorkingCard(workingCard?.id);
  const content: CutSentence[] = useMemo(() => {
    const cutSentence = fieldTranslation?.sentence?.split('//');
    const res: any[] = [];
    if (!cutSentence) {
      return [];
    }
    for (let i = 0; i < cutSentence.length; i++) {
      res.push({
        sentence: cutSentence[i],
        hide: i % 2 !== 0,
      });
    }
    return res;

  }, [fieldTranslation]);

  const onVerification = async (value: string) => {
    const answerWorkingCard = await verificationWorkingCard({ answer: value });
    const lastHistory = answerWorkingCard.history[answerWorkingCard.history.length - 1];
    if (lastHistory === WorkingCardHistoryEnums.MISS_ANSWER) {
      setMiss(true);
    }
    setReveal(true);
    setTimeout(() => {
      setReveal(false);
      setMiss(false);
      onFinish();
    }, 4000);
    setValue('');
    return false;
  };


  return (
    <div className={classes.contentSentence}>
      {workingCard &&
        <div className={classes.content}>
          <Points workingCard={workingCard} />
        </div>
      }
      <div className={classes.content1}>
        {content.map((item, index) => {
            if (item.hide) {
              return (
                <div className={classnames(classes.request, {
                  [classes.requestReveal]: reveal,
                })}>
                  <div className={classnames(classes.hidContent, {
                    [classes.hideContentError]: miss && reveal,
                  })}>
                    {item.sentence}
                  </div>
                  {!reveal &&
                    <input className={classnames(classes.input, {
                      [classes.revealInput]: reveal,
                    })} type='text' value={value}
                           onChange={(e) => {
                             setValue(e.target.value);
                           }} />
                  }
                </div>);
            }
            return <p className={classes.text}>{item.sentence}</p>;
          },
        )}
      </div>
      <div className={classes.content2}>
        <p className={classes.translation}>{fieldTranslation?.translation}</p>
        <p className={classes.indication}>{fieldTranslation?.information}</p>
      </div>
      <div className={classes.buttonContainer}>
        <Button text='dwa' icon={Icon.check} onClick={() => onVerification(value)} />
      </div>
    </div>
  );
};