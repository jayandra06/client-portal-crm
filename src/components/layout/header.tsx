import { signOut, switchOrganizationAction } from "@/app/(dashboard)/actions";
import { OrganizationSwitcher } from "@/components/layout/organization-switcher";
import { NotificationBell, type NotificationBellItem } from "@/components/notifications/notification-bell";
import { GlobalSearch } from "@/components/search/global-search";
import { AiAssistantTrigger } from "@/components/ai/ai-assistant-trigger";
import type { OrganizationSwitcherItem } from "@/lib/current-user";

import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Header({
  email,
  organizations,
  unreadNotificationCount,
  recentNotifications,
  aiAssistantAvailable,
}: {
  email: string;
  organizations: OrganizationSwitcherItem[];
  unreadNotificationCount: number;
  recentNotifications: NotificationBellItem[];
  /** Server-resolved once in (dashboard)/layout.tsx via isAiAssistantAvailable() — see ai-assistant-trigger.tsx's own doc comment for why this is the ONLY AI-related signal this component (or its child) ever receives. */
  aiAssistantAvailable: boolean;
}) {
  const activeOrganizationId = organizations.find((org) => org.isActive)?.organizationId;

  return (
    <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 border-b border-border-default bg-surface/90 px-6 py-3.5 backdrop-blur-md transition-shadow">
      <OrganizationSwitcher organizations={organizations} action={switchOrganizationAction} />
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <GlobalSearch key={activeOrganizationId} />
        <AiAssistantTrigger available={aiAssistantAvailable} />
        <NotificationBell
          initialUnreadCount={unreadNotificationCount}
          initialNotifications={recentNotifications}
        />
        <ThemeToggle />
        <div className="hidden min-w-0 items-center gap-2 rounded-full border border-border-default bg-surface-recessed px-3 py-1 text-xs font-semibold text-text-primary sm:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="min-w-0 max-w-[14rem] truncate" title={email}>
            {email}
          </span>
        </div>
        <form action={signOut} className="shrink-0">
          <button
            type="submit"
            className="rounded-lg border border-border-default bg-surface px-3 py-1.5 text-xs font-semibold text-text-primary shadow-2xs transition-all hover:bg-[var(--hover)] hover:border-border-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}
