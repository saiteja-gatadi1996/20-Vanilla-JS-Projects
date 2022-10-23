const currencyOne = document.getElementById("currency-one")
const currencyTwo = document.getElementById("currency-two")

const amountOne = document.getElementById("amount-one")
const amountTwo = document.getElementById("amount-two")

const rateEl = document.getElementById("rate")
const swapEl = document.getElementById("swap")

async function calculate() {
  const currency_one = currencyOne.value //USD
  const currency_two = currencyTwo.value //INR
  const data = await fetch("https://open.exchangerate-api.com/v6/latest")
  const res = await data.json()

  const rate = res.rates[currency_two] / res.rates[currency_one]
  console.log("rate", rate) // 82.76

  rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`
  amountTwo.value = (amountOne.value * rate).toFixed(2)
}

// Event Listener
currencyOne.addEventListener("change", calculate)
currencyTwo.addEventListener("change", calculate)
amountOne.addEventListener("input", calculate)
amountTwo.addEventListener("input", calculate)

swap.addEventListener("click", () => {
  const temp = currencyOne.value
  currencyOne.value = currencyTwo.value
  currencyTwo.value = temp
  calculate()
})

calculate()
