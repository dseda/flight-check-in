let rows = 25;
let seatLetters = ["A", "B", "C", "D", "E", "F"];
let columns = 3;
let seatTotal = rows * 2 * columns;
let info = document.getElementById("selection");
const fuselage = document.getElementById("fuselage");

class Seat {
  constructor(l, rowNum) {
    this._l = l;
    this._rowNum = rowNum;
    this._reserved = false;
    this._price = 11.99;
  }
  get seatLetter() {
    return this._l;
  }
  get seatRow() {
    return this._rowNum;
  }
  get seatName() {
    return this._rowNum + this._l;
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

  set price(price) {
    this._price = price;
  }
}

function addSeat() {
  for (let r = 0; r < rows; r++) {
    let corridor = document.createElement("div");
    corridor.classList.add("corridor");
    corridor.innerHTML = r + 1;
    for (let i = 0; i < seatLetters.length; i++) {
      let seat = document.createElement("div");
      seat.classList.add("seat");
      seat.innerHTML = seatLetters[i];
      if (i === 3) {
        fuselage.appendChild(corridor);
        fuselage.appendChild(seat);
      } else {
        fuselage.appendChild(seat);
      }
    }
  }
}
addSeat();
const seats = document.getElementsByClassName("seat");
for (let i = 0; i < seats.length; i++) {
  seats[i].addEventListener("mousedown", function (e) {
    e.target.classList.add("selected");
  });
}
for (let i = 0; i < seats.length; i++) {
  seats[i].addEventListener("mouseup", function (e) {
    e.target.classList.add("reserved");
    info.innerHTML = e.target.innerHTML;
  });
}
// for (let i = 0; i < seats.length; i++) {
//   seats[i].addEventListener("dblclick", function () {
//     seats[i].classList.add("reserved");
//   });
// }
