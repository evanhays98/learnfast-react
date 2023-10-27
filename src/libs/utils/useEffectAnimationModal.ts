import { useEffect } from 'react';

interface Props {
  firstRender: boolean;
  setFirstRender: (value: boolean) => void;
  isOpen: boolean;
  isClosing: boolean;
  setIsClosing: (value: boolean) => void;
}

export const useEffectAnimationModal = ({
  firstRender,
  setFirstRender,
  isOpen,
  isClosing,
  setIsClosing,
}: Props) => {
  return useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }
    if (!isOpen && !isClosing && !firstRender) {
      setTimeout(() => {
        setIsClosing(false);
      }, 500);
    }
  }, [firstRender, isClosing, isOpen, setFirstRender, setIsClosing]);
};
