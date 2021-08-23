let rows = 15;
let seatLetters = ["A", "B", "C", "D", "E", "F"];
let columns = 3;
let seatTotal = rows * 2 * columns;
const info = document.getElementById("info");
const seatSelection = document.getElementById("seat-selection"); //Seat selection information
const price = document.getElementById("price");
const fuselage = document.getElementById("fuselage");
const seatingList = []; // Seats on a seating map
const reservedSeats = [];
const selectedItem = document.getElementsByClassName("selected");
const confirmBtn = document.getElementById("confirm");
const cancelBtn = document.getElementById("cancel");
const alertMsg = document.getElementById("alert-msg");

class Seat {
  constructor(letter, rowNum) {
    this._type = "st";
    this._price = 11.99;
    this._letter = letter;
    this._rowNum = rowNum;
    this._selected = false;
    this._reserved = false;
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
  get isSelected() {
    return this._selected;
  }
  get isReserved() {
    return this._reserved;
  }
  select() {
    this._selected = true;
    return this._selected;
  }
  deselect() {
    this._selected = false;
    return this._selected;
  }
  reserve() {
    this._reserved = true;
  }
  unreserve() {
    this._reserved = false;
  }
  set price(price) {
    this._price = price;
  }
  upgrade() {
    this._type = "premium";
    this._price = 18.99;
  }
  downgrade() {
    this._type = "st";
    this._price = 11.99;
  }
}
// Create seat map and initialise seat objects

function createSeatMap() {
  seatSelection.innerHTML = "n/a";
  for (let r = 0; r < rows; r++) {
    let aisle = document.createElement("div");
    aisle.classList.add("aisle");
    for (let i = 0; i < seatLetters.length; i++) {
      const seat = new Seat(seatLetters[i], r + 1);
      seatingList.push(seat);
      let passengerSeat = document.createElement("div");
      passengerSeat.innerHTML = seat.seatName;
      passengerSeat.classList.add("seat");
      if (r === 5 || r === 6) {
        seat.upgrade();
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
createSeatMap();

const seats = document.getElementsByClassName("seat");

//Seat selection event
for (let i = 0; i < seats.length; i++) {
  seats[i].addEventListener("mouseup", function (e) {
    // if there is no seat selected; then select the target
    if (
      !e.target.classList.contains("selected") &&
      reservedSeats.length === 0
    ) {
      let selectedSeat = seatingList.find(
        (s) => s.seatName === e.target.innerHTML
      );
      selectedSeat.select();
      e.target.classList.add("selected");
      reservedSeats.push(selectedSeat);
      seatSelection.innerHTML = e.target.innerHTML;
      price.innerHTML = selectedSeat.price;
    }
    // if the target seat is already selected; then deselect it
    else if (e.target.classList.contains("selected")) {
      e.target.classList.remove("selected");
      seatSelection.innerHTML = "n/a";
      reservedSeats.pop();
      price.innerText = 0;
    }
    // if there is anothor seat selected; deselect it and then select the target
    else if (
      !e.target.classList.contains("selected") &&
      reservedSeats.length !== 0 &&
      reservedSeats[0].isReserved === false
    ) {
      selectedItem[0].classList.remove("selected");
      reservedSeats[0].deselect();
      reservedSeats.pop();
      selectedSeat = seatingList.find((s) => s.seatName === e.target.innerHTML);
      selectedSeat.select();
      e.target.classList.add("selected");
      reservedSeats.push(selectedSeat);
      seatSelection.innerHTML = e.target.innerHTML;
      price.innerHTML = selectedSeat.price;
    }
    // if there is a reserved seat; then alert the user to cancel the seat selection
    else {
      alertMsg.innerHTML = "Cancel seat selection first";
    }
  });
}

//Confirm seat selection (Reserve selected seat)
confirmBtn.addEventListener("click", function (e) {
  let selected = document.getElementsByClassName("selected");
  selected[0].classList.add("reserved");
  selected[0].innerHTML = "X";
  selected[0].classList.remove("selected");
  reservedSeats[0].reserve();
  seatSelection.classList.add("seat-selection");
  confirmBtn.disabled = true;
});
//Cancel seat reservation or selection
cancelBtn.addEventListener("click", function (e) {
  confirmBtn.disabled = false;
  seatSelection.classList.remove("seat-selection");
  alertMsg.innerText = "";
  let reserved = document.getElementsByClassName("reserved");
  let selected = document.getElementsByClassName("selected");
  // Cancel seat reservation
  if (reservedSeats[0].isReserved) {
    reserved[0].innerHTML = reservedSeats[0].seatName;
    reserved[0].classList.remove("selected", "reserved");
    reservedSeats[0].unreserve();
    reservedSeats[0].deselect();
    reservedSeats.pop();
    price.innerHTML = "0.00";
    seatSelection.innerHTML = "n/a";
  }
  // Cancel seat selection
  else {
    selected[0].classList.remove("selected");
    reservedSeats[0].deselect();
    reservedSeats.pop();
    price.innerHTML = "0.00";
    seatSelection.innerHTML = "n/a";
  }
});
