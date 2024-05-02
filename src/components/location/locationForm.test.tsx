import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import LocationForm from "./LocationForm";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}));
describe("LocationForm component", () => {
  it("Test the onchange events", () => {
    const { getByPlaceholderText } = render(
      <LocationForm title="Title test" />
    );
    const inputText = getByPlaceholderText("Somewhere");
    fireEvent.change(inputText, { target: { value: "Lisbon" } });
    expect(inputText).toHaveValue("Lisbon");
    expect("Title test").toBeTruthy();
  });
});
