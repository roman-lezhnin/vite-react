import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";
const URL = import.meta.env.VITE_API_URL;

const handlers = [
  http.post(`${URL}/login`, () => {
    return HttpResponse.json(
      {
        jwt: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
      },
      { status: 201 }
    );
  }),
  http.post(`${URL}/login/error`, () => {
    return HttpResponse.json(
      {
        errors: ["INVALID_EMAIL"],
      },
      { status: 400 }
    );
  }),
  http.post(`${URL}/logout`, () => {
    return new HttpResponse(null, { status: 201 });
  }),
  http.get(`${URL}/order`, () => {
    return HttpResponse.json(
      [
        {
          uuid: "55289300-8058-4bd5-8382-4b3054744884",
          title: "1",
        },
        {
          uuid: "f3fc4c02-c1bb-45ad-a59c-121c87f8ee1a",
          title: "2",
        },
      ],
      { status: 200 }
    );
  }),
];

export const mockServer = setupWorker(...handlers);
