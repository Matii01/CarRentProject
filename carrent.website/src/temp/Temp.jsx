const genereateNew = [
  {
    title: "Firma",
    icon: "nc-icon nc-alien-33",
    isActive: false,
    children: [
      { name: "Zamówienia", path: "/rentals", isActive: false },
      { name: "Opinie", path: "/opinion", isActive: false },
      { name: "Zlecenia", path: "/workOrder", isActive: false },
      { name: "O firmie", path: "/company", isActive: false },
      { name: "Newsletter", path: "/newsletter", isActive: false },
    ],
  },
  {
    title: "Użytkownicy",
    icon: "nc-icon nc-alien-33",
    isActive: false,
    children: [
      { name: "Użytkownicy", path: "/users/users", isActive: false },
      { name: "Pracownicy", path: "/users/workers", isActive: false },
    ],
  },
  {
    title: "Samochody",
    icon: "nc-icon nc-alien-33",
    isActive: false,
    children: [
      { name: "Samochody", path: "/cars", isActive: false },
      { name: "Dodaj", path: "/cars/add", isActive: false },
      { name: "Marki", path: "/cars/makes", isActive: false },
      { name: "Silniki", path: "/cars/engines", isActive: false },
      { name: "Typy", path: "/cars/types", isActive: false },
      { name: "Typy napędu", path: "/cars/cardrives", isActive: false },
      { name: "Skrzynia biegów", path: "/cars/gearbox", isActive: false },
      {
        name: "Klimatyzacje",
        path: "/cars/AirConditioning",
        isActive: false,
      },
      { name: "Limity kilometrów", path: "/cars/limits", isActive: false },
    ],
  },
  {
    title: "Strona",
    icon: "nc-icon nc-alien-33",
    isActive: false,
    children: [
      { name: "Strona Główna", path: "/cms/home", isActive: false },
      { name: "Footer", path: "/cms/footer", isActive: false },
      { name: "Kontakt", path: "/cms/contact", isActive: false },
    ],
  },
  {
    title: "Ustawienia",
    icon: "nc-icon nc-alien-33",
    isActive: false,
    children: [
      { name: "Statusy Wypozyczeń", path: "/rental/status", isActive: false },
      { name: "Statusy Faktur", path: "/invoice/status", isActive: false },
      {
        name: "Zlecenia Statusy",
        path: "/workOrder/statuses",
        isActive: false,
      },
      {
        name: "Zlecenia Priorytety",
        path: "/workOrder/priority",
        isActive: false,
      },
    ],
  },
];
