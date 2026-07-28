import { useState } from 'react';
import { Sidebar } from './Sidebar.jsx';
import { Topbar } from './Topbar.jsx';

export function AppShell({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cf-background text-cf-text">
      <div className="mx-auto flex min-h-screen max-w-shell border-x border-cf-line/50 bg-cf-background">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar
            isSidebarCollapsed={isSidebarCollapsed}
            onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
            onToggleSidebar={() => setIsSidebarCollapsed((value) => !value)}
          />
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
