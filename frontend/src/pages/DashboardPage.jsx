import { ArrowUpRight, Plus } from 'lucide-react';
import { Badge } from '../components/ui/Badge.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Panel } from '../components/ui/Panel.jsx';
import { PageHeader } from '../components/common/PageHeader.jsx';
import { stats } from '../data/mockData.js';
import { usePageTitle } from '../hooks/usePageTitle.js';

export function DashboardPage() {
  usePageTitle('Dashboard');

  return (
    <>
      <PageHeader
        actionIcon={Plus}
        actionLabel="Create task"
        description="A high-density overview of the workspace, designed from the CollabFlow Stitch dashboard."
        eyebrow="Workspace"
        title="Dashboard"
      />
      <div className="space-y-6 p-5 lg:p-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <Panel className="p-4" key={stat.label}>
              <div className="flex items-start justify-between">
                <p className="cf-label">{stat.label}</p>
                <Badge tone={stat.tone}>{stat.change}</Badge>
              </div>
              <p className="mt-5 text-3xl font-semibold leading-10 text-cf-text">{stat.value}</p>
            </Panel>
          ))}
        </div>
        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
          <Panel className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-cf-line/70 px-4 py-3">
              <h2 className="text-base font-semibold text-cf-text">Priority work</h2>
              <Button variant="ghost" className="h-8 px-2">
                <ArrowUpRight size={15} />
              </Button>
            </div>
            {['Feature redesign', 'Workspace invite flow', 'Analytics QA', 'Realtime chat polish'].map((item, index) => (
              <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-cf-line/50 px-4 py-4 last:border-0" key={item}>
                <div>
                  <p className="text-sm font-semibold text-cf-text">{item}</p>
                  <p className="mt-1 text-sm text-cf-muted">Owner assigned, discussion active, milestone {index + 1}</p>
                </div>
                <Badge tone={index === 0 ? 'primary' : 'secondary'}>{index === 0 ? 'Active' : 'Queued'}</Badge>
              </div>
            ))}
          </Panel>
          <Panel className="p-4">
            <p className="cf-label">Team pulse</p>
            <h2 className="mt-2 text-lg font-semibold text-cf-text">32 members synced</h2>
            <div className="mt-5 space-y-3">
              {['Design review', 'Sprint planning', 'Release notes'].map((item) => (
                <div className="rounded-cf border border-cf-line/60 bg-cf-surfaceLow px-3 py-3" key={item}>
                  <p className="text-sm font-semibold text-cf-text">{item}</p>
                  <p className="mt-1 text-xs text-cf-muted">Updated within the last hour</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}
