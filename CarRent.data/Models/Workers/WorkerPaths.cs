using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.Workers
{
    public class WorkerPaths : BaseDictionaryModel
    {
        public override int Id { get; set ; }
        public string Title { get; set; } = null!;
        public string? Icon { get; set; }
        public int Position { get; set; }
        public ICollection<PathItem>? Paths { get; set; }
    }
}

/*
 const allPages = [
    { title: "Analizy", icon: "nc-icon nc-alien-33", children: [] },
    {
      title: "Zamówienia",
      icon: "nc-icon nc-alien-33",
      children: [{ name: "Wypozyczenia", path: "/rentals" }],
    },
    {
      title: "Użytkownicy",
      icon: "nc-icon nc-alien-33",
      children: [
        { name: "Użytkownicy", path: "/users/users" },
        { name: "Pracownicy", path: "/users/workers" },
      ],
    },
    {
      title: "Samochody",
      icon: "nc-icon nc-alien-33",
      children: [
        { name: "Samochody", path: "/cars" },
        { name: "Dodaj", path: "/cars/add" },
        { name: "Marki", path: "/cars/makes" },
        { name: "Silniki", path: "/cars/engines" },
        { name: "Typy", path: "/cars/types" },
        { name: "Typy napędu", path: "/cars/cardrives" },
        { name: "Skrzynia biegów", path: "/cars/gearbox" },
        { name: "Klimatyzacje", path: "/cars/AirConditioning" },
        { name: "Limity kilometrów", path: "/cars/limits" },
        { name: "Kalendarz", path: "/cars/calendar" },
      ],
    },
    {
      title: "Strona",
      icon: "nc-icon nc-alien-33",
      children: [
        { name: "Strona Główna", path: "" },
        { name: "Menu", path: "" },
        { name: "Footer", path: "" },
        { name: "Footer", path: "" },
      ],
    },
    {
      title: "Ustawienia",
      icon: "nc-icon nc-alien-33",
      children: [{ name: "Statusy Wypozyczeń", path: "/rental/status" }],
    },
    { title: "Temp", icon: "nc-icon nc-alien-33", children: [] },
  ];
 */