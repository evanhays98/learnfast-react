import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from '../../../libs/theme';
import { Button, Icon } from '../../../libs/core';
import classnames from 'classnames';
import { useVerificationWorkingCard, useWorkingCard } from '../../../libs/api/src';
import { WorkingCardHistoryEnums } from '../../../libs/enums';
import { Points } from './Points';
import { Form, Formik, FormikHelpers, useFormikContext } from 'formik';

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
    <div className={classes.contentSentence} >
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
              <Button text='dwa' icon={Icon.check} type="submit" />
            </div>
        </Form>
      )}
    </Formik>
    </div>
  );
};