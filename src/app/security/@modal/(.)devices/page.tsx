/**
 * @file /security/@modal/(.)devices/page.tsx
 * @description Devices modal
 */

import ActiveDevicesPanel from "../../../settings/_components/panels/ActiveDevicesPanel";
import SecurityModal from "../../_components/modal/SecurityModal";

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
