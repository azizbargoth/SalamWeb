import { toast } from "react-toastify";

export const notefySuccess = (msg) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: false,
    rtl: false,
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    theme: "light",
    transition: "Bounce",
    className: "toast-success",
  });
};

export const notefyInfo = (msg) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    // newestOnTop: false,
    closeOnClick: true,
    // rtl: false,
    // pauseOnFocusLoss: false,
    draggable: true,
    pauseOnHover: true,
    theme: "light",
    // transition: "Bounce",
    progress : undefined,
    // className: "toast-info",
  });
};

export const notefyError = (msg) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: false,
    rtl: false,
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    theme: "light",
    transition: "Bounce",
    className: "toast-error",
  });
};