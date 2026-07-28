import { AlertTriangle } from 'lucide-react';

export function AuthErrorAlert({ title = 'Authentication issue', message }) {
  if (!message) {
    return null;
  }

  return (
    <div className="rounded-cf border border-cf-danger/20 bg-cf-dangerSoft px-3 py-3 text-cf-danger">
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 shrink-0" size={17} />
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-1 text-sm leading-5">{message}</p>
        </div>
      </div>
    </div>
  );
}
