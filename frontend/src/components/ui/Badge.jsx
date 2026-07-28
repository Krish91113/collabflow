const tones = {
  primary: 'bg-cf-primarySoft text-cf-primary',
  success: 'bg-cf-successSoft text-cf-success',
  warning: 'bg-cf-warningSoft text-cf-warning',
  danger: 'bg-cf-dangerSoft text-cf-danger',
  secondary: 'bg-cf-secondarySoft text-cf-secondary',
};

export function Badge({ children, tone = 'secondary' }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 font-label text-[11px] font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}
