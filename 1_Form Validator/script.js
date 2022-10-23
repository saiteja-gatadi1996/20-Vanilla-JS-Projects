const form = document.getElementById("form")
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const password2 = document.getElementById("password2")

function showError(input, message) {
  const formControl = input.parentElement
  formControl.className = "form-control error"
  const small = formControl.querySelector("small")
  small.innerText = message
}

function showSuccess(input) {
  const formControl = input.parentElement
  formControl.className = "form-control success"
}

//Check if Email is valid
function validateEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (re.test(input.value.trim())) {
    showSuccess(input)
  } else {
    showError(input, "Email is not valid")
  }
}

// capitalize Error Message
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// Check Input Min to Max chars
function checkInputMaxChars(input, min, max) {
  if (input.value.length < min) {
    showError(input, `Please enter atleast ${min} minimum characters`)
  } else if (input.value.length > max) {
    showError(input, ` ${input.id} has exceeded the ${max} characters`)
  } else {
    showSuccess(input)
  }
}

//Check Passwords match
function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords doesn't match")
  }
}

//Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value === "") {
      showError(input, `${getFieldName(input)} is required`)
    } else {
      showSuccess(input)
    }
  })
}

// Event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault()
  checkRequired([username, email, password, password2])
  checkInputMaxChars(username, 3, 15)
  checkInputMaxChars(password, 6, 25)
  validateEmail(email)
  checkPasswordMatch(password, password2)
})
