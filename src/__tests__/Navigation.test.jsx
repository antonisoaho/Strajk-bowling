import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

describe("Navigation Component", () => {
  it("should navigate to Booking page when Booking link is clicked", () => {
    render(<App />);
    const bookingButton = screen.getByRole("link", { name: "Booking" });
    fireEvent.click(bookingButton);

    expect(screen.getByText("When, WHAT & Who")).toBeInTheDocument();
  });

  it("should navigate to Confirmation page when Confirmation link is clicked", () => {
    render(<App />);
    const confirmationButton = screen.getByRole("link", {
      name: "Confirmation",
    });
    fireEvent.click(confirmationButton);

    expect(screen.getByText("See you soon!")).toBeInTheDocument();
  });
});
