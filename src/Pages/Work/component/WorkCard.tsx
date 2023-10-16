import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from '../../../libs/theme';
import { Button } from '../../../libs/core';
import classnames from 'classnames';
import { useVerificationWorkingCard, useWorkingCard } from '../../../libs/api/src';
import { WorkingCardHistoryEnums } from '../../../libs/enums';
import { Points } from './Points';
import { Form, Formik, FormikHelpers } from 'formik';

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
    background: `repeating-linear-gradient(${120}deg, ${'rgba(209,206,250,0.12)'} 0%, ${'rgba(182,179,227,0.04)'} 50%, ${'rgba(165,160,236,0.14)'} 100%)`,
    borderRadius: theme.borderRadius.std,
    boxShadow: `0px 0px 30px 0px ${'rgba(215,154,239,0.4)'}`,
    border: `1px solid ${'rgba(129,96,248,0.2)'}`,
    ...theme.basicFlex,
    flexDirection: 'column',
    alignItems: 'left',
    gap: theme.marginBase * 2,
    padding: theme.marginBase * 2,
    width: '100%',
  },
  content1: {
    textAlign: 'justify',
    marginTop: theme.marginBase * 2,
    marginBottom: theme.marginBase * 2,
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
    ...theme.fonts.caption2,
    color: '#cea3cd',
  },
  text: {
    ...theme.fonts.caption,
    color: theme.colors.lightGray,
    display: 'inline',
  },
  request: {
    display: 'inline',
    position: 'relative',
    padding: [4, 16],
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
    fontSize: 14,
    fontWeight: 600,
    backgroundColor: theme.colors.lightGray,
    textAlign: 'center',
    color: theme.colors.black,
    width: '100%',
    position: 'absolute',
    borderRadius: theme.borderRadius.std,
    top: 0,
    left: 0,
    opacity: 1,
    outline: 'none',
    border: 'none',
  },
  hideContentError: {
    color: theme.colors.red,
  },
  buttonContainer: {
    marginTop: theme.marginBase * 2,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.marginBase * 3,
  },
  button: {
    background: `repeating-linear-gradient(120deg, ${'rgba(211,166,234,0.5)'} 0%, ${'rgba(117,119,183,0.5)'} 50%, ${'rgba(229,131,72,0.5)'} 100%)`,
    border: `1px solid ${'rgba(239,112,111,0.05)'}`,
    position: 'relative',
    boxShadow: `0px 0px 10px 0px ${'rgba(189,112,220,0.75)'}`,
  },
  markAsLearn: {
    ...theme.fonts.label,
    fontWeight: 600,
    fontSize: 12,
    position: 'relative',
    border: `1px solid ${'rgba(239,112,111,0)'}`,
    background: `repeating-linear-gradient(120deg, ${'rgba(193,135,222,0.4)'} 0%, ${'rgba(106,147,187,0.4)'} 50%, ${'rgba(229,131,72,0.4)'} 100%)`,
    textDecoration: 'none',
    zIndex: 1,
    fontStyle: 'italic',
    '&::before': {
      content: '""',
      background: `rgba(13, 3, 38, 0.98)`,
      position: 'absolute',
      borderRadius: theme.borderRadius.std,
      top: 1,
      left: 1,
      right: 1,
      bottom: 1,
      zIndex: -1,
    },
  },
}));

interface Values {
  answer: string;
}

export const WorkCard = ({ workingCardId, onFinish }: Props) => {

  const classes = useStyles({ theme });
  const ref = useRef<HTMLInputElement | null>(null);
  const { data: workingCard } = useWorkingCard(workingCardId);
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


  const onVerification = async (values: Values, { resetForm }: FormikHelpers<Values>) => {
    const answerWorkingCard = await verificationWorkingCard({ answer: values.answer });
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
    resetForm();
    return false;
  };

  useEffect(() => {
    focusInput();
  }, [ref, workingCard]);

  const focusInput = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };


  return (
    <div className={classes.contentSentence}>
      <Formik initialValues={{ answer: '' }} onSubmit={onVerification}>
        {({ values: { answer }, setFieldValue }) => (
          <Form>
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
                          <input ref={ref} className={classnames(classes.input, {
                            [classes.revealInput]: reveal,
                          })} type='text' value={answer}
                                 onChange={async (e) => {
                                   await setFieldValue('answer', e.target.value);
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
              <Button className={classes.markAsLearn} text='Mark as learn' line />
              <Button className={classes.button} text='Submit' type='submit' />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};