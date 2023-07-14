import { AvatarWithText } from "../../../src/components/avatar-with-text";
import { render } from "../../../src/setupTests";

it("renders an avatar image with role and user full name", () => {
  const { container } = render(
    <AvatarWithText name="Edviges Meque" role="Product Designer" />
  );
  expect(container).toBeTruthy();
  expect(container).toHaveTextContent("Edviges Meque");
});
