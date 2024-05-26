import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../../config";

export const carRentApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: config.API_URL }), // config.API_URL
  endpoints: () => ({}),
});
