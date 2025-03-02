import { toast } from 'sonner';

type ToastType = 'success' | 'error' | 'default';

export const showToast = (type: ToastType, message: string) => {
  switch (type) {
    case 'success':
      return toast.success(message);
    case 'error':
      return toast.error(message);
    case 'default':
    default:
      return toast(message);
  }
};
