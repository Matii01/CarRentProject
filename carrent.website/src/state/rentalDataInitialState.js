function getAllRentalDataInitialState(carId, dateFrom, dataTo) {
  return {
    NewRentalForClient: {
      carId: carId,
      dateFrom: dateFrom,
      dateTo: dataTo,
    },
    ClientDetails: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      postCode: "",
      city: "",
    },
    Invoice: {
      number: "zxcvbnm",
      comment: "brak uwag",
    },
  };
}

export default getAllRentalDataInitialState;
