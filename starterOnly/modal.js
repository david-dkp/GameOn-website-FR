function editNav() {
    var x = document.getElementById("myTopnav")
    if (x.className === "topnav") {
        x.className += " responsive"
    } else {
        x.className = "topnav"
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground")
const modalBtn = document.querySelectorAll(".modal-btn")
const formData = document.querySelectorAll(".formData")

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal))

// launch modal form
function launchModal() {
    modalbg.style.display = "block"
}

//inputs
const firstNameInput = document.querySelector("#first")
const lastNameInput = document.querySelector("#last")
const emailInput = document.querySelector("#email")
const birthdateInput = document.querySelector("#birthdate")
const checkBoxInputs = document.querySelectorAll(".checkbox-input")

const firstNameErrorText = document.querySelector(".name-error")
const lastNameErrorText = document.querySelector(".lastname-error")
const emailErrorText = document.querySelector(".email-error")
const birthdateErrorText = document.querySelector(".birthdate-error")
const tournamentErrorText = document.querySelector(".tournament-error")

function validateStringNotEmpty(string, errorText) {
    if (!string || string.length < 2) {
        errorText.innerHTML =
            "Veuillez entrer 2 caractères ou plus pour le champ du nom."
    } else {
        errorText.innerHTML = ""
    }
}

const emailRegex =
    /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/

function validateStrintWithRegex(string, emailRegex, errorText) {
    if (!string.match(emailRegex)) {
        errorText.innerHTML = "Veuillez entrer une adresse e-mail valide."
    } else {
        errorText.innerHTML = ""
    }
}

function validateManyChecked(checkboxes, checkCount, errorText) {
    let currentCheckCount = 0

    checkboxes.forEach((checkBox) => {
        if (checkBox.target.checked) currentCheckCount++
        if (currentCheckCount > checkCount) {
            errorText.innerHTML =
                "Selectionnez au moins " + checkCount + "tournoi"
        }
    })

    errorText.innerHTML = ""
}

firstNameInput.addEventListener("input", (event) => {
    validateStringNotEmpty(event.target.value, firstNameErrorText)
})

lastNameInput.addEventListener("input", (event) => {
    validateStringNotEmpty(event.target.value, lastNameErrorText)
})

emailInput.addEventListener("input", (event) => {
    validateStrintWithRegex(event.target.value, emailRegex, emailErrorText)
})

checkBoxInputs.forEach((input) => {
    validateManyChecked(checkBoxInputs, 1, tournamentErrorText)
})
