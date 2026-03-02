/**
 * @file /settings/@modal/(.)notifications/page.tsx
 * @description Notifications modal
 */

import SettingsModal from "@/components/settings/modal/SettingsModal";
import NotificationsPanel from "@/components/settings/panels/NotificationsPanel";


export default function NotificationsModalPage() {
  return (
    <SettingsModal
      title="Notifications"
      subtitle="Channels, preferences and quiet hours"
    >
      <NotificationsPanel />
    </SettingsModal>
  );
}
