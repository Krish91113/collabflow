export function Panel({ children, className = '' }) {
  return <section className={`cf-panel ${className}`}>{children}</section>;
}
