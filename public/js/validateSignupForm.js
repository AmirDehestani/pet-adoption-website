function validateSignupForm() {
  var user = document.getElementById('user').value;
  var pass = document.getElementById('pass').value;

  const usernameRegex = /^[a-zA-Z0-9]+$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,}$/;

  if (!usernameRegex.test(user)) {
    alert('Invalid username');
  } else if (!passwordRegex.test(pass)) {
    alert('Invalid password');
  } else {
    document.getElementById('signup-form').submit();
  }
}
