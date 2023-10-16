const btn = document.querySelector('#btn');
const div = document.querySelector('#div');

let time;
let counter = 0;

btn.addEventListener('mouseover', timeOut);

btn.addEventListener('click', () => {
    counter++;
    if (counter == 10) {
        clearTimeout(time);
        div.innerHTML += 'You win !';
    }
});

function timeOut() {
    time = setTimeout(() => {
        div.innerHTML += 'Game over, you did not click 10 times within 5s !'
    }, 5000);
}