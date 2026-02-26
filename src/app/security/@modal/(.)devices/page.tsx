/**
 * @file /security/@modal/(.)devices/page.tsx
 * @description Devices modal
 */

import SecurityModal from "../../../../components/security/modal/SecurityModal";
import ActiveDevicesPanel from "../../../../components/security/panels/ActiveDevicesPanel";



export default function DevicesModalPage() {
  return (
    <SecurityModal
      title="Active Devices"
      subtitle="Review sessions and revoke device access"
    >
      <ActiveDevicesPanel />
    </SecurityModal>
  );
}
