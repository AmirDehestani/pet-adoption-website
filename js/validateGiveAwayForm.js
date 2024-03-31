function validateGiveawayForm() {
  var petType = document.getElementById('pet-type').value;
  var breed = document.getElementById('breed').value;
  var age = document.getElementById('age').value;
  var gender = document.getElementById('gender').value;
  var name = document.getElementById('owner-name').value;
  var email = document.getElementById('owner-email').value;

  if (
    petType === '' ||
    breed === '' ||
    age === '' ||
    gender === '' ||
    name === '' ||
    email === ''
  ) {
    alert('You must fill in all the fields');
  }

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    alert('You must eneter a valid email address');
  }
}
