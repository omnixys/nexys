/**
 * @file /settings/@modal/(.)appearance/page.tsx
 * @description Intercepted route rendered into @modal slot while staying on /settings
 */

import SettingsModal from "../../_components/modal/SettingsModal";
import AppearancePanel from "../../_components/panels/AppearancePanel";

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
