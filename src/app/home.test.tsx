import { render } from "@testing-library/react";

import Home from "./page";
import "@testing-library/jest-dom";

describe("Home component", () => {
  it("renders the initial state correctly", () => {
    const { getByText } = render(<Home />);
    const button = getByText(/Location name/i);
    expect(button).toBeTruthy();
  });
});
