import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { server } from "./src/__mocks__/server";

beforeAll(() => server.listen());
afterEach(() => {
  cleanup();
  sessionStorage.clear();
});
afterAll(() => server.close());
