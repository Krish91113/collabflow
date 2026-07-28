import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button.jsx';
import { Input } from '../../../components/ui/Input.jsx';
import { usePageTitle } from '../../../hooks/usePageTitle.js';
import { useToast } from '../../../hooks/useToast.js';
import { AuthErrorAlert } from '../components/AuthErrorAlert.jsx';
import { AuthLayout } from '../components/AuthLayout.jsx';
import { PasswordField } from '../components/PasswordField.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { registerSchema } from '../schemas/authSchemas.js';

export function RegisterPage() {
  usePageTitle('Register');
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { getError, registerMutation } = useAuth();
  const normalizedError = registerMutation.error ? getError(registerMutation.error) : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  async function handleRegister(values) {
    try {
      await registerMutation.mutateAsync(values);
      navigate('/welcome', { replace: true });
    } catch (error) {
      const apiError = getError(error);
      showToast({ title: 'Registration failed', description: apiError.message, tone: 'error' });
    }
  }

  return (
    <AuthLayout
      backTo="/login"
      subtitle="Create your account, then continue into the workspace onboarding flow."
      title="Start a structured workspace for focused collaboration."
    >
      <form className="w-full max-w-md" onSubmit={handleSubmit(handleRegister)}>
        <h2 className="text-xl font-semibold text-cf-text">Create account</h2>
        <p className="mt-1 text-sm text-cf-muted">The backend accepts name, email, and password only.</p>
        <div className="mt-5">
          <AuthErrorAlert message={normalizedError?.message} title="Unable to create account" />
        </div>
        <label className="mt-5 block">
          <span className="cf-label">Full name</span>
          <Input className="mt-2" disabled={registerMutation.isPending} placeholder="Maya Chen" {...register('name')} />
          {errors.name ? <span className="mt-1 block text-xs text-cf-danger">{errors.name.message}</span> : null}
        </label>
        <label className="mt-4 block">
          <span className="cf-label">Email</span>
          <Input className="mt-2" disabled={registerMutation.isPending} placeholder="you@company.com" {...register('email')} />
          {errors.email ? <span className="mt-1 block text-xs text-cf-danger">{errors.email.message}</span> : null}
        </label>
        <div className="mt-4">
          <PasswordField disabled={registerMutation.isPending} error={errors.password?.message} registration={register('password')} />
        </div>
        <div className="mt-4">
          <PasswordField
            disabled={registerMutation.isPending}
            error={errors.confirmPassword?.message}
            label="Confirm password"
            registration={register('confirmPassword')}
          />
        </div>
        <Button className="mt-6 w-full" disabled={registerMutation.isPending} type="submit">
          {registerMutation.isPending ? 'Creating account...' : 'Create account'} <ArrowRight size={16} />
        </Button>
        <p className="mt-5 text-center text-sm text-cf-muted">
          Already have an account?{' '}
          <Link className="font-semibold text-cf-primary" to="/login">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
