let rows = 26;
let seatLetters = ["A", "B", "C", "D", "E", "F"];
let columns = 3;
let seatTotal = rows * 2 * columns;
const info = document.getElementById("selected-seat-info"); //Seat selection information
const price = document.getElementById("price");
const fuselage = document.getElementById("fuselage");
const seatingList = []; // Seats on a seating map
const reservedSeats = [];
const reservedItem = document.getElementsByClassName("reserved");
const confirmBtn = document.getElementById("confirm");

class Seat {
  constructor(letter, rowNum) {
    this._letter = letter;
    this._rowNum = rowNum;
    this._reserved = false;
    this._price = 11.99;
    this._sold = false;
  }
  get seatLetter() {
    return this._letter;
  }
  get seatRow() {
    return this._rowNum;
  }
  get seatName() {
    return this._rowNum + this._letter;
  }
  get price() {
    return this._price;
  }
  get isReserved() {
    return this._reserved;
  }
  reserve() {
    this._reserved = true;
    return this._reserved;
  }
  unreserve() {
    this._reserved = false;
    return this._reserved;
  }
  sell() {
    this._sold = true;
  }
  unsell() {
    this._sold = false;
  }
  set price(price) {
    this._price = price;
  }
}
// Creates seat map and initialises seat objects

function createSeat() {
  info.innerHTML = "";
  for (let r = 0; r < rows; r++) {
    let aisle = document.createElement("div");
    aisle.classList.add("aisle");
    for (let i = 0; i < seatLetters.length; i++) {
      const seat = new Seat(seatLetters[i], r + 1);
      seatingList.push(seat);
      let passengerSeat = document.createElement("div");
      passengerSeat.innerHTML = seat.seatName;
      passengerSeat.classList.add("seat");
      if (r === 14 || r === 15) {
        passengerSeat.classList.add("premium");
      }
      if (i === 3) {
        fuselage.appendChild(aisle);
        fuselage.appendChild(passengerSeat);
      } else {
        fuselage.appendChild(passengerSeat);
      }
    }
  }
}
createSeat();

const seats = document.getElementsByClassName("seat");

//Seat selection event
for (let i = 0; i < seats.length; i++) {
  seats[i].addEventListener("mouseup", function (e) {
    if (
      !e.target.classList.contains("reserved") &&
      reservedSeats.length === 0
    ) {
      let selectedSeat = seatingList.find(
        (s) => s.seatName === e.target.innerHTML
      );
      selectedSeat.reserve();
      e.target.classList.add("reserved");
      reservedSeats.push(selectedSeat);
      info.innerHTML = e.target.innerHTML;
      price.innerHTML = selectedSeat.price;
      return reservedSeats;
    } else if (e.target.classList.contains("reserved")) {
      e.target.classList.remove("reserved");
      info.innerHTML = "";
      reservedSeats.pop();
      price.innerHTML = 0;
      return reservedSeats;
    } else if (
      !e.target.classList.contains("reserved") &&
      reservedSeats.length !== 0
    ) {
      reservedItem[0].classList.remove("reserved");
      reservedSeats[0].unreserve();
      reservedSeats.pop();
      selectedSeat = seatingList.find((s) => s.seatName === e.target.innerHTML);
      selectedSeat.reserve();
      e.target.classList.add("reserved");
      reservedSeats.push(selectedSeat);
      info.innerHTML = e.target.innerHTML;
      price.innerHTML = selectedSeat.price;
      return reservedSeats;
    }
  });
}
confirmBtn.addEventListener("click", function (e) {
  let reserved = document.getElementsByClassName("reserved");
  reserved[0].classList.add("sold");
  reserved[0].innerHTML = "X";
  reserved[0].classList.remove("reserved");
  reservedSeats[0].sell();
});
