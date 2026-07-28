import { PageHeader } from '../components/common/PageHeader.jsx';
import { Panel } from '../components/ui/Panel.jsx';
import { usePageTitle } from '../hooks/usePageTitle.js';

export function SimplePage({ title, eyebrow, description }) {
  usePageTitle(title);

  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <div className="p-5 lg:p-6">
        <Panel className="p-5">
          <p className="cf-label">Scaffold</p>
          <h2 className="mt-2 text-lg font-semibold text-cf-text">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-cf-muted">
            This route is intentionally scaffolded in the first frontend pass. The layout, providers, and component system are ready for the next feature slice.
          </p>
        </Panel>
      </div>
    </>
  );
}
