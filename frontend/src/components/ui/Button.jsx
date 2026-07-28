const variants = {
  primary: 'bg-cf-primary text-white hover:bg-cf-primaryContainer',
  secondary: 'border border-cf-line/80 bg-white text-cf-text hover:border-cf-primary/40 hover:bg-cf-surfaceLow',
  ghost: 'text-cf-muted hover:bg-cf-surfaceLow hover:text-cf-text',
};

export function Button({ children, className = '', variant = 'primary', type = 'button', ...props }) {
  return (
    <button
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-cf px-4 text-sm font-semibold transition ${variants[variant]} focus-visible:cf-focus disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
