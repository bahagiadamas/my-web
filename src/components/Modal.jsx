export default function Modal({
  show,
  message,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "No",
}) {
  if (!show) {
    return null;
  }
  return (
    <div className="modal-overlay bg-base-black/50 fixed inset-0 z-16 backdrop-blur-[4px] transition-all duration-500">
      <div className="modal-content bg-base-300 absolute top-1/2 left-1/2 flex w-[min(95%,600px)] -translate-1/2 flex-col items-center justify-center gap-2 rounded-lg p-4">
        <div className="modal-message my-2">
          <span>{message}</span>
        </div>
        <div className="modal-actions my-2 flex ml-auto gap-3">
          <button className="btn btn-outline" type="button" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="btn btn-error" type="button" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
