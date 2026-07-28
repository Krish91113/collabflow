import { CheckCircle2, MessageSquareText } from 'lucide-react';
import { Badge } from '../components/ui/Badge.jsx';
import { Panel } from '../components/ui/Panel.jsx';
import { PageHeader } from '../components/common/PageHeader.jsx';
import { usePageTitle } from '../hooks/usePageTitle.js';

export function TaskPage() {
  usePageTitle('Feature Redesign');

  return (
    <>
      <PageHeader eyebrow="Task" title="Feature Redesign" description="Task detail scaffold following the Stitch detail screen." />
      <div className="grid gap-6 p-5 lg:grid-cols-[1fr_340px] lg:p-6">
        <Panel className="p-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="primary">In progress</Badge>
            <Badge tone="danger">High priority</Badge>
          </div>
          <h2 className="mt-5 text-xl font-semibold text-cf-text">Refine workspace task collaboration flow</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-cf-muted">
            Establish the first React implementation pass with route shells, reusable components, and design tokens before deeper feature integration.
          </p>
          <div className="mt-6 space-y-3">
            {['Create shared app shell', 'Wire route groups', 'Prepare API/query/socket clients'].map((item) => (
              <div className="flex items-center gap-3 rounded-cf border border-cf-line/70 bg-cf-surfaceLow px-3 py-3" key={item}>
                <CheckCircle2 size={18} className="text-cf-success" />
                <span className="text-sm font-medium text-cf-text">{item}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel className="p-4">
          <p className="cf-label">Activity</p>
          <div className="mt-4 space-y-4">
            {['Ari attached design notes', 'Jordan requested review', 'Maya updated scope'].map((item) => (
              <div className="flex gap-3" key={item}>
                <MessageSquareText size={16} className="mt-0.5 text-cf-primary" />
                <p className="text-sm text-cf-muted">{item}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
