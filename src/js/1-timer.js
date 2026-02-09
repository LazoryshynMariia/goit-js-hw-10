import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("#datetime-picker");
const start = document.querySelector("[data-start]");
const days= document.querySelector("[data-days]");
const hours = document.querySelector("[data-hours]");
const minutes = document.querySelector("[data-minutes]");
const seconds = document.querySelector("[data-seconds]");

let userSelectedDate = null;
let intervalId = null;

start.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        let selectedDate = selectedDates[0];
        if (selectedDate <= new Date()) {
            iziToast.show({
                message: 'Please choose a date in the future',
                backgroundColor: '#ef4040',
                position:'topRight'
            });
            start.disabled = true;
        } else {
            userSelectedDate = selectedDate;
            start.disabled = false;
        };
    }
}
flatpickr(input, options);

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

start.addEventListener("click", () => {
  start.disabled = true;
  input.disabled = true;

  intervalId = setInterval(() => {
    const ms = userSelectedDate - new Date();

    if (ms <= 0) {
      clearInterval(intervalId);
      days.textContent = "00";
      hours.textContent = "00";
      minutes.textContent = "00";
      seconds.textContent = "00";
      input.disabled = false;
      return;
    }

    const time = convertMs(ms);
    days.textContent = addLeadingZero(time.days);
    hours.textContent = addLeadingZero(time.hours);
    minutes.textContent = addLeadingZero(time.minutes);
    seconds.textContent = addLeadingZero(time.seconds);

  }, 1000);
});