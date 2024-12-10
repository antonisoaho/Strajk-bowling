import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Booking from "../views/Booking";
import Confirmation from "../views/Confirmation";
import Navigation from "../components/Navigation/Navigation";

describe("Navigation Component", () => {
  it("should navigate to Booking page when Booking link is clicked", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={<Booking />}
          />
          <Route
            path="/confirmation"
            element={<Confirmation />}
          />
        </Routes>
      </MemoryRouter>
    );
    const menuButton = screen.getAllByAltText("navigation icon");
    fireEvent.click(menuButton[0]);
    const links = await screen.findAllByRole("link");
    const bookingButton = links.find((link) => link.textContent === "Booking");
    fireEvent.click(bookingButton);

    expect(screen.getByText("When, WHAT & Who")).toBeInTheDocument();
  });

  it("should navigate to Confirmation page when Confirmation link is clicked", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={<Booking />}
          />
          <Route
            path="/confirmation"
            element={<Confirmation />}
          />
        </Routes>
      </MemoryRouter>
    );
    const menuButton = screen.getAllByAltText("navigation icon");
    fireEvent.click(menuButton[0]);
    const links = await screen.findAllByRole("link");
    const confirmationButton = links.find(
      (link) => link.textContent === "Confirmation"
    );
    fireEvent.click(confirmationButton);

    expect(screen.getByText("See you soon!")).toBeInTheDocument();
  });
});
