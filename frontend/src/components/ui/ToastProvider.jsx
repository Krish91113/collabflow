import { useCallback, useMemo, useState } from 'react';
import { CheckCircle2, Info, TriangleAlert, X } from 'lucide-react';
import { ToastContext } from './toastContext.js';

const toneStyles = {
  success: 'border-cf-success/25 bg-cf-successSoft text-cf-success',
  error: 'border-cf-danger/25 bg-cf-dangerSoft text-cf-danger',
  info: 'border-cf-primary/25 bg-cf-primarySoft text-cf-primary',
};

const icons = {
  success: CheckCircle2,
  error: TriangleAlert,
  info: Info,
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((items) => items.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    ({ title, description, tone = 'info' }) => {
      const id = crypto.randomUUID();
      setToasts((items) => [...items, { id, title, description, tone }]);
      window.setTimeout(() => removeToast(id), 4500);
    },
    [removeToast],
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3">
        {toasts.map((toast) => {
          const Icon = icons[toast.tone] || Info;

          return (
            <div className={`rounded-panel border px-3 py-3 shadow-overlay ${toneStyles[toast.tone]}`} key={toast.id}>
              <div className="flex gap-3">
                <Icon className="mt-0.5 shrink-0" size={18} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{toast.title}</p>
                  {toast.description ? <p className="mt-1 text-sm leading-5 opacity-85">{toast.description}</p> : null}
                </div>
                <button
                  aria-label="Dismiss notification"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-cf hover:bg-white/50 focus-visible:cf-focus"
                  onClick={() => removeToast(toast.id)}
                  type="button"
                >
                  <X size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
