/**
 * @file /security/@modal/(.)features/page.tsx
 * @description Security features modal
 */

import SecurityModal from "@/components/security/modal/SecurityModal";
import SecurityFeaturesPanel from "@/components/settings/panels/SecurityFeaturesPanel";



export default function FeaturesModalPage() {
  return (
    <SecurityModal
      title="Security Features"
      subtitle="Enable, review and harden account protections"
    >
      <SecurityFeaturesPanel />
    </SecurityModal>
  );
}
