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
    getCars: builder.query({
      query: (queryString) => {
        return `/car/cars?${queryString}`;
      },
    }),
    getUserWithlist: builder.query({
      query: () => "/Wishlist",
    }),
  }),
});

export const {
  useGetRecomendetCarsQuery,
  useGetCarSortingInfoQuery,
  useGetCarDetailsQuery,
  useGetCarsQuery,
  useGetUserWithlistQuery,
} = carsApi;
