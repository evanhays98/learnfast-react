import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from '../../libs/theme';

const useStyles = createUseStyles((theme: Theme) => ({
  page: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    background: 'red',
  },
}));

export const PageComponents = () => {
  const classes = useStyles({ theme });

  const [elementHeight, setElementHeight] = useState(
    window?.visualViewport?.height || window.innerHeight,
  );

  useEffect(() => {
    const handleResize = () => {
      // Calculate the new height (viewport height minus keyboard height)
      const newHeight = window?.visualViewport?.height || window.innerHeight;

      // Update the element's height
      setElementHeight(newHeight);
    };

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={classes.page} style={{ height: elementHeight }}>
      <p>jdihf hfioes hfiose hfio</p>
      <input type="text" />
      <p>{elementHeight}</p>
    </div>
  );
};
