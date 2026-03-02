/**
 * @file /settings/@modal/(.)appearance/page.tsx
 * @description Intercepted route rendered into @modal slot while staying on /settings
 */

import SettingsModal from "@/components/settings/modal/SettingsModal";
import AppearancePanel from "@/components/settings/panels/AppearancePanel";


export default function AppearanceModalPage() {
  return (
    <SettingsModal
      title="Appearance"
      subtitle="Theme, typography and UI scaling"
    >
      <AppearancePanel />
    </SettingsModal>
  );
}
