import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Booking from "../views/Booking";
import Confirmation from "../views/Confirmation";
import Navigation from "../components/Navigation/Navigation";
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
