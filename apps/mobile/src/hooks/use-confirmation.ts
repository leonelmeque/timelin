import { useState, createElement } from 'react';
import { ConfirmModalView } from '../components/confirm-modal-view';

export const useConfirmation = ({
  onConfirm,
  onCancel,
  title,
  message,
  confirmText,
  cancelText,
}: {
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
}) => {
  const [visible, setVisible] = useState(false);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const handleConfirm = () => {
    onConfirm();
    hide();
  };

  const handleCancel = () => {
    onCancel();
    hide();
  };

  function Component() {
    return createElement(ConfirmModalView, {
      title,
      message,
      confirmText,
      cancelText,
      visible,
      onConfirm: handleConfirm,
      onCancel: handleCancel,
    });
  }

  return {
    ConfirmationDialog: Component,
    handleConfirm: show,
    handleCancel,
  };
};
