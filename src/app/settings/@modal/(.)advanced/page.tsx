/**
 * @file /settings/@modal/(.)advanced/page.tsx
 * @description Advanced settings modal
 */

import SettingsModal from "../../_components/modal/SettingsModal";
import AdvancedPanel from "../../_components/panels/AdvancedPanel";

export default function AdvancedModalPage() {
  return (
    <SettingsModal
      title="Advanced Settings"
      subtitle="Developer options and utilities"
    >
      <AdvancedPanel />
    </SettingsModal>
  );
}
