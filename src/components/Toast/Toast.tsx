import { createContext, useContext, useState } from "react";

type toastType = "info" | "success" | "warning" | "error";

interface IToast {
  type: toastType;
  message: string;
  id: number;
  additionalClass?: string;
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

  const addToast = ({ message, type, duration = 5000 }: AddToastParameters) => {
    const toastId = Date.now();

    const toast: IToast = {
      message: message,
      type: type,
      id: toastId,
      additionalClass: "pop-up",
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
          toast.additionalClass = "pop-out";
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
      <div className="tw:w-fit tw:absolute tw:top-0 tw:left-1/2 -translate-x-1/2 tw:py-2 tw:flex tw:flex-col tw:items-center tw:justify-center tw:gap-3">
        {toasts.map((toast) => {
          return <Toast toast={toast} key={toast.id} />;
        })}
      </div>
    </ToastContext.Provider>
  );
};

const Toast = ({ toast }: { toast: IToast }) => {
  return (
    <div
      className={`-translate-x-1/2 tw:bg-black tw:rounded-lg tw:text-white tw:px-3 tw:py-2 tw:transition-all tw:duration-200 tw:ease-linear ${toast.additionalClass}`}
    >
      {toast.message} {toast.id}
    </div>
  );
};

export default ToastProvider;
