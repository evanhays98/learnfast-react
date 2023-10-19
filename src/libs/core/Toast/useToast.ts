import { toast } from 'react-toastify';

const defaultErrorMessage = 'Une erreur est survenue';

export const useToast = () => {
  const saved = (message: string) => {
    toast.success(message || 'Message has been saved.');
  };

  const error = (message: string) => {
    toast.error(message || defaultErrorMessage);
  };

  const warning = (message: string) => {
    toast.warning(message);
  };

  const info = (message: string) => {
    toast.info(message);
  };

  return {
    saved,
    error,
    warning,
    info,
  };
};