/**
 * @file /security/@modal/(.)history/page.tsx
 * @description Login history modal
 */

import SecurityModal from "../../../../components/security/modal/SecurityModal";
import LoginHistoryPanel from "../../../../components/settings/panels/LoginHistoryPanel";



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
