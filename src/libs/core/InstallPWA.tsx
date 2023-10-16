import React, { useEffect, useState } from 'react';

const PWAInstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: React.SetStateAction<any>) => {
      if (!event) {
        console.log('no event', event);
        return;
      }
      console.log('event', event);
      event.preventDefault();
      setDeferredPrompt(event);
      setShowButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult: { outcome: string; }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('PWA installation prompt accepted');
        } else {
          console.log('PWA installation prompt dismissed');
        }

        // Reset the deferredPrompt to null
        setDeferredPrompt(null);
        setShowButton(false);
      });
    }
  };

  return showButton ? (
    <button onClick={handleInstallClick}>
      Install PWA
    </button>
  ) : null;
};

export default PWAInstallButton;