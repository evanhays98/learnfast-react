import React, { useEffect, useState } from 'react';
import { CenteredLoader } from './CenteredLoader';
import { Icon, Icons } from './Icons';

const ScrollToRefresh = () => {
  const [showRefreshButton, setShowRefreshButton] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [y, setY] = useState(0);

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
      e.preventDefault();
      let pressureDifference = 0;
      if (e.touches && e.touches.length > 0) {
        const moveY = e.touches[0].clientY;
        pressureDifference = moveY - pressY;
      }
      setY(pressureDifference);
    };

    document.addEventListener('touchstart', handlePress);

    document.addEventListener('touchmove', handleMove, { passive: false });

    document.addEventListener('touchend', handleRelease);

    return () => {
      document.removeEventListener('touchstart', handlePress);

      document.removeEventListener('touchend', handleRelease);

      document.removeEventListener('touchmove', handleMove);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        right: '0',
        left: '0',
        zIndex: 100000,
        backgroundColor: 'transparent',
        display: y !== 0 ? 'flex' : 'none',
        backdropFilter: 'blur(20px)',
        justifyContent: 'center',
        alignItems: 'center',
        height: y,
        maxHeight: '100%',
        opacity: y === 100 ? 1 : y / 200,
        transition: y === 100 ? 'all 0.3s ease-in-out' : 'none',
      }}
    >
      {showRefreshButton ? (
        <div>
          <CenteredLoader />
        </div>
      ) : (
        y > 1 && (
          <Icons
            icon={Icon.load}
            style={{
              transform: `rotate(${200 + y * -2}deg)`,
              transition: y === 100 ? 'all 0.3s ease-in-out' : 'none',
              opacity: y === 100 ? 1 : y / 200,
            }}
          />
        )
      )}
    </div>
  );
};

export default ScrollToRefresh;