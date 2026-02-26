/**
 * @file /security/@modal/(.)auth/page.tsx
 * @description Authentication methods modal
 */

import SecurityModal from "../../../../components/security/modal/SecurityModal";
import AuthenticationPanel from "../../../../components/settings/panels/AuthenticationPanel";



export default function AuthModalPage() {
  return (
    <SecurityModal
      title="Authentication Methods"
      subtitle="2FA, biometrics and recovery"
    >
      <AuthenticationPanel />
    </SecurityModal>
  );
}
