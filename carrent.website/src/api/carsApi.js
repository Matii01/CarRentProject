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
      transformResponse: (data) => {
        const transformed = data.map((it) => ({
          ...it,
          addedDate: it.addedDate.slice(0, 10),
        }));
        return transformed;
      },
    }),
    addCarOpinion: builder.mutation({
      query: (opinion) => ({
        url: `CarOpinion/create`,
        method: "POST",
        body: JSON.stringify(opinion),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    checkPriceForNotLoggedIn: builder.query({
      query: (data) => ({
        url: `Rental/CheckPrice`,
        params: {
          carId: data.carId,
          DateFrom: data.dateFrom,
          DateTo: data.dateTo,
        },
      }),
    }),
    checkPriceForUser: builder.query({
      query: (data) => ({
        url: `Rental/CheckPriceForClient`,
        params: {
          carId: data.carId,
          DateFrom: data.dateFrom,
          DateTo: data.dateTo,
        },
      }),
    }),
    isDateAvailable: builder.query({}),
  }),
});

export const {
  useGetRecomendetCarsQuery,
  useGetCarSortingInfoQuery,
  useGetCarDetailsQuery,
  useGetCarsQuery,
  useGetCarPricelistQuery,
  useGetCarOpinionsQuery,
  useAddCarOpinionMutation,
  useCheckPriceForUserQuery,
  useCheckPriceForNotLoggedInQuery,
} = carsApi;
