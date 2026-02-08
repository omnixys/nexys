/**
 * @file /security/@modal/(.)features/page.tsx
 * @description Security features modal
 */

import SecurityFeaturesPanel from "../../../settings/_components/panels/SecurityFeaturesPanel";
import SecurityModal from "../../_components/modal/SecurityModal";

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
