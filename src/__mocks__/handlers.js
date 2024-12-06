import { http } from "msw";

export const handlers = [
  http.post(
    "https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com",
    (req, res, ctx) => {
      const { when, lanes, people, shoes } = req.body;

      const confirmation = {
        id: "12345",
        price: (people * 120 + lanes * 100).toString(),
        details: {
          when,
          lanes,
          people,
          shoes,
        },
      };

      return res(ctx.status(200), ctx.json(confirmation));
    }
  ),
];
