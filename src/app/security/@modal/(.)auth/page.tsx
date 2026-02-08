/**
 * @file /security/@modal/(.)auth/page.tsx
 * @description Authentication methods modal
 */

import AuthenticationPanel from "../../../settings/_components/panels/AuthenticationPanel";
import SecurityModal from "../../_components/modal/SecurityModal";

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
