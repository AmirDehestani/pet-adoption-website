function validateFindForm() {
  var petType = document.getElementById('type').value;
  var breed = document.getElementById('breed').value;
  var age = document.getElementById('age').value;
  var gender = document.getElementById('gender').value;

  if (petType === '' || breed === '' || age === '' || gender === '') {
    alert('You must fill in all the fields');
  } else {
    document.getElementById('findForm').submit();
  }
}
