import audi from "../images/vehicles/audi.png";
import cabr from "../images/vehicles/cabr.png";
import lambo from "../images/vehicles/lambo.png";
import old from "../images/vehicles/old.png";
import merc from "../images/vehicles/merc.png";

export const FORM_TYPES = {
  location: "location",
  vehicle: "vehicle",
  date: "date",
  payment: "payment",
}

export const cards = [
  {
    id: '1',
    src: audi,
    name: "Audi",
    capacity: "500",
    size: "5",
    price: "150",
  },
  {
    id: '2',
    src: cabr,
    name: "Audi cabrio",
    capacity: "400",
    size: "4",
    price: "200",
  },
  {
    id: '3',
    src: lambo,
    name: "Ламбо",
    capacity: "300",
    size: "6",
    price: "800",
  },
  {
    id: '4',
    src: old,
    name: "Old",
    capacity: "200",
    size: "4",
    price: "1000",
  },
  {
    id: '5',
    src: merc,
    name: "Mercedes",
    capacity: "1000",
    size: "8",
    price: "500",
  },
]