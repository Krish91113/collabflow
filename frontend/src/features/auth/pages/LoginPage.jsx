import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../../../components/ui/Button.jsx';
import { Input } from '../../../components/ui/Input.jsx';
import { usePageTitle } from '../../../hooks/usePageTitle.js';
import { useToast } from '../../../hooks/useToast.js';
import { AuthErrorAlert } from '../components/AuthErrorAlert.jsx';
import { AuthLayout } from '../components/AuthLayout.jsx';
import { PasswordField } from '../components/PasswordField.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { loginSchema } from '../schemas/authSchemas.js';

export function LoginPage() {
  usePageTitle('Login');
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { getError, loginMutation } = useAuth();
  const redirectTo = location.state?.from?.pathname || searchParams.get('redirect') || '/dashboard';
  const normalizedError = loginMutation.error ? getError(loginMutation.error) : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  async function handleLogin(values) {
    try {
      const response = await loginMutation.mutateAsync(values);
      if (response?.data?.user?.status === 'BLOCKED') {
        navigate('/account-locked', { replace: true });
        return;
      }
      navigate(redirectTo, { replace: true });
    } catch (error) {
      const apiError = getError(error);
      showToast({ title: 'Sign in failed', description: apiError.message, tone: 'error' });
      if (apiError.message === 'Invalid email or password') {
        navigate('/invalid-credentials', { replace: false });
      }
    }
  }

  return (
    <AuthLayout
      subtitle="Access your tasks, boards, team conversations, and workspace analytics from one structured surface."
      title="Sign in to keep work moving with your team."
    >
      <form className="w-full max-w-md" onSubmit={handleSubmit(handleLogin)}>
        <h2 className="text-xl font-semibold text-cf-text">Welcome back</h2>
        <p className="mt-1 text-sm text-cf-muted">Use your workspace credentials to continue.</p>
        <div className="mt-5">
          <AuthErrorAlert message={normalizedError?.message} title="Unable to sign in" />
        </div>
        <label className="mt-5 block">
          <span className="cf-label">Email</span>
          <Input className="mt-2" disabled={loginMutation.isPending} placeholder="you@company.com" {...register('email')} />
          {errors.email ? <span className="mt-1 block text-xs text-cf-danger">{errors.email.message}</span> : null}
        </label>
        <div className="mt-4">
          <PasswordField disabled={loginMutation.isPending} error={errors.password?.message} registration={register('password')} />
        </div>
        <div className="mt-3 flex items-center justify-between gap-4 text-sm">
          <Link className="font-medium text-cf-primary hover:text-cf-primaryContainer" to="/forgot-password">
            Forgot password?
          </Link>
          <Link className="font-medium text-cf-primary hover:text-cf-primaryContainer" to="/verify-email/pending">
            Verify email
          </Link>
        </div>
        <Button className="mt-6 w-full" disabled={loginMutation.isPending} type="submit">
          {loginMutation.isPending ? 'Signing in...' : 'Continue'} <ArrowRight size={16} />
        </Button>
        <p className="mt-5 text-center text-sm text-cf-muted">
          New to CollabFlow?{' '}
          <Link className="font-semibold text-cf-primary" to="/register">
            Create an account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
