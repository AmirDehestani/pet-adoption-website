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
