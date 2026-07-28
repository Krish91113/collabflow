import {
  BarChart3,
  Bell,
  KanbanSquare,
  LayoutDashboard,
  MessageSquareText,
  Search,
  Settings,
  Users,
} from 'lucide-react';

export const navigationItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Roadmap', path: '/board', icon: KanbanSquare },
  { label: 'Members', path: '/members', icon: Users },
  { label: 'Invitations', path: '/invitations', icon: Bell },
  { label: 'Chat', path: '/chat', icon: MessageSquareText },
  { label: 'Search', path: '/search', icon: Search },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'Settings', path: '/settings', icon: Settings },
];
