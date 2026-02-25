import { ScreenWithSidebar } from "../../src/components/sidebar/layout-wrapper";
import HomeScreen from "../../src/screens/home-screen";

export default function Home() {
  return (
    <ScreenWithSidebar>
      <HomeScreen />
    </ScreenWithSidebar>
  );
}
