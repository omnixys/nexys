/**
 * @file /settings/@modal/(.)data/page.tsx
 * @description Data management modal
 */

import SettingsModal from "../../_components/modal/SettingsModal";
import DataPanel from "../../_components/panels/DataPanel";

export default function DataModalPage() {
  return (
    <SettingsModal
      title="Data Management"
      subtitle="Storage, backups and retention"
    >
      <DataPanel />
    </SettingsModal>
  );
}
