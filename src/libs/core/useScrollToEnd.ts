import { useCallback, useEffect, useMemo, useState } from 'react';

export const useScrollToEnd = () => {
  const [isAtEnd, setIsAtEnd] = useState<boolean>(false);

  const container = useMemo(() => {
    return document.getElementById('main-container');
  }, []);

  const handleScroll = useCallback(() => {
    console.log(
      'container',
      container?.offsetHeight,
      container?.scrollTop,
      container?.scrollHeight,
    );
    if (
      container?.offsetHeight &&
      container?.scrollTop &&
      container?.scrollHeight &&
      container.offsetHeight + container.scrollTop >=
        container.scrollHeight - 10
    ) {
      setIsAtEnd(true);
    }
  }, [container]);

  useEffect(() => {
    if (!container) {
      return;
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [container, handleScroll]);

  return isAtEnd;
};
