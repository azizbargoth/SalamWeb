import { toast } from "react-toastify";

const toastOptions = {
  position: "top-right",
  pauseOnHover: true,
  theme: "light",
  hideProgressBar: false,
  autoClose: 3000,
  draggable: false,
};

export const notefySuccess = (msg) => {
  toast.success(msg, {
      ...toastOptions,
    closeOnClick: false,
    // rtl: false,
    // pauseOnFocusLoss: false,
   
    // transition: "Bounce",
    progress:"undefined",
    className: "toast-success",
  });
};

export const notefyInfo = (msg) => {
  toast.success(msg, {
    ...toastOptions,
    hideProgressBar: false,
    // newestOnTop: false,
    closeOnClick: true,
    // rtl: false,
    // pauseOnFocusLoss: false,
    // draggable: true,
    // transition: "Bounce",
    progress : undefined,
    // className: "toast-info",
  });
};

export const notefyError = (msg) => {
  toast.success(msg, {
    ...toastOptions,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: false,
    rtl: false,
    pauseOnFocusLoss: false,
    // draggable: false,
    transition: "Bounce",
    className: "toast-error",
  });
};