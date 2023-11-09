// This file contains the scripts for handling logins

// Defining async function
async function check_login() {
  // login status
  userLoggedIn = false;

  // min lengths
  minUsernameLength = 6;
  minPasswordLength = 6;

  // Storing response
  const response = await fetch(api_url);

  // Storing data in the form of JSON
  var data = await response.json();

  // Get the inputted email and password
  const emailText = document.getElementById("Usertext");
  const passwordText = document.getElementById("PasswordText");

  // Check if email/password are entered
  if (emailText.value.length < minUsernameLength) {
    alert(`Please enter a username greater than ${minUsernameLength} characters`);
  } else {
    if (passwordText.value.length < minPasswordLength) {
      alert(`Please enter a password greater than ${minPasswordLength} characters`);
    } else {
      data.forEach(function(account) {
        if (emailText.value === account.email && passwordText.value === account.password) {
          alert("Login successful");

          // Set the session to logged in
          console.log("Setting session to logged in");
          sessionStorage.setItem('userStatus', 'loggedIn');
          userLoggedIn = true;

          location.reload();
          // Task: What should happen once the user has logged in? Do they go to a dashboard?
        }
      });
      if (!userLoggedIn) {
        alert("Incorrect Username/Password");
        location.reload();
      } 
  }


}

function remove(item_id) {
  return fetch(api_url + "/" + item_id, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });
}
}