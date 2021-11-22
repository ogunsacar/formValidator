const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//FUNCTIONS
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.classList.add("error");
  const small = formControl.querySelector("small");
  small.textContent = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList.add("success");
}
function checkEmail(field) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(field.value)) {
    showSuccess(field);
  } else {
    showError(field, "Email is not valid");
  }
}
//make the first letter uppercase
function getFieldName(field) {
  return field.id.charAt(0).toUpperCase() + field.id.slice(1);
}

function checkRequired(inputArray) {
  inputArray.forEach((field) => {
    if (field.value.trim() === "") {
      showError(field, `${getFieldName(field)} is required!`);
    } else {
      showSuccess(field);
    }
  });
}

function checkLenght(field, min, max) {
  if (field.value.length < min || field.value.length > max) {
    showError(
      field,
      `${getFieldName(field)} should be between ${min}-${max} character`
    );
  } else {
    showSuccess(field);
  }
}

function checkPasswordsMatch(input1, input2) {
  if (input1.value === input2.value) {
    showSuccess(input1);
    showSuccess(input2);
  } else {
    showError(input1, "Passwords do not match!");
    showError(input2, "Passwords do not match!");
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLenght(username, 3, 20);
  checkLenght(password, 7, 20);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
