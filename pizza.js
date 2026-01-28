//When you assign a property to a function you don't put parentheses or else it will run immediately
document.getElementById("pizza-form").onsubmit = () => {
  clearErrors();

  let isValid = true;

  let fname = document.getElementById("fname").value.trim();
  let lname = document.getElementById("lname").value.trim();
  let email = document.getElementById("email").value.trim();
  let size = document.getElementById("size").value;
  let pickup = document.getElementById("pickup");
  let delivery = document.getElementById("delivery");

  //first name validation
  if (!fname) {
    document.getElementById("err-fname").style.display = "block";
    isValid = false;
  }

  //last name validation
  if (!lname) {
    document.getElementById("err-lname").style.display = "block";
    isValid = false;
  }

  //email validation
  if (!email) {
    document.getElementById("err-email").style.display = "block";
    isValid = false;
  }

  //pickup/delivery validation
  if (!pickup.checked && !delivery.checked) {
    document.getElementById("err-pickup").style.display = "block";
    isValid = false;
  }

  //size validation
  if (size == "none") {
    document.getElementById("err-size").style.display = "block";
    isValid = false;
  }

  //scrolls back to top of page on incomplete submission
  if (!isValid) {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  return isValid;
};

function clearErrors() {
  let errors = document.getElementsByClassName("err");
  for (let i = 0; i < errors.length; i++) {
    errors[i].style.display = "none";
  }
}
