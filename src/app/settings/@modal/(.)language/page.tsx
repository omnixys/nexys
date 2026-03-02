/**
 * @file /settings/@modal/(.)language/page.tsx
 * @description Language modal
 */

import SettingsModal from "@/components/settings/modal/SettingsModal";
import LanguagePanel from "@/components/settings/panels/LanguagePanel";


export default function LanguageModalPage() {
  return (
    <SettingsModal
      title="Language & Region"
      subtitle="Locale, currency and formats"
    >
      <LanguagePanel />
    </SettingsModal>
  );
}
