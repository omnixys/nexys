/**
 * @file /security/@modal/(.)score/page.tsx
 * @description Intercepted route rendered into @modal slot while staying on /security
 */

import SecurityScorePanel from "../../../settings/_components/panels/SecurityScorePanel";
import SecurityModal from "../../_components/modal/SecurityModal";

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
