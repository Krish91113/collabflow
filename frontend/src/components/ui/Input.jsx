export function Input({ className = '', ...props }) {
  return (
    <input
      className={`h-10 w-full rounded-cf border border-cf-line/80 bg-white px-3 text-sm text-cf-text placeholder:text-cf-muted/70 focus-visible:cf-focus ${className}`}
      {...props}
    />
  );
}
