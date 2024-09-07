// utils/toast.ts
import { toast } from 'next-toast';

export const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  toast(message, {
    type,
    duration: 3000,
    position: 'top-right',
    className: type === 'success' ? 'bg-green-500' : 'bg-red-500',
    style: { color: 'white' },
  });
};
