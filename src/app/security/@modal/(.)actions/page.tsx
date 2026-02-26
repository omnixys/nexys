/**
 * @file /security/@modal/(.)actions/page.tsx
 * @description Quick actions modal
 */

import SecurityModal from "../../../../components/security/modal/SecurityModal";
import QuickActionsPanel from "../../../../components/settings/panels/QuickActionsPanel";



export default function ActionsModalPage() {
  return (
    <SecurityModal
      title="Quick Actions"
      subtitle="Fast paths to critical security changes"
    >
      <QuickActionsPanel />
    </SecurityModal>
  );
}
