/**
 * @file /security/@modal/(.)actions/page.tsx
 * @description Quick actions modal
 */

import QuickActionsPanel from "../../../settings/_components/panels/QuickActionsPanel";
import SecurityModal from "../../_components/modal/SecurityModal";

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
