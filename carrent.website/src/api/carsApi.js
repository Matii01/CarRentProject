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
    getCarPricelist: builder.query({
      query: (id) => `CarPriceList/${id}/carPricelist`,
    }),
    getCarOpinions: builder.query({
      query: (carId) => `CarOpinion/${carId}`,
    }),
  }),
});

export const {
  useGetRecomendetCarsQuery,
  useGetCarSortingInfoQuery,
  useGetCarDetailsQuery,
  useGetCarsQuery,
  useGetCarPricelistQuery,
  useGetCarOpinionsQuery,
} = carsApi;
