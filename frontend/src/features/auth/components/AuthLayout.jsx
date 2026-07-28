import { Activity, ArrowLeft, ShieldCheck, Sparkles, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Panel } from '../../../components/ui/Panel.jsx';

const proofItems = [
  { label: 'Secure workspace access', icon: ShieldCheck },
  { label: 'Realtime team presence', icon: UsersRound },
  { label: 'Fast project handoff', icon: Sparkles },
];

export function AuthLayout({ backTo, children, eyebrow = 'CollabFlow workspace', subtitle, title }) {
  return (
    <div className="flex min-h-screen bg-cf-background p-4 text-cf-text">
      <Panel className="m-auto grid w-full max-w-6xl overflow-hidden lg:grid-cols-[1.04fr_0.96fr]">
        <section className="relative border-b border-cf-line/70 bg-cf-surfaceLow p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
          {backTo ? (
            <Link className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-cf-muted hover:text-cf-primary" to={backTo}>
              <ArrowLeft size={16} />
              Back
            </Link>
          ) : null}
          <div className="flex h-11 w-11 items-center justify-center rounded-cf bg-cf-primary text-white">
            <Activity size={20} />
          </div>
          <p className="cf-label mt-10">{eyebrow}</p>
          <h1 className="mt-2 max-w-lg text-3xl font-semibold leading-10 tracking-normal text-cf-text">{title}</h1>
          {subtitle ? <p className="mt-3 max-w-xl text-sm leading-6 text-cf-muted">{subtitle}</p> : null}
          <div className="mt-10 grid gap-3">
            {proofItems.map((item) => (
              <div className="flex items-center gap-3 rounded-cf border border-cf-line/70 bg-white px-3 py-3" key={item.label}>
                <div className="flex h-8 w-8 items-center justify-center rounded-cf bg-cf-primarySoft text-cf-primary">
                  <item.icon size={16} />
                </div>
                <span className="text-sm font-medium text-cf-text">{item.label}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="flex items-center p-6 sm:p-8 lg:p-10">{children}</section>
      </Panel>
    </div>
  );
}
