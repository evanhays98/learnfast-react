import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from '../../../libs/theme';
import { Button } from '../../../libs/core';
import classnames from 'classnames';
import {
  useValidateWorkingCard,
  useVerificationWorkingCard,
  useWorkingCard,
} from '../../../libs/api';
import { WorkingCardHistoryEnums } from '../../../libs/enums';
import { Points } from './Points';
import { Form, Formik, FormikHelpers } from 'formik';

interface Props {
  workingCardId?: string;
  onFinish: () => void;
  lng: string;
  removeStartAnimation?: boolean;
}

interface CutSentence {
  sentence: string;
  hide: boolean;
}

const useStyles = createUseStyles<string, { width: number }, any>(
  (theme: Theme) => ({
    workCard: {
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
      maxWidth: theme.marginBase * 70,
      height: 'fit-content',
      position: 'relative',
      marginBottom: theme.marginBase * 8,
      '@media (min-width: 768px)': {
        margin: 'auto',
      },
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
      lineHeight: 1.8,
    },
    request: {
      display: 'inline',
      position: 'relative',
      transition: 'all .5s ease',
      padding: [2, 16],
      margin: theme.marginBase,
    },
    requestReveal: {
      padding: 2,
      margin: 2,
    },
    hidContent: {
      ...theme.fonts.label,
      color: theme.colors.green,
      display: 'inline',
    },
    revealInput: {
      opacity: 0,
      background: 'transparent',
    },
    input: {
      ...theme.fonts.label,
      transition: 'opacity .5s ease',
      opacity: 1,
      fontSize: 14,
      fontWeight: 600,
      backgroundColor: theme.colors.lightGray,
      textAlign: 'center',
      color: theme.colors.black,
      width: '100%',
      position: 'absolute',
      padding: 2,
      borderRadius: theme.borderRadius.std,
      top: 0,
      left: 0,
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
    animatedBlock: {
      transition: 'all 1s ease',
      opacity: 1,
      animationDuration: '.5s',
      animationTimingFunction: 'ease',
      animationFillMode: 'forwards',

      '&.hide': {
        animationName: '$disappear',
      },
    },

    '@keyframes appear': {
      '0%': {
        opacity: 1,
        transform: `translateX(100vw)`,
      },
      '100%': {
        opacity: 1,
        transform: `translateX(0)`,
      },
    },

    '@keyframes disappear': {
      '0%': {
        opacity: 1,
        transform: 'translateX(0px)',
      },
      '100%': {
        opacity: 1,
        transform: 'translateX(-100vw)',
      },
    },
    disappear: {
      animationName: '$disappear',
    },
    appear: {
      animationName: '$appear',
    },
  }),
);

interface Values {
  answer: string;
}

export const WorkCard = ({
  workingCardId,
  onFinish,
  lng,
  removeStartAnimation,
}: Props) => {
  const classes = useStyles({ theme, width: 450 });

  const ref = useRef<HTMLInputElement | null>(null);
  const reff = useRef<HTMLInputElement | null>(null);

  const [reveal, setReveal] = useState(false);
  const [miss, setMiss] = useState(false);
  const [appear, setAppear] = useState(false);
  const [disappear, setDisappear] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isRender, setIsRender] = useState(false);

  const { data: workingCard } = useWorkingCard(workingCardId);
  const { fieldTranslation } = workingCard?.card || {};
  const { mutateAsync: validateWorkingCard } =
    useValidateWorkingCard(workingCardId);
  const { mutateAsync: verificationWorkingCard } =
    useVerificationWorkingCard(workingCardId);

  const lang = useMemo(() => {
    const synth = window.speechSynthesis;
    const synthLang = synth ? synth.getVoices().map((voice) => voice.lang) : [];
    const normalizedLng = lng.replace(/[-_]/g, '');
    const matchedLang = synthLang.find(
      (lang) => lang.replace(/[-_]/g, '') === normalizedLng,
    );
    return matchedLang || null;
  }, [lng]);

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

  useEffect(() => {
    setIsRender(false);
  }, [content]);

  useEffect(() => {
    if (!isRender) {
      return;
    }
    setDisappear(false);
    setAppear(true);
    setTimeout(() => {
      setAppear(false);
      focusInput();
      setDisabled(false);
    }, 550);
  }, [isRender]);

  const beforeCheck = useCallback(() => {
    if (disabled) {
      return;
    }
    focusInput2();
    setDisabled(true);
  }, [disabled]);

  const afterCheck = useCallback(() => {
    const utterance = new SpeechSynthesisUtterance(
      fieldTranslation?.sentence.split('//').join(''),
    );
    utterance.voice =
      window.speechSynthesis.getVoices().find((voice) => voice.lang === lang) ||
      null;
    utterance.lang = lang || '';
    if (
      !lang ||
      !window.speechSynthesis ||
      !utterance ||
      !utterance.lang ||
      !utterance.voice
    ) {
      setTimeout(
        () => {
          setDisappear(true);
          setTimeout(() => {
            setReveal(false);
            setMiss(false);
            onFinish();
          }, 500);
        },
        (fieldTranslation?.sentence?.split(' ').length || 0) * 320 + 800,
      );
    } else {
      utterance.lang = lang;
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 300);
      utterance.onend = () => {
        setDisappear(true);
        setTimeout(() => {
          setReveal(false);
          setMiss(false);
          onFinish();
        }, 500);
      };
    }
  }, [lang, fieldTranslation, onFinish]);

  const onVerification = useCallback(
    async (values: Values, { resetForm }: FormikHelpers<Values>) => {
      beforeCheck();
      let answerWorkingCard = await verificationWorkingCard({
        answer: values.answer,
      });
      const lastHistory =
        answerWorkingCard.history[answerWorkingCard.history.length - 1];
      if (lastHistory === WorkingCardHistoryEnums.MISS_ANSWER) {
        setMiss(true);
      }
      setReveal(true);
      afterCheck();
      resetForm();
    },
    [afterCheck, beforeCheck, verificationWorkingCard],
  );

  const onValidate = async () => {
    beforeCheck();
    await validateWorkingCard();
    setReveal(true);
    afterCheck();
  };

  const focusInput = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const focusInput2 = () => {
    if (reff.current) {
      reff.current.focus();
    }
  };

  return (
    <div
      className={classnames(classes.workCard, classes.animatedBlock, {
        [classes.disappear]: disappear,
        [classes.appear]: appear && !removeStartAnimation,
      })}
    >
      <input
        style={{
          opacity: 0,
          position: 'absolute',
          top: 0,
          width: 0,
          height: 0,
        }}
        ref={reff}
        type="text"
      />
      <Formik initialValues={{ answer: '' }} onSubmit={onVerification}>
        {({ values: { answer }, setFieldValue, resetForm }) => (
          <Form>
            {workingCard && (
              <div className={classes.content}>
                <Points workingCard={workingCard} />
              </div>
            )}
            <div className={classes.content1}>
              {content.map((item, index) => {
                if (item.hide) {
                  return (
                    <div
                      key={item.sentence}
                      className={classnames(classes.request, {
                        [classes.requestReveal]: reveal,
                      })}
                    >
                      <div
                        className={classnames(classes.hidContent, {
                          [classes.hideContentError]: miss,
                        })}
                      >
                        {item.sentence}
                      </div>

                      <input
                        ref={ref}
                        style={{ opacity: `${reveal ? 0 : 1}` }}
                        className={classnames(classes.input, {
                          [classes.revealInput]: reveal,
                        })}
                        type="text"
                        value={reveal ? 'true' : answer}
                        onChange={async (e) => {
                          await setFieldValue('answer', e.target.value);
                        }}
                      />
                    </div>
                  );
                }
                return (
                  <p
                    key={item.sentence}
                    className={classes.text}
                    ref={(ref) => {
                      if (index === content.length - 1 && ref?.textContent) {
                        if (!isRender) {
                          setIsRender(true);
                        }
                      }
                    }}
                  >
                    {item.sentence}
                  </p>
                );
              })}
            </div>
            <div className={classes.content2}>
              <p className={classes.translation}>
                {fieldTranslation?.translation}
              </p>
              <p className={classes.indication}>
                {fieldTranslation?.information}
              </p>
            </div>
            <div className={classes.buttonContainer}>
              <Button
                disabled={disabled}
                className={classes.markAsLearn}
                type="button"
                text="Mark as learn"
                line
                onClick={async () => {
                  await onValidate();
                  resetForm();
                }}
              />
              <Button
                disabled={disabled}
                className={classes.button}
                text="Submit"
                type="submit"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
