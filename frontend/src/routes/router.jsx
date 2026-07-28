import { createBrowserRouter, Navigate } from 'react-router-dom';
import { App } from '../App.jsx';
import { BoardPage } from '../pages/BoardPage.jsx';
import { ChatPage } from '../pages/ChatPage.jsx';
import { DashboardPage } from '../pages/DashboardPage.jsx';
import { LoginPage } from '../pages/LoginPage.jsx';
import { MembersPage } from '../pages/MembersPage.jsx';
import { SimplePage } from '../pages/SimplePage.jsx';
import { TaskPage } from '../pages/TaskPage.jsx';
import { ProtectedRoute } from './ProtectedRoute.jsx';
import { PublicRoute } from './PublicRoute.jsx';

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/dashboard" replace /> },
  {
    element: <PublicRoute />,
    children: [{ path: '/login', element: <LoginPage /> }],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <App />,
        children: [
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/welcome', element: <SimplePage title="Welcome to CollabFlow" eyebrow="Onboarding" description="Workspace welcome screen scaffold." /> },
          { path: '/board', element: <BoardPage /> },
          { path: '/tasks/feature-redesign', element: <TaskPage /> },
          { path: '/members', element: <MembersPage /> },
          {
            path: '/invitations',
            element: <SimplePage title="Invitations" eyebrow="Workspace" description="Invite management shell from the Stitch screen set." />,
          },
          { path: '/chat', element: <ChatPage /> },
          {
            path: '/search',
            element: <SimplePage title="Search CollabFlow" eyebrow="Command" description="Search surface scaffold for tasks, messages, and files." />,
          },
          {
            path: '/analytics',
            element: <SimplePage title="Workspace Analytics" eyebrow="Insights" description="Analytics page shell prepared for chart and query integration." />,
          },
          {
            path: '/settings',
            element: <SimplePage title="Settings" eyebrow="Admin" description="Workspace settings scaffold with CollabFlow visual tokens." />,
          },
          {
            path: '/join',
            element: <SimplePage title="Join CollabFlow Workspace" eyebrow="Invitation" description="Join workspace flow scaffold." />,
          },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/dashboard" replace /> },
]);
