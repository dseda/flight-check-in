let rows = 25;
let seatLetters = ["A", "B", "C", "D", "E", "F"];
let columns = 3;
let seatTotal = rows * 2 * columns;
let info = document.getElementById("selection");
addSeat();
function addSeat() {
  const fuselage = document.getElementById("fuselage");
  for (let r = 0; r < rows; r++) {
    let corridor = document.createElement("div");
    corridor.classList.add("corridor");
    corridor.innerHTML = r + 1;
    for (let i = 0; i < seatLetters.length; i++) {
      let seat = document.createElement("div");
      seat.classList.add("seat");
      seat.id = "seat";
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
const seats = document.getElementsByClassName("seat");
console.log(seats);
for (let i = 0; i < seats.length; i++) {
  seats[i].addEventListener("mousedown", function () {
    seats[i].classList.add("selected");
  });
}
for (let i = 0; i < seats.length; i++) {
  seats[i].addEventListener("mouseup", function (e) {
    e.target.classList.add("reserved");
    seat = document.getElementById("seat");
    info.innerHTML = e.target.innerHTML;
  });
}
// for (let i = 0; i < seats.length; i++) {
//   seats[i].addEventListener("dblclick", function () {
//     seats[i].classList.add("reserved");
//   });
// }

// const seat_ = {
//   column: "A",
//   row: 1,
//   reserved: false,
//   selected: false,
//   sold: false,
// };
