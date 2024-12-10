import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Confirmation from "../views/Confirmation";
import App from "../App";

describe("Confirmation Component", () => {
  it("renders no booking message when no confirmation details are available", () => {
    render(
      <MemoryRouter>
        <Confirmation />
      </MemoryRouter>
    );

    expect(screen.getByText("Inga bokning gjord!")).toBeInTheDocument();
  });

  it("renders confirmation details when they are available", () => {
    sessionStorage.setItem(
      "confirmation",
      JSON.stringify({
        when: "2024-12-12T12:00",
        people: 5,
        lanes: 2,
        price: 500,
        id: "12345-VERY-UNIQUE",
      })
    );

    render(
      <MemoryRouter>
        <Confirmation />
      </MemoryRouter>
    );

    expect(screen.getByText("See you soon!")).toBeInTheDocument();
    expect(screen.getByLabelText("When").value).toBe("2024-12-12 12:00");
    expect(screen.getByLabelText("Who").value).toBe("5");
    expect(screen.getByLabelText("Lanes").value).toBe("2");
    expect(screen.getByLabelText("Booking number").value).toBe(
      "12345-VERY-UNIQUE"
    );
    expect(screen.findByText(`500 SEK`)).toBeDefined();
  });

  it("should render confirmation details after booking is done", async () => {
    render(<App />);

    const dateInput = screen.getByLabelText("Date");
    const timeInput = screen.getByLabelText("Time");
    const peopleInput = screen.getByLabelText("Number of awesome bowlers");
    const lanesInput = screen.getByLabelText("Number of lanes");
    const addShoeButton = screen.getByText("+");
    const bookButton = screen.getByText("strIIIIIike!");

    const players = 5;
    const lanes = Math.ceil(players / 4);

    fireEvent.change(dateInput, { target: { value: "2024-12-12" } });
    fireEvent.change(timeInput, { target: { value: "12:00" } });
    fireEvent.change(peopleInput, { target: { value: String(players) } });
    fireEvent.change(lanesInput, { target: { value: String(lanes) } });

    for (let i = 0; i < 5; i++) {
      fireEvent.click(addShoeButton);
    }
    const shoeInputs = screen.getAllByLabelText(/Shoe size \/ person/);
    shoeInputs.forEach((input) => {
      fireEvent.change(input, { target: { value: "42" } });
    });

    await waitFor(() => {
      fireEvent.click(bookButton);
    });

    const price = JSON.parse(sessionStorage.getItem("confirmation")).price;

    expect(screen.getByText("See you soon!")).toBeInTheDocument();
    expect(screen.getByLabelText("When").value).toBe("2024-12-12 12:00");
    expect(screen.getByLabelText("Who").value).toBe(String(players));
    expect(screen.getByLabelText("Lanes").value).toBe(String(lanes));
    expect(screen.getByLabelText("Booking number").value).toBe(
      "12345-VERY-UNIQUE"
    );
    expect(screen.findByText(`${price} SEK`)).toBeDefined();
  });
});
