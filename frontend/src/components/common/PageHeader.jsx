import { Button } from '../ui/Button.jsx';

export function PageHeader({ eyebrow, title, description, actionIcon: ActionIcon, actionLabel }) {
  return (
    <header className="flex flex-col gap-4 border-b border-cf-line/70 bg-cf-background px-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-6">
      <div>
        {eyebrow ? <p className="cf-label mb-1">{eyebrow}</p> : null}
        <h1 className="text-2xl font-semibold leading-8 tracking-normal text-cf-text">{title}</h1>
        {description ? <p className="mt-1 max-w-2xl text-sm leading-5 text-cf-muted">{description}</p> : null}
      </div>
      {actionLabel ? (
        <Button className="w-fit">
          {ActionIcon ? <ActionIcon size={16} /> : null}
          {actionLabel}
        </Button>
      ) : null}
    </header>
  );
}
