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

// close modal form
function closeModal() {
    modalbg.style.display = "none"
}

// add onclick listener to the modal's close button.
const closeButton = document.querySelector(".close")

closeButton.onclick = () => {
    closeModal()
}

//inputs
const firstNameInput = document.querySelector("#first")
const lastNameInput = document.querySelector("#last")
const emailInput = document.querySelector("#email")
const birthdateInput = document.querySelector("#birthdate")
const tournamentsQuantityInput = document.querySelector("#quantity")
const tournamentsCheckboxesInputs = document.querySelectorAll(
    "input[name='location'].checkbox-input"
)
const conditionscheckBoxInput = document.querySelector("#checkbox1")

//inputs' error element
const firstNameErrorTextElement = document.querySelector(".name-error")
const lastNameErrorTextElement = document.querySelector(".lastname-error")
const emailErrorTextElement = document.querySelector(".email-error")
const birthdateErrorTextElement = document.querySelector(".birthdate-error")
const tournamentsQuantityErrorTextElement = document.querySelector(
    ".tournaments-quantity-error"
)
const tournamentErrorTextElement = document.querySelector(".tournament-error")
const conditionsErrorTextElement = document.querySelector(".conditions-error")

/*
Here are validators:
    - if there is an error, returns a string describing the error
    - if there is NOT an error, returns null
*/

function validateStringNotEmpty(string, errorText) {
    if (!string || string.length < 2) {
        return errorText
    } else {
        return null
    }
}

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

function validateStringWithRegex(string, regex, errorText) {
    if (!string.match(regex)) {
        return errorText
    } else {
        return null
    }
}

function validateMinNumber(num, min, errorText) {
    if (!num || num < min) {
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

/*
    Here are the methods that validates each fields of the form
*/

const firstNameErrorText =
    "Veuillez entrer 2 caractères ou plus pour le champ du prénom."

function validateFirstName() {
    const errorText = validateStringNotEmpty(
        firstNameInput.value,
        firstNameErrorText
    )
    if (errorText) {
        firstNameErrorTextElement.innerHTML = errorText
        return false
    } else {
        firstNameErrorTextElement.innerHTML = ""
        return true
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
        return false
    } else {
        lastNameErrorTextElement.innerHTML = ""
        return true
    }
}

const emailErrorText = "Veuillez entrer une adresse e-mail valide."

function validateEmail() {
    const errorText = validateStringWithRegex(
        emailInput.value,
        emailRegex,
        emailErrorText
    )
    if (errorText) {
        emailErrorTextElement.innerHTML = errorText
        return false
    } else {
        emailErrorTextElement.innerHTML = ""
        return true
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
        return false
    } else {
        birthdateErrorTextElement.innerHTML = ""
        return true
    }
}

const tournamentsQuantityErrorText = "Veuillez saisir une valeur numérique."

function validateTournamentsQuantity() {
    const errorText = validateMinNumber(
        tournamentsQuantityInput.value,
        0,
        tournamentsQuantityErrorText
    )
    if (errorText) {
        tournamentsQuantityErrorTextElement.innerHTML = errorText
        return false
    } else {
        tournamentsQuantityErrorTextElement.innerHTML = ""
        return true
    }
}

const tournamentsErrorText = "Vous devez choisir une option."

function validateTournaments() {
    const errorText = validateMinCheckedCount(
        tournamentsCheckboxesInputs,
        1,
        tournamentsErrorText
    )
    if (errorText) {
        tournamentErrorTextElement.innerHTML = errorText
        return false
    } else {
        tournamentErrorTextElement.innerHTML = ""
        return true
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
        return false
    } else {
        conditionsErrorTextElement.innerHTML = ""
        return true
    }
}

//Listen to each fields change, and run their validation in real time
firstNameInput.addEventListener("input", () => {
    validateFirstName()
})

lastNameInput.addEventListener("input", () => {
    validateLastName()
})

emailInput.addEventListener("input", () => {
    validateEmail()
})

birthdateInput.addEventListener("input", () => {
    validateBirthdate()
})

tournamentsQuantityInput.addEventListener("input", () => {
    validateTournamentsQuantity()
})

tournamentsCheckboxesInputs.forEach((input) => {
    input.addEventListener("input", () => {
        validateTournaments()
    })
})

conditionscheckBoxInput.addEventListener("input", () => {
    validateConditions()
})

const fieldsValidators = [
    validateFirstName,
    validateLastName,
    validateEmail,
    validateBirthdate,
    validateTournaments,
    validateConditions,
    validateTournamentsQuantity,
]

//Run validation of each fields at once
function validateAllFields() {
    let hasError = false
    for (const validator of fieldsValidators) {
        const isFieldValid = validator()

        if (!isFieldValid) {
            hasError = true
        }
    }

    return !hasError
}

/*
    Called when we submit the form, we double check the validations,
    and if there's an error, the errors will be shown.
*/
function validate() {
    if (validateAllFields()) {
        alert("Merci ! Votre réservation a été reçue.")
        return true
    } else {
        return false
    }
}
