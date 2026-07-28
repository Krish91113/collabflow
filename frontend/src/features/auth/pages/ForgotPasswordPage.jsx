import { zodResolver } from '@hookform/resolvers/zod';
import { MailCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/ui/Button.jsx';
import { Input } from '../../../components/ui/Input.jsx';
import { usePageTitle } from '../../../hooks/usePageTitle.js';
import { useToast } from '../../../hooks/useToast.js';
import { AuthErrorAlert } from '../components/AuthErrorAlert.jsx';
import { AuthLayout } from '../components/AuthLayout.jsx';
import { forgotPasswordSchema } from '../schemas/authSchemas.js';

export function ForgotPasswordPage() {
  usePageTitle('Forgot Password');
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  async function handleForgotPassword() {
    showToast({
      title: 'Password reset is not connected yet',
      description: 'The backend does not currently expose a forgot password endpoint.',
      tone: 'info',
    });
  }

  return (
    <AuthLayout backTo="/login" subtitle="Request a reset link once the backend password recovery endpoint is available." title="Recover access to your workspace.">
      <form className="w-full max-w-md" onSubmit={handleSubmit(handleForgotPassword)}>
        <h2 className="text-xl font-semibold text-cf-text">Forgot password</h2>
        <p className="mt-1 text-sm text-cf-muted">This UI is ready; the API route is not present in the backend yet.</p>
        <div className="mt-5">
          <AuthErrorAlert title="API unavailable" message="No backend forgot-password route was found, so no reset email will be sent." />
        </div>
        <label className="mt-5 block">
          <span className="cf-label">Email</span>
          <Input className="mt-2" disabled={isSubmitting} placeholder="you@company.com" {...register('email')} />
          {errors.email ? <span className="mt-1 block text-xs text-cf-danger">{errors.email.message}</span> : null}
        </label>
        <Button className="mt-6 w-full" disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Checking...' : 'Continue'} <MailCheck size={16} />
        </Button>
        {isSubmitSuccessful ? <p className="mt-4 text-sm leading-5 text-cf-muted">No request was sent because the backend route is unavailable.</p> : null}
      </form>
    </AuthLayout>
  );
}
