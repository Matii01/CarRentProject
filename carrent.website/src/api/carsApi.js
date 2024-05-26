import { carRentApi } from "./carRentApi";

const carsApi = carRentApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecomendetCars: builder.query({
      query: () => "car/recommended",
    }),
    getCarSortingInfo: builder.query({
      query: () => "car/CarSortingInfo",
    }),
    getCarDetails: builder.query({
      query: (carId) => `Car/details/${carId}`,
    }),
  }),
});

export const {
  useGetRecomendetCarsQuery,
  useGetCarSortingInfoQuery,
  useGetCarDetailsQuery,
} = carsApi;
