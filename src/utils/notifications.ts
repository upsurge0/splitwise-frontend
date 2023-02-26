import { toast, ToastOptions } from "react-toastify";

export const toastify = (message: string, type: 'success' | 'error') => {
    const options:ToastOptions = {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    }

    type === 'success' ? toast.success(message, options) : toast.error(message, options);
  }
