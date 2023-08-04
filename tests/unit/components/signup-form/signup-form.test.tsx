import { SignupFormView } from "../../../../src/components/signup-form-view";
import { render } from "../../../../src/setupTests";

describe("Given a signup form", () => {
  it.skip("it allows user to create an account if all fields are valid", () => {
    const onSubmit = () => Promise.resolve();
    const { container, getByRole } = render(
      <SignupFormView onSubmit={onSubmit} goToLogin={() => {}} />
    );

    expect(container).toBeTruthy();
    expect(getByRole("pressable")).toHaveTextContent("Create account");
  });
});
