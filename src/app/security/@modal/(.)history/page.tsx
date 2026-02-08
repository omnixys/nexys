/**
 * @file /security/@modal/(.)history/page.tsx
 * @description Login history modal
 */

import LoginHistoryPanel from "../../../settings/_components/panels/LoginHistoryPanel";
import SecurityModal from "../../_components/modal/SecurityModal";

export default function HistoryModalPage() {
  return (
    <SecurityModal
      title="Login History"
      subtitle="Audit logins and investigate anomalies"
    >
      <LoginHistoryPanel />
    </SecurityModal>
  );
}
