/**
 * @file /settings/@modal/(.)language/page.tsx
 * @description Language modal
 */

import SettingsModal from "../../_components/modal/SettingsModal";
import LanguagePanel from "../../_components/panels/LanguagePanel";

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
