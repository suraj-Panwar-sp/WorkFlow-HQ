import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import Button from "./Button";
import { closeModal } from "../../features/ui/uiSlice";

export default function ConfirmModal() {
  const dispatch = useDispatch();
  const { isOpen, type, payload } = useSelector((state) => state.ui.modal);

  if (type !== "confirm") return null;

  const handleConfirm = () => {
    payload?.onConfirm?.();
    dispatch(closeModal());
  };

  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal())} title={payload?.title || "Are you sure?"} size="sm">
      <p className="text-sm text-paper-100/70 mb-6">{payload?.message}</p>
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={() => dispatch(closeModal())}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          {payload?.confirmLabel || "Delete"}
        </Button>
      </div>
    </Modal>
  );
}
