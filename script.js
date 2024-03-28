document.addEventListener('DOMContentLoaded', showTime);
function showTime() {
  const date = new Date();
  const option = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  const formattedDate = date.toLocaleString(undefined, option);
  document.getElementById('time').innerHTML = formattedDate;
  setTimeout(showTime, 1000);
}

function validateFindForm() {
  var petType = document.getElementById('pet-type').value;
  var breed = document.getElementById('breed').value;
  var age = document.getElementById('age').value;
  var gender = document.getElementById('gender').value;

  if (petType === '' || breed === '' || age === '' || gender === '') {
    alert('You must fill in all the fields');
  }
}

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
