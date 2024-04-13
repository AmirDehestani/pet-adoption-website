function validateGiveawayForm() {
  var petName = document.getElementById('name').value;
  var petType = document.getElementById('type').value;
  var breed = document.getElementById('breed').value;
  var age = document.getElementById('age').value;
  var gender = document.getElementById('gender').value;
  var owner_name = document.getElementById('owner-given-name').value;
  var surname = document.getElementById('owner-surname').value;
  var email = document.getElementById('owner-email').value;

  if (
    petName === '' ||
    petType === '' ||
    breed === '' ||
    age === '' ||
    gender === '' ||
    owner_name === '' ||
    surname === '' ||
    email === ''
  ) {
    alert('You must fill in all the fields');
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    alert('You must eneter a valid email address');
  } else {
    document.getElementById('giveawayForm').submit();
  }
}
