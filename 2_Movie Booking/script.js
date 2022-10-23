const container = document.querySelector(".container")
const seats = document.querySelectorAll(".row .seat:not(.occupied)")
const count = document.getElementById("count")
const total = document.getElementById("total")
const movieSelected = document.getElementById("movie")

populateUI()

let ticketPrice = +movieSelected.value

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("movieSelectedIndex", movieIndex)
  localStorage.setItem("moviePriceIndex", moviePrice)
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected") // NodeList (ex: (3)[div.seat.selected, div.seat.selected, div.seat.selected])

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat))
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex))
  const selectedSeatsCount = selectedSeats.length

  count.innerText = selectedSeatsCount
  total.innerText = selectedSeatsCount * ticketPrice

  setMovieData(movieSelected.selectedIndex, movieSelected.value)
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"))

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected")
      }
    })
  }

  const selectedMovieIndex = localStorage.getItem("movieSelectedIndex")
  if (selectedMovieIndex !== null) {
    movieSelected.selectedIndex = selectedMovieIndex
  }
}

//Change Event
movieSelected.addEventListener("change", (e) => {
  ticketPrice = +e.target.value
  updateSelectedCount()
})

// Click Event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected")
    updateSelectedCount()
  }
})

updateSelectedCount()
