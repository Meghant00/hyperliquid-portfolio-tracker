import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

interface PrimaryDialogProps extends ComponentPropsWithoutRef<"dialog"> {
  isOpen: boolean;
}

const PrimaryDialog = ({ children, isOpen, onClose }: PrimaryDialogProps) => {
  const dialogRef = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      onClose?.(event);
    }
  };

  return (
    <dialog
      className="dialog tw:w-full tw:h-full tw:bg-transparent tw:flex tw:flex-col tw:items-center tw:justify-center tw:focus:outline-none"
      ref={dialogRef}
      onCancel={onClose}
      onClick={handleBackdropClick}
    >
      {children}
    </dialog>
  );
};

export default PrimaryDialog;
