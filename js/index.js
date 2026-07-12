
function isValidName(name) {
  var pattern = /^[a-zA-Z\s]{2,50}$/;
  return pattern.test(name);
}

function isValidPhone(phone) {
  var pattern = /^01[0125][0-9]{8}$/;
  return pattern.test(phone);
}

function isValidEmail(email) {
  if (email === "") {
    return true;
  }
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}


var addContactModal = new bootstrap.Modal(
  document.getElementById("addContactModal"),
);