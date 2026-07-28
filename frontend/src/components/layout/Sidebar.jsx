import { NavLink } from 'react-router-dom';
import { Activity, ChevronsUpDown, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { navigationItems } from '../../data/navigation.js';

function SidebarContent({ isCollapsed = false, onNavigate }) {
  const workspace = useSelector((state) => state.session.workspace);

  return (
    <>
      <div className={`flex h-16 items-center gap-3 border-b border-cf-line/70 px-4 ${isCollapsed ? 'justify-center' : ''}`}>
        <div className="flex h-9 w-9 items-center justify-center rounded-cf bg-cf-primary text-white">
          <Activity size={18} />
        </div>
        <div className={`min-w-0 ${isCollapsed ? 'hidden' : ''}`}>
          <p className="truncate text-sm font-semibold text-cf-text">CollabFlow</p>
          <p className="truncate text-xs text-cf-muted">{workspace?.plan} workspace</p>
        </div>
      </div>

      <button
        className={`mx-3 mt-4 flex items-center justify-between rounded-cf border border-cf-line/80 bg-cf-surfaceLow px-3 py-2 text-left focus-visible:cf-focus ${
          isCollapsed ? 'hidden' : ''
        }`}
        type="button"
      >
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-cf-text">{workspace?.name}</span>
          <span className="block truncate text-xs text-cf-muted">Product operations</span>
        </span>
        <ChevronsUpDown size={16} className="text-cf-muted" />
      </button>

      <nav className="mt-5 flex flex-1 flex-col gap-1 px-3">
        {navigationItems.map((item) => (
          <NavLink
            className={({ isActive }) =>
              `relative flex h-10 items-center gap-3 rounded-cf px-3 text-sm font-medium transition ${
                isCollapsed ? 'justify-center' : ''
              } ${
                isActive ? 'bg-cf-primarySoft text-cf-primary' : 'text-cf-muted hover:bg-cf-surfaceLow hover:text-cf-text'
              }`
            }
            key={item.path}
            onClick={onNavigate}
            to={item.path}
            title={isCollapsed ? item.label : undefined}
          >
            <item.icon size={17} />
            <span className={isCollapsed ? 'sr-only' : ''}>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}

export function Sidebar({ isCollapsed = false, isMobileOpen = false, onCloseMobile }) {
  return (
    <>
      <aside
        className={`hidden shrink-0 border-r border-cf-line/70 bg-white transition-[width] duration-200 lg:flex lg:flex-col ${
          isCollapsed ? 'w-[72px]' : 'w-[240px]'
        }`}
      >
        <SidebarContent isCollapsed={isCollapsed} />
      </aside>

      <div className={`fixed inset-0 z-40 bg-cf-text/20 backdrop-blur-sm lg:hidden ${isMobileOpen ? 'block' : 'hidden'}`}>
        <aside className="flex h-full w-[280px] max-w-[86vw] flex-col border-r border-cf-line/70 bg-white shadow-overlay">
          <div className="absolute left-[292px] top-3 max-[340px]:left-auto max-[340px]:right-3">
            <button
              aria-label="Close sidebar"
              className="flex h-10 w-10 items-center justify-center rounded-cf bg-white text-cf-muted shadow-soft focus-visible:cf-focus"
              onClick={onCloseMobile}
              type="button"
            >
              <X size={18} />
            </button>
          </div>
          <SidebarContent onNavigate={onCloseMobile} />
        </aside>
      </div>
    </>
  );
}
