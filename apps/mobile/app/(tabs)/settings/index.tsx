import { ScreenWithSidebar } from "../../../src/components/sidebar/layout-wrapper";
import { SettingsScreen } from "../../../src/screens/settings/settings-screen";

export default function Settings() {
  return (
    <ScreenWithSidebar>
      <SettingsScreen />
    </ScreenWithSidebar>
  );
}
