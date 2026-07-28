export const authStatusCopy = {
  pending: {
    title: 'Check your email',
    description: 'Email verification UI is ready, but the backend verification email endpoint is not available yet.',
  },
  locked: {
    title: 'Account locked',
    description: 'This account cannot continue from the frontend. Contact a workspace owner or administrator.',
  },
  invalid: {
    title: 'Invalid credentials',
    description: 'The backend returned an invalid email or password response. Review your credentials and try again.',
  },
  expired: {
    title: 'Session expired',
    description: 'Your access token is no longer valid. Sign in again to continue.',
  },
};
