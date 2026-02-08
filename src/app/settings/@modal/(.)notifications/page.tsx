/**
 * @file /settings/@modal/(.)notifications/page.tsx
 * @description Notifications modal
 */

import SettingsModal from "../../_components/modal/SettingsModal";
import NotificationsPanel from "../../_components/panels/NotificationsPanel";

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
