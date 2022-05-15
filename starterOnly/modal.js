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
const checkBoxInputs = document.querySelectorAll(
    ".checkbox-input input[name='identifiant']"
)
const conditionscheckBoxInput = document.querySelector("#checkbox1")

const firstNameErrorTextElement = document.querySelector(".name-error")
const lastNameErrorTextElement = document.querySelector(".lastname-error")
const emailErrorTextElement = document.querySelector(".email-error")
const birthdateErrorTextElement = document.querySelector(".birthdate-error")
const tournamentErrorTextElement = document.querySelector(".tournament-error")
const conditionsErrorTextElement = document.querySelector(".conditions-error")

function validateStringNotEmpty(string, errorText) {
    if (!string || string.length < 2) {
        return errorText
    } else {
        return null
    }
}

const emailRegex =
    /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/

function validateStrintWithRegex(string, regex, errorText) {
    if (!string.match(regex)) {
        return errorText
    } else {
        return null
    }
}

function validateMinCheckedCount(checkboxes, checkCount, errorText) {
    let currentCheckCount = 0

    checkboxes.forEach((checkBox) => {
        if (checkBox.checked) currentCheckCount++
    })
    if (currentCheckCount < checkCount) {
        return errorText
    } else {
        return null
    }
}

function validatePassedDate(date, errorText) {
    const nowDate = new Date()
    if (!date || date.getTime() > nowDate.getTime()) {
        return errorText
    } else {
        return null
    }
}

const firstNameErrorText =
    "Veuillez entrer 2 caractères ou plus pour le champ du prénom."

function validateFirstName() {
    const errorText = validateStringNotEmpty(
        firstNameInput.value,
        firstNameErrorText
    )
    if (errorText) {
        firstNameErrorTextElement.innerHTML = errorText
    } else {
        firstNameErrorTextElement.innerHTML = ""
    }
}

const lastNameErrorText =
    "Veuillez entrer 2 caractères ou plus pour le champ du nom."

function validateLastName() {
    const errorText = validateStringNotEmpty(
        lastNameInput.value,
        lastNameErrorText
    )
    if (errorText) {
        lastNameErrorTextElement.innerHTML = errorText
    } else {
        lastNameErrorTextElement.innerHTML = ""
    }
}

const emailErrorText = "Veuillez entrer une adresse e-mail valide."

function validateEmail() {
    const errorText = validateStrintWithRegex(
        emailInput.value,
        emailRegex,
        emailErrorText
    )
    if (errorText) {
        emailErrorTextElement.innerHTML = errorText
    } else {
        emailErrorTextElement.innerHTML = ""
    }
}

const birthdateErrorText = "Vous devez entrer votre date de naissance."

function validateBirthdate() {
    const errorText = validatePassedDate(
        birthdateInput.valueAsDate,
        birthdateErrorText
    )
    if (errorText) {
        birthdateErrorTextElement.innerHTML = errorText
    } else {
        birthdateErrorTextElement.innerHTML = ""
    }
}

const tournamentsErrorText = "Vous devez choisir une option."

function validateTournaments() {
    const errorText = validateMinCheckedCount(
        checkBoxInputs,
        1,
        tournamentsErrorText
    )
    if (errorText) {
        tournamentErrorTextElement.innerHTML = errorText
    } else {
        tournamentErrorTextElement.innerHTML = ""
    }
}

const conditionsErrorText =
    "Vous devez vérifier que vous acceptez les termes et conditions."

function validateConditions() {
    const errorText = validateMinCheckedCount(
        [conditionscheckBoxInput],
        1,
        conditionsErrorText
    )
    if (errorText) {
        conditionsErrorTextElement.innerHTML = errorText
    } else {
        conditionsErrorTextElement.innerHTML = ""
    }
}

firstNameInput.addEventListener("input", (event) => {
    validateFirstName()
})

lastNameInput.addEventListener("input", (event) => {
    validateLastName()
})

emailInput.addEventListener("input", (event) => {
    validateEmail()
})

birthdateInput.addEventListener("input", (event) => {
    validateBirthdate()
})

checkBoxInputs.forEach((input) => {
    validateTournaments()
})

conditionscheckBoxInput.addEventListener("input", (event) => {
    validateConditions()
})
