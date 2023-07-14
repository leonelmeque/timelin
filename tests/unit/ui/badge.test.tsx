import { TodoStatus } from "../../../src/lib";
import { screen } from "@testing-library/react-native";
import { render } from "../../../src/setupTests";
import { Badge } from "../../../src/ui/atoms";

it("given a status when the status is complete it should render Badge complete", () => {
  render(
    <Badge status={TodoStatus.COMPLETED} label="complete" type="colored" />
  );
  expect(screen.findByText("complete")).toBeTruthy();
});
