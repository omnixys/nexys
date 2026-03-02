/**
 * @file /settings/@modal/(.)data/page.tsx
 * @description Data management modal
 */

import SettingsModal from "@/components/settings/modal/SettingsModal";
import DataPanel from "@/components/settings/panels/DataPanel";


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
