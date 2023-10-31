import React, { useEffect, useState } from 'react';
import { CenteredLoader } from './CenteredLoader';
import { Icon, Icons } from './Icons';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from '../theme';

const useStyles = createUseStyles<string, { y: number; enable: boolean }, any>(
  (theme: Theme) => ({
    container: ({ y, enable }) => ({
      position: 'fixed',
      top: '0',
      right: '0',
      left: '0',
      zIndex: 100000,
      display: enable ? 'flex' : 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: enable ? y : 0,
      maxHeight: '100%',
      opacity: y === 100 ? 1 : y / 200,
      transition: y === 100 ? 'all 0.3s ease-in-out' : 'none',
    }),
    icon: ({ y }) => ({
      transform: `rotate(${200 + y * -2}deg)`,
      transition: y === 100 ? 'all 0.3s ease-in-out' : 'none',
      opacity: y === 100 ? 1 : y / 200,
    }),
    iconContainer: {
      background: 'rgba(14,6,47,0.2)',
      backdropFilter: 'blur(2px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
      borderRadius: '50%',
    },
  }),
);

const ScrollToRefresh = () => {
  const [showRefreshButton, setShowRefreshButton] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [y, setY] = useState(0);
  const [enable, setEnable] = useState(true);
  const [press, setPress] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [dateLastScroll, setDateLastScroll] = useState(0);
  const initialWindowHeight =
    document.getElementById('main-container')?.offsetTop || 0;
  const [test, setTest] = useState<any>(window.innerHeight);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  const classes = useStyles({ theme, y, enable });

  useEffect(() => {
    let intervalId: any = null;
    const mainContainer = document.getElementById('main-container');
    if (isScrolling) {
      intervalId = setInterval(() => {
        const diff = Date.now() - dateLastScroll;
        if (diff > 100) {
          setIsScrolling(false);
        }
      }, 20);
    }
    if (!isScrolling) {
      clearInterval(intervalId);
      if (mainContainer && mainContainer.scrollTop <= 0 && !press) {
        setEnable(true);
      }
    }

    const handleFocus = (e: any) => {
      const mainContainer = document.getElementById('main-container');
      if (!mainContainer) {
        return;
      }
      setTest(`${JSON.stringify(e)}`);
    };

    window.addEventListener('scroll', handleFocus, { passive: false });

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('scroll', handleFocus);
    };
  }, [dateLastScroll, press, isScrolling, initialWindowHeight]);

  useEffect(() => {
    const mainContainer = document.getElementById('main-container');

    const scroll = () => {
      if (!isScrolling) {
        setIsScrolling(true);
      }
      setDateLastScroll(Date.now());
    };

    if (mainContainer) {
      mainContainer.addEventListener('scroll', scroll);
    }

    return () => {
      if (mainContainer) {
        mainContainer.removeEventListener('scroll', scroll);
      }
    };
  }, [enable, isScrolling]);

  useEffect(() => {
    if (refresh) {
      return;
    }
    const mainContainer = document.getElementById('main-container');
    if (mainContainer && mainContainer.scrollTop < 100) {
      setRefresh(true);
      window.location.reload();
    }
  }, [refresh, showRefreshButton]);

  useEffect(() => {
    let isPressing = false;
    let pressY = 0;

    const handlePress = (e: TouchEvent) => {
      setPress(true);
      if (!enable) {
        return;
      }
      if (e.touches && e.touches.length > 0) {
        pressY = e.touches[0].clientY;
      }
      isPressing = true;
    };

    window.onload = () => {
      setShowRefreshButton(false);
      setRefresh(false);
    };

    const handleRelease = (e: TouchEvent) => {
      setPress(false);
      if (!enable) {
        return;
      }
      if (isPressing) {
        let releaseY = 0;
        if (e.changedTouches && e.changedTouches.length > 0) {
          releaseY = e.changedTouches[0].clientY;
        }

        const pressureDifference = Math.abs(releaseY - pressY);
        if (pressureDifference > 100) {
          setY(100);
          setTimeout(() => {
            setShowRefreshButton(true);
          }, 280);
        } else {
          setY(0);
        }
      }
    };

    const handleMove = (e: TouchEvent) => {
      if (!enable) {
        return;
      }
      if (!isSafari) {
        e.preventDefault();
      }
      let pressureDifference = 0;
      if (e.touches && e.touches.length > 0) {
        const moveY = e.touches[0].clientY;
        pressureDifference = moveY - pressY;
      }
      if (pressureDifference < 0) {
        setEnable(false);
        return;
      }
      if (enable) {
        setY(pressureDifference);
      }
    };

    document.addEventListener('touchstart', handlePress);

    document.addEventListener('touchmove', handleMove, {
      passive: !enable && !isSafari,
    });

    document.addEventListener('touchend', handleRelease);

    return () => {
      document.removeEventListener('touchstart', handlePress);

      document.removeEventListener('touchend', handleRelease);

      document.removeEventListener('touchmove', handleMove);
    };
  }, [enable, isSafari]);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: '50px',
          right: '10px',

          color: 'red',
          zIndex: 100000,
        }}
      >
        {test}
      </div>
      <div className={classes.container}>
        {showRefreshButton ? (
          <div>
            <CenteredLoader back />
          </div>
        ) : (
          <div className={classes.iconContainer}>
            {y > 1 && <Icons icon={Icon.load} className={classes.icon} />}
          </div>
        )}
      </div>
    </>
  );
};

export default ScrollToRefresh;
