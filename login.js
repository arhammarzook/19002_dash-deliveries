// This file contains the scripts for handling logins

// This is a different API used for user logins
// const api_url = "https://retoolapi.dev/AnbI2N/data";

// Defining async function
async function check_login() {
  // Storing response
  const response = await fetch(api_url);

  // Storing data in the form of JSON
  var data = await response.json();

  // Get the inputted email and password
  const emailText = document.getElementById("Usertext");
  const passwordText = document.getElementById("PasswordText");

  data.forEach(function(account) {
    if (emailText.value === account.email && passwordText.value === account.password) {
      alert("Login successful");

      // Set the session to logged in
      console.log("Setting session to logged in");
      sessionStorage.setItem('userStatus', 'loggedIn');

      location.reload();
      // Task: What should happen once the user has logged in? Do they go to a dashboard?
    }
  });
}

function remove(item_id) {
  return fetch(api_url + "/" + item_id, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });
}