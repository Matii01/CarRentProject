import CarCardForListView from "../Cards/Cars/CarCardForListView";

function CarsListView({ cars, isLogin, wishlist }) {
  return (
    <>
      {cars.map((car) => (
        <CarCardForListView
          key={car.id}
          car={car}
          isLogin={isLogin}
          wishlist={wishlist}
        />
      ))}
    </>
  );
}

export default CarsListView;
