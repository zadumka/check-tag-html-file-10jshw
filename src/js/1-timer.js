import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('button[data-start]');
const dateTimePicker = document.querySelector('#datetime-picker');

let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    const currentDate = new Date();
    if (selectedDate.getTime() <= currentDate.getTime()) {

      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future!',
        position: 'topRight',
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(dateTimePicker, options);

const daysEl = document.querySelector('.value[data-days]');
const hoursEl = document.querySelector('.value[data-hours]');
const minsEl = document.querySelector('.value[data-minutes]');
const secsEl = document.querySelector('.value[data-seconds]');
function updateClock({ days, hours, mins, secs }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minsEl.textContent = `${mins}`;
  secsEl.textContent = `${secs}`;
}

class Timer {
  constructor({ onTick }) {
    this.isActive = false;
    this.onTick = onTick;
  }

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    setInterval(() => {
      const currentTime = Date.now();

      const deltaTime = selectedDate - currentTime;
      const time = this.getTime(deltaTime);
      this.onTick(time);
    }, 1000);
  }
  getTime(value) {
    const days = this.pad(Math.floor(value / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((value % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((value % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer({
  onTick: updateClock,
});

startBtn.addEventListener('click', timer.start.bind(timer));
