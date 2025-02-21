import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    if (state === 'fulfilled') {
      setTimeout(() => resolve(delay), delay);
    } else {
      setTimeout(() => reject(delay), delay);
    }
  });
}

const form = document.querySelector('.form');
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = parseInt(this.elements.delay.value);
  const state = this.elements.state.value;

  createPromise(delay, state)
    .then(result => {
      iziToast.success({
        title: 'Fulfilled',
        message: `✅ Fulfilled promise in ${result}ms`,
        position: 'topRight',
      });
    })
    .catch(result => {
      iziToast.error({
        title: 'Rejected',
        message: `❌ Rejected promise in ${result}ms`,
        position: 'topRight',
      });
    });
});
