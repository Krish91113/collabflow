import { UserPlus } from 'lucide-react';
import { Badge } from '../components/ui/Badge.jsx';
import { Panel } from '../components/ui/Panel.jsx';
import { PageHeader } from '../components/common/PageHeader.jsx';
import { members } from '../data/mockData.js';
import { usePageTitle } from '../hooks/usePageTitle.js';

export function MembersPage() {
  usePageTitle('Members');

  return (
    <>
      <PageHeader actionIcon={UserPlus} actionLabel="Invite member" eyebrow="Directory" title="Members" />
      <div className="p-5 lg:p-6">
        <Panel className="overflow-hidden">
          {members.map((member) => (
            <div className="grid gap-4 border-b border-cf-line/60 px-4 py-4 last:border-0 md:grid-cols-[1fr_1fr_auto]" key={member.name}>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cf-primarySoft text-sm font-semibold text-cf-primary">
                  {member.name.slice(0, 1)}
                </div>
                <p className="font-semibold text-cf-text">{member.name}</p>
              </div>
              <p className="text-sm text-cf-muted">{member.role}</p>
              <Badge tone={member.status === 'Online' ? 'success' : 'secondary'}>{member.status}</Badge>
            </div>
          ))}
        </Panel>
      </div>
    </>
  );
}
