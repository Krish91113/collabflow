import { Send } from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Panel } from '../components/ui/Panel.jsx';
import { PageHeader } from '../components/common/PageHeader.jsx';
import { messages } from '../data/mockData.js';
import { usePageTitle } from '../hooks/usePageTitle.js';

export function ChatPage() {
  usePageTitle('Chat');

  return (
    <>
      <PageHeader description="Realtime client wiring is present; message persistence comes in a later feature pass." eyebrow="Workspace" title="Chat" />
      <div className="grid gap-6 p-5 lg:grid-cols-[1fr_320px] lg:p-6">
        <Panel className="flex min-h-[620px] flex-col overflow-hidden">
          <div className="border-b border-cf-line/70 px-4 py-3">
            <h2 className="text-base font-semibold text-cf-text"># product-roadmap</h2>
          </div>
          <div className="flex-1 space-y-4 p-4">
            {messages.map((message) => (
              <div className="rounded-panel border border-cf-line/70 bg-cf-surfaceLow p-3" key={`${message.author}-${message.time}`}>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-cf-text">{message.author}</p>
                  <p className="text-xs text-cf-muted">{message.time}</p>
                </div>
                <p className="mt-2 text-sm leading-5 text-cf-muted">{message.body}</p>
              </div>
            ))}
          </div>
          <form className="flex gap-2 border-t border-cf-line/70 p-3">
            <Input placeholder="Write a message" />
            <Button type="submit">
              <Send size={16} />
            </Button>
          </form>
        </Panel>
        <Panel className="p-4">
          <p className="cf-label">Presence</p>
          <div className="mt-4 space-y-3">
            {['Maya', 'Jordan', 'Ari', 'Sam'].map((name) => (
              <div className="flex items-center gap-3" key={name}>
                <span className="h-2.5 w-2.5 rounded-full bg-cf-success" />
                <span className="text-sm font-medium text-cf-text">{name}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
