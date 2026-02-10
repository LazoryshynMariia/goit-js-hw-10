import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector("form")

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const delay = Number(form.elements.delay.value);
    const state = form.elements.state.value;

    console.log("Delay:", delay, "State:", state);

    const message = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    
    });
    
    message
        .then(value => iziToast.success({
            message: `✅ Fulfilled promise in ${value}ms`,
            backgroundColor: '#59a10d',
            position: 'topRight'
        }))
        .catch(error => iziToast.error({
            message: `❌ Rejected promise in ${error}ms`,
            backgroundColor: '#ef4040',
            position: 'topRight'
        }));
};
