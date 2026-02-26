/**
 * @file /settings/@modal/(.)advanced/page.tsx
 * @description Advanced settings modal
 */

import SettingsModal from "../../../../components/settings/modal/SettingsModal";
import AdvancedPanel from "../../../../components/settings/panels/AdvancedPanel";



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
