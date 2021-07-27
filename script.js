let rows = 25;
let seatIds = ["A", "B", "C", "D", "E", "F"];
let corridors = 1;
let columns = 3;
let seatTotal = rows * (corridors + 1) * columns;
addSeat();
function addSeat() {
  const fuselage = document.getElementById("fuselage");
  for (let s = 0; s < seatTotal; s++) {
    let seat = document.createElement("div");
    seat.classList.add("seat");
    fuselage.appendChild(seat);
  }
}
const seats = document.getElementsByClassName("seat");
console.log(seats);
for (let i = 0; i < seats.length; i++) {
  seats[i].addEventListener("mousedown", function () {
    seats[i].classList.add("selected");
  });
}
for (let i = 0; i < seats.length; i++) {
  seats[i].addEventListener("mouseup", function () {
    seats[i].classList.remove("selected");
  });
}
for (let i = 0; i < seats.length; i++) {
  seats[i].addEventListener("dblclick", function () {
    seats[i].classList.add("reserved");
  });
}

// const seat_ = {
//   number: "A",
//   row: 1,
//   reserved: false,
//   selected: false,
//   sold: false,
// };
