import { useToast } from "../state/toast/ToastContext.jsx";

const variantClass = {
  success: "text-bg-success",
  info: "text-bg-info",
  warning: "text-bg-warning",
  danger: "text-bg-danger"
};

export default function ToastHost() {
  const { toasts, removeToast } = useToast();

  return (
    <div
      className="toast-container position-fixed top-0 end-0 p-3"
      style={{ zIndex: 1080 }}
    >
      {toasts.map((t) => (
        <div key={t.id} className={`toast show ${variantClass[t.variant] ?? "text-bg-success"}`}>
          <div className="toast-header">
            <strong className="me-auto">{t.title ?? "Notification"}</strong>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => removeToast(t.id)}
            />
          </div>
          {t.message ? <div className="toast-body">{t.message}</div> : null}
        </div>
      ))}
    </div>
  );
}

