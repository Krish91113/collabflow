import { MailCheck, RotateCcw } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../../../components/ui/Button.jsx';
import { usePageTitle } from '../../../hooks/usePageTitle.js';
import { useToast } from '../../../hooks/useToast.js';
import { AuthErrorAlert } from '../components/AuthErrorAlert.jsx';
import { AuthLayout } from '../components/AuthLayout.jsx';

const stateCopy = {
  pending: {
    eyebrow: 'Email verification',
    title: 'Check your inbox to verify your email.',
    body: 'Verification email delivery is not connected yet because no backend route was found.',
    alert: 'No verify-email or resend-verification backend route exists yet.',
  },
  verify: {
    eyebrow: 'Email verification',
    title: 'Verify your CollabFlow account.',
    body: 'This route is ready to consume a verification token once the backend supports it.',
    alert: 'No backend email verification route was found.',
  },
};

export function VerifyEmailPage() {
  const { state = 'verify' } = useParams();
  const copy = stateCopy[state] || stateCopy.verify;
  const { showToast } = useToast();
  usePageTitle('Verify Email');

  function handleResend() {
    showToast({
      title: 'Verification API unavailable',
      description: 'No resend-verification route exists in the backend yet.',
      tone: 'info',
    });
  }

  return (
    <AuthLayout backTo="/login" eyebrow={copy.eyebrow} subtitle={copy.body} title={copy.title}>
      <div className="w-full max-w-md">
        <div className="flex h-12 w-12 items-center justify-center rounded-cf bg-cf-primarySoft text-cf-primary">
          <MailCheck size={22} />
        </div>
        <h2 className="mt-5 text-xl font-semibold text-cf-text">Verification pending</h2>
        <p className="mt-2 text-sm leading-6 text-cf-muted">{copy.body}</p>
        <div className="mt-5">
          <AuthErrorAlert title="API unavailable" message={copy.alert} />
        </div>
        <Button className="mt-6 w-full" onClick={handleResend} type="button" variant="secondary">
          <RotateCcw size={16} />
          Resend verification email
        </Button>
        <Link className="mt-4 block text-center text-sm font-semibold text-cf-primary" to="/login">
          Return to sign in
        </Link>
      </div>
    </AuthLayout>
  );
}
