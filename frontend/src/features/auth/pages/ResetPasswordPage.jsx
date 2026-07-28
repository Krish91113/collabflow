import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/ui/Button.jsx';
import { usePageTitle } from '../../../hooks/usePageTitle.js';
import { useToast } from '../../../hooks/useToast.js';
import { AuthErrorAlert } from '../components/AuthErrorAlert.jsx';
import { AuthLayout } from '../components/AuthLayout.jsx';
import { PasswordField } from '../components/PasswordField.jsx';
import { resetPasswordSchema } from '../schemas/authSchemas.js';

export function ResetPasswordPage() {
  usePageTitle('Reset Password');
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  async function handleResetPassword() {
    showToast({
      title: 'Reset password is not connected yet',
      description: 'The backend does not currently expose a reset password endpoint.',
      tone: 'info',
    });
  }

  return (
    <AuthLayout backTo="/login" subtitle="Set a new password once reset-token handling exists on the API." title="Reset your CollabFlow password.">
      <form className="w-full max-w-md" onSubmit={handleSubmit(handleResetPassword)}>
        <h2 className="text-xl font-semibold text-cf-text">Choose a new password</h2>
        <p className="mt-1 text-sm text-cf-muted">No reset token is sent to the backend until the route exists.</p>
        <div className="mt-5">
          <AuthErrorAlert title="API unavailable" message="No backend reset-password route was found." />
        </div>
        <div className="mt-5">
          <PasswordField disabled={isSubmitting} error={errors.password?.message} label="New password" registration={register('password')} />
        </div>
        <div className="mt-4">
          <PasswordField
            disabled={isSubmitting}
            error={errors.confirmPassword?.message}
            label="Confirm new password"
            registration={register('confirmPassword')}
          />
        </div>
        <Button className="mt-6 w-full" disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Checking...' : 'Reset password'} <KeyRound size={16} />
        </Button>
      </form>
    </AuthLayout>
  );
}
