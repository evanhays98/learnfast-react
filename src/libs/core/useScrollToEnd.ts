import { useCallback, useEffect, useState } from 'react';

export const useScrollToEnd = () => {
  const [isAtEnd, setIsAtEnd] = useState<boolean>(false);

  const handleScroll = useCallback((container: HTMLElement | null) => {
    if (
      container?.offsetHeight &&
      container?.scrollTop &&
      container?.scrollHeight &&
      container.offsetHeight + container.scrollTop >=
        container.scrollHeight - 10
    ) {
      setIsAtEnd(true);
    } else {
      setIsAtEnd(false);
    }
  }, []);

  useEffect(() => {
    const container = document.getElementById('main-container');
    if (!container) {
      return;
    }
    const boundHandleScroll = () => handleScroll(container);
    container.addEventListener('scroll', boundHandleScroll);
    return () => {
      container.removeEventListener('scroll', boundHandleScroll);
    };
  }, [handleScroll]);

  return isAtEnd;
};
