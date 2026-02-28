import { TodoStatus } from "../../../src/lib";
import { screen } from "@testing-library/react-native";
import { render } from "../../../src/setupTests";
import { Badge } from "../../../src/components/ui/badge";
import { Text } from "../../../src/components/ui/text";

it("given a status when the status is complete it should render Badge complete", () => {
  render(
    <Badge>
      <Text>complete</Text>
    </Badge>
  );
  expect(screen.findByText("complete")).toBeTruthy();
});
