/**
 * @file /security/@modal/(.)score/page.tsx
 * @description Intercepted route rendered into @modal slot while staying on /security
 */

import SecurityModal from "../../../../components/security/modal/SecurityModal";
import SecurityScorePanel from "../../../../components/settings/panels/SecurityScorePanel";


export default function ScoreModalPage() {
  return (
    <SecurityModal
      title="Security Score"
      subtitle="Trend, risk signals and recommendations"
    >
      <SecurityScorePanel />
    </SecurityModal>
  );
}
