import { LockKeyhole, ShieldAlert, TimerReset } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { usePageTitle } from '../../../hooks/usePageTitle.js';
import { AuthLayout } from '../components/AuthLayout.jsx';
import { authStatusCopy } from '../utils/authStatus.js';

const icons = {
  locked: LockKeyhole,
  invalid: ShieldAlert,
  expired: TimerReset,
};

export function AuthStatePage() {
  const { state } = useParams();
  const location = useLocation();
  const pathState = location.pathname.includes('account-locked')
    ? 'locked'
    : location.pathname.includes('invalid-credentials')
      ? 'invalid'
      : 'expired';
  const resolvedState = state || pathState;
  const copy = authStatusCopy[resolvedState] || authStatusCopy.expired;
  const Icon = icons[resolvedState] || TimerReset;
  usePageTitle(copy.title);

  return (
    <AuthLayout backTo="/login" subtitle={copy.description} title={copy.title}>
      <div className="w-full max-w-md">
        <div className="flex h-12 w-12 items-center justify-center rounded-cf bg-cf-dangerSoft text-cf-danger">
          <Icon size={22} />
        </div>
        <h2 className="mt-5 text-xl font-semibold text-cf-text">{copy.title}</h2>
        <p className="mt-2 text-sm leading-6 text-cf-muted">{copy.description}</p>
        <Link
          className="mt-6 inline-flex h-10 w-full items-center justify-center rounded-cf bg-cf-primary px-4 text-sm font-semibold text-white transition hover:bg-cf-primaryContainer focus-visible:cf-focus"
          to="/login"
        >
          Return to sign in
        </Link>
      </div>
    </AuthLayout>
  );
}
