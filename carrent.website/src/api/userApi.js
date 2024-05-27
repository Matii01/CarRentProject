import { carRentApi } from "./carRentApi";

const userApi = carRentApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserRentals: builder.query({
      query: (queryString) => `rental/UserRental?${queryString}`,
    }),
    getRentalDetails: builder.query({
      query: (id) => `rental/UserRental/${id}`,
    }),
  }),
});

export const { useGetUserRentalsQuery, useGetRentalDetailsQuery } = userApi;
