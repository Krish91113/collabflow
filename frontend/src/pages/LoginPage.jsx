import { zodResolver } from '@hookform/resolvers/zod';
import { Activity, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../components/ui/Button.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Panel } from '../components/ui/Panel.jsx';
import { setSession } from '../features/session/sessionSlice.js';
import { usePageTitle } from '../hooks/usePageTitle.js';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email.'),
  password: z.string().min(8, 'Use at least 8 characters.'),
});

export function LoginPage() {
  usePageTitle('Login');
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const redirectTo = location.state?.from?.pathname || '/dashboard';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'maya@collabflow.app', password: 'collabflow' },
  });

  function handleLogin() {
    dispatch(
      setSession({
        user: {
          name: 'Maya Chen',
          email: 'maya@collabflow.app',
          role: 'Workspace Admin',
        },
        workspace: {
          name: 'Acme Product',
          plan: 'Scale',
        },
      }),
    );
    navigate(redirectTo, { replace: true });
  }

  return (
    <div className="flex min-h-screen bg-cf-background p-4">
      <Panel className="m-auto grid w-full max-w-5xl overflow-hidden lg:grid-cols-[1.05fr_0.95fr]">
        <div className="border-b border-cf-line/70 p-8 lg:border-b-0 lg:border-r">
          <div className="flex h-11 w-11 items-center justify-center rounded-cf bg-cf-primary text-white">
            <Activity size={20} />
          </div>
          <p className="cf-label mt-10">CollabFlow workspace</p>
          <h1 className="mt-2 max-w-md text-3xl font-semibold leading-10 text-cf-text">
            Sign in to keep work moving with your team.
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-6 text-cf-muted">
            A compact collaboration workspace for product planning, discussions, reviews, and analytics.
          </p>
        </div>
        <form className="p-8" onSubmit={handleSubmit(handleLogin)}>
          <h2 className="text-xl font-semibold text-cf-text">Welcome back</h2>
          <p className="mt-1 text-sm text-cf-muted">Use your workspace credentials to continue.</p>
          <label className="mt-6 block">
            <span className="cf-label">Email</span>
            <Input className="mt-2" {...register('email')} />
            {errors.email ? <span className="mt-1 block text-xs text-cf-danger">{errors.email.message}</span> : null}
          </label>
          <label className="mt-4 block">
            <span className="cf-label">Password</span>
            <Input className="mt-2" type="password" {...register('password')} />
            {errors.password ? <span className="mt-1 block text-xs text-cf-danger">{errors.password.message}</span> : null}
          </label>
          <Button className="mt-6 w-full" type="submit">
            Continue <ArrowRight size={16} />
          </Button>
          <Link className="mt-4 block text-center text-sm font-medium text-cf-primary" to="/dashboard">
            View workspace shell
          </Link>
        </form>
      </Panel>
    </div>
  );
}
