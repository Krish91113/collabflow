import { Plus } from 'lucide-react';
import { Badge } from '../components/ui/Badge.jsx';
import { PageHeader } from '../components/common/PageHeader.jsx';
import { boardColumns } from '../data/mockData.js';
import { usePageTitle } from '../hooks/usePageTitle.js';

export function BoardPage() {
  usePageTitle('Product Roadmap');

  return (
    <>
      <PageHeader
        actionIcon={Plus}
        actionLabel="Add card"
        description="The first implementation pass wires the roadmap board structure without full drag/drop behavior."
        eyebrow="Board"
        title="Product Roadmap"
      />
      <div className="grid gap-4 overflow-x-auto p-5 lg:grid-cols-4 lg:p-6">
        {boardColumns.map((column) => (
          <section className="min-w-[280px] rounded-panel border border-cf-line/70 bg-cf-surfaceMid p-3" key={column.title}>
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="text-sm font-semibold text-cf-text">{column.title}</h2>
              <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-cf-muted">{column.count}</span>
            </div>
            <div className="space-y-3">
              {column.cards.map((card) => (
                <article className="rounded-cf border border-cf-line/70 bg-white p-3 shadow-none transition hover:shadow-soft" key={card.title}>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-semibold leading-5 text-cf-text">{card.title}</h3>
                    <Badge tone={card.priority === 'High' ? 'danger' : card.priority === 'Medium' ? 'warning' : 'secondary'}>
                      {card.priority}
                    </Badge>
                  </div>
                  <p className="mt-3 cf-label">{card.meta}</p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
