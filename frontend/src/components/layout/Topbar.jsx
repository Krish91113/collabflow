import { Bell, Command, Menu, PanelLeftClose, PanelLeftOpen, Plus, Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Button } from '../ui/Button.jsx';

export function Topbar({ isSidebarCollapsed, onOpenMobileSidebar, onToggleSidebar }) {
  const user = useSelector((state) => state.session.user);

  return (
    <div className="flex h-16 items-center justify-between border-b border-cf-line/70 bg-white px-4 lg:px-6">
      <button
        aria-label="Open sidebar"
        className="mr-2 flex h-10 w-10 items-center justify-center rounded-cf text-cf-muted hover:bg-cf-surfaceLow hover:text-cf-text focus-visible:cf-focus lg:hidden"
        onClick={onOpenMobileSidebar}
        type="button"
      >
        <Menu size={19} />
      </button>
      <button
        aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="mr-3 hidden h-10 w-10 items-center justify-center rounded-cf text-cf-muted hover:bg-cf-surfaceLow hover:text-cf-text focus-visible:cf-focus lg:flex"
        onClick={onToggleSidebar}
        type="button"
      >
        {isSidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
      </button>
      <button className="hidden h-10 w-full max-w-md items-center gap-3 rounded-cf border border-cf-line/80 bg-cf-surfaceLow px-3 text-sm text-cf-muted focus-visible:cf-focus md:flex">
        <Search size={16} />
        Search tasks, messages, files
        <span className="ml-auto inline-flex items-center gap-1 rounded border border-cf-line bg-white px-1.5 py-0.5 font-label text-[11px]">
          <Command size={11} /> K
        </span>
      </button>
      <div className="md:hidden">
        <p className="text-sm font-semibold text-cf-text">CollabFlow</p>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="secondary" className="hidden sm:inline-flex">
          <Plus size={16} />
          New
        </Button>
        <button className="flex h-10 w-10 items-center justify-center rounded-cf text-cf-muted hover:bg-cf-surfaceLow hover:text-cf-text focus-visible:cf-focus">
          <Bell size={18} />
        </button>
        <div className="flex h-10 items-center gap-2 rounded-full border border-cf-line/80 bg-white pl-1 pr-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cf-primarySoft text-sm font-semibold text-cf-primary">
            {user?.name?.slice(0, 1)}
          </div>
          <span className="hidden text-sm font-medium text-cf-text sm:inline">{user?.name}</span>
        </div>
      </div>
    </div>
  );
}
