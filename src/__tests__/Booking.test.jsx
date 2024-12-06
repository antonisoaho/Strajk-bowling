import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { expect } from "vitest";
import Booking from "../views/Booking";

// describe("Booking", () => {
//   it("should allow user to select date, time and number of players", async () => {
//     render(
//       <BrowserRouter>
//         <Booking />
//       </BrowserRouter>
//     );
//     const dateInput = screen.getByLabelText("Date");
//     const timeInput = screen.getByLabelText("Time");
//     const peopleInput = screen.getByLabelText("Number of awesome bowlers");
//     const lanesInput = screen.getByLabelText("Number of lanes");
//     const bookButton = screen.getByText("strIIIIIike!");

//     fireEvent.change(dateInput, { target: { value: "2024-12-12" } });
//     fireEvent.change(timeInput, { target: { value: "12:00" } });
//     fireEvent.change(peopleInput, { target: { value: "4" } });
//     fireEvent.change(lanesInput, { target: { value: "1" } });

//     fireEvent.click(bookButton);

//     await waitFor(() => {
//       expect(
//         screen.queryByText("Alla fälten måste vara ifyllda")
//       ).not.toBeInTheDocument();
//       expect(
//         screen.queryByText(
//           "Antalet skor måste stämma överens med antal spelare"
//         )
//       ).toBeInTheDocument();
//       expect(
//         screen.queryByText("Det får max vara 4 spelare per bana")
//       ).not.toBeInTheDocument();

describe("Booking", () => {});
it("should allow user to select date, time and number of players", async () => {
  render(
    <BrowserRouter>
      <Booking />
    </BrowserRouter>
  );

  const dateInput = screen.getByLabelText("Date");
  const timeInput = screen.getByLabelText("Time");
  const peopleInput = screen.getByLabelText("Number of awesome bowlers");
  const lanesInput = screen.getByLabelText("Number of lanes");
  const bookButton = screen.getByText("strIIIIIike!");

  fireEvent.change(dateInput, { target: { value: "2024-12-12" } });
  fireEvent.change(timeInput, { target: { value: "12:00" } });
  fireEvent.change(peopleInput, { target: { value: "4" } });
  fireEvent.change(lanesInput, { target: { value: "1" } });

  // Simulate adding shoe sizes
  const addShoeButton = screen.getByRole("button", { name: "+" });
  fireEvent.click(addShoeButton);
  const shoeSizeInput = screen.getByLabelText("Shoe Size");
  fireEvent.change(shoeSizeInput, { target: { value: "42" } });

  fireEvent.click(bookButton);

  await waitFor(() => {
    expect(
      screen.queryByText("Alla fälten måste vara ifyllda")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Antalet skor måste stämma överens med antal spelare")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Alla skor måste vara ifyllda")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Det får max vara 4 spelare per bana")
    ).not.toBeInTheDocument();
  });
});

it("should show error if fields are missing", async () => {
  render(
    <BrowserRouter>
      <Booking />
    </BrowserRouter>
  );

  const bookButton = screen.getByText("strIIIIIike!");

  fireEvent.click(bookButton);

  await waitFor(() => {
    expect(
      screen.getByText("Alla fälten måste vara ifyllda")
    ).toBeInTheDocument();
  });
});

it("should show error if shoe sizes do not match number of players", async () => {
  render(
    <BrowserRouter>
      <Booking />
    </BrowserRouter>
  );

  const dateInput = screen.getByLabelText("Date");
  const timeInput = screen.getByLabelText("Time");
  const peopleInput = screen.getByLabelText("Number of awesome bowlers");
  const lanesInput = screen.getByLabelText("Number of lanes");
  const bookButton = screen.getByText("strIIIIIike!");

  fireEvent.change(dateInput, { target: { value: "2024-12-12" } });
  fireEvent.change(timeInput, { target: { value: "12:00" } });
  fireEvent.change(peopleInput, { target: { value: "4" } });
  fireEvent.change(lanesInput, { target: { value: "1" } });

  fireEvent.click(bookButton);

  await waitFor(() => {
    expect(
      screen.getByText("Antalet skor måste stämma överens med antal spelare")
    ).toBeInTheDocument();
  });
});

it("should show error if shoe sizes are not filled", async () => {
  render(
    <BrowserRouter>
      <Booking />
    </BrowserRouter>
  );

  const dateInput = screen.getByLabelText("Date");
  const timeInput = screen.getByLabelText("Time");
  const peopleInput = screen.getByLabelText("Number of awesome bowlers");
  const lanesInput = screen.getByLabelText("Number of lanes");
  const bookButton = screen.getByText("strIIIIIike!");

  fireEvent.change(dateInput, { target: { value: "2024-12-12" } });
  fireEvent.change(timeInput, { target: { value: "12:00" } });
  fireEvent.change(peopleInput, { target: { value: "4" } });
  fireEvent.change(lanesInput, { target: { value: "1" } });

  // Simulate adding shoe sizes
  const addShoeButton = screen.getByText("Add Shoe");
  fireEvent.click(addShoeButton);

  fireEvent.click(bookButton);

  await waitFor(() => {
    expect(
      screen.getByText("Alla skor måste vara ifyllda")
    ).toBeInTheDocument();
  });
});

it("should show error if players exceed lanes capacity", async () => {
  render(
    <BrowserRouter>
      <Booking />
    </BrowserRouter>
  );

  const dateInput = screen.getByLabelText("Date");
  const timeInput = screen.getByLabelText("Time");
  const peopleInput = screen.getByLabelText("Number of awesome bowlers");
  const lanesInput = screen.getByLabelText("Number of lanes");
  const bookButton = screen.getByText("strIIIIIike!");

  fireEvent.change(dateInput, { target: { value: "2024-12-12" } });
  fireEvent.change(timeInput, { target: { value: "12:00" } });
  fireEvent.change(peopleInput, { target: { value: "5" } });
  fireEvent.change(lanesInput, { target: { value: "1" } });

  fireEvent.click(bookButton);

  await waitFor(() => {
    expect(
      screen.getByText("Det får max vara 4 spelare per bana")
    ).toBeInTheDocument();
  });
});
