import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme, theme } from 'src/libs/theme';

const useStyles = createUseStyles((theme: Theme) => ({
  pageBackground: {
    position: 'relative',
    width: '100%',
    height: '100%',
    background: theme.colors.darkGradient,
    overflow: 'hidden',
    overscrollBehavior: 'none',
  },
}));

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const PageBackground = ({ children }: Props) => {
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
    <div
      className={classes.pageBackground}
      style={{
        height: elementHeight,
      }}
    >
      {children}
    </div>
  );
};
