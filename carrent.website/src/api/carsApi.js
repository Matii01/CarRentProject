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
    addToWishlist: builder.mutation({
      query: (carId) => ({
        url: `Wishlist/add`,
        method: "POST",
        body: JSON.stringify({ CarId: carId }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    removeFromWishlist: builder.mutation({
      query: (carId) => ({
        url: `Wishlist/${carId}`,
        method: "DELETE",
      }),
    }),
    getCarPricelist: builder.query({
      query: (id) => `CarPriceList/${id}/carPricelist`,
    }),
  }),
});

export const {
  useGetRecomendetCarsQuery,
  useGetCarSortingInfoQuery,
  useGetCarDetailsQuery,
  useGetCarsQuery,
  useGetUserWithlistQuery,
  useGetCarPricelistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = carsApi;
