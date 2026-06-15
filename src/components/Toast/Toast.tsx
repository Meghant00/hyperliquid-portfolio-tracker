import { createContext, useContext, useState } from "react";

type toastType = "info" | "success" | "warning" | "error";

interface IToast {
  type: toastType;
  message: string;
  id: number;
  isExiting?: boolean;
}

interface AddToastParameters {
  message: string;
  type: toastType;
  duration?: number;
}

interface IToastContext {
  toasts: IToast[];
  addToast: ({ message, type }: AddToastParameters) => void;
  removeToast: (toastId: number) => void;
}

const ToastContext = createContext<IToastContext | null>(null);

export const useToastContext = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("Toast should be inside Toast Provider");
  }

  return context;
};

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const addToast = ({ message, type, duration = 3000 }: AddToastParameters) => {
    const toastId = Date.now();

    const toast: IToast = {
      message: message,
      type: type,
      id: toastId,
    };

    setToasts((prevToasts) => [...prevToasts, toast]);

    setTimeout(() => {
      removeToast(toastId);
    }, duration);
  };

  const removeToast = (toastId: number) => {
    setToasts((prevToasts) =>
      prevToasts.map((toast) => {
        if (toast.id === toastId) {
          toast.isExiting = true;
        }

        return toast;
      }),
    );

    setTimeout(() => {
      setToasts((prevToasts) =>
        prevToasts.filter((toast) => toast.id !== toastId),
      );
    }, 200);
  };

  return (
    <ToastContext.Provider
      value={{ toasts: toasts, addToast: addToast, removeToast: removeToast }}
    >
      {children}
      <div className="tw:w-fit tw:absolute tw:top-0 tw:left-1/2 -translate-x-1/2 tw:py-2 tw:flex tw:flex-col tw:items-center tw:justify-center tw:gap-3 tw:transition-all tw:duration-150 tw:ease-linear">
        {toasts.map((toast) => {
          return <Toast toast={toast} key={toast.id} />;
        })}
      </div>
    </ToastContext.Provider>
  );
};

const Toast = ({ toast }: { toast: IToast }) => {
  let toastIconClass = "bx bx-check-circle";
  let toastIconColorClass = "tw:text-profit";

  switch (toast.type) {
    case "error":
      toastIconClass = "bx bx-x-circle";
      toastIconColorClass = "tw:text-loss";
      break;
    case "success":
      toastIconClass = "bx bx-check-circle";
      toastIconColorClass = "tw:text-profit";
      break;
    case "info":
      toastIconClass = "bx bx-info-circle";
      toastIconColorClass = "tw:text-blue-400";
      break;
    case "warning":
      toastIconClass = "bx bx-alert-triangle";
      toastIconColorClass = "tw:text-yellow-400";
      break;
    default:
      break;
  }

  return (
    <div
      className={`pop-up -translate-x-1/2 tw:bg-hyperliquid-gray-200 tw:rounded-lg tw:text-white tw:px-3 tw:py-2 tw:transition-all tw:duration-200 tw:ease-linear ${toast.isExiting && "pop-out"}`}
    >
      <div className="tw:w-fit tw:flex tw:flex-row tw:items-center tw:justify-start tw:gap-2">
        <i
          className={`${toastIconClass} ${toastIconColorClass} tw:text-lg`}
        ></i>

        <div className="tw:text-sm tw:text-white">{toast.message}</div>
      </div>
    </div>
  );
};

export default ToastProvider;
