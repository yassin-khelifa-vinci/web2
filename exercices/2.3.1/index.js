const btn = document.querySelector('#btn');
const div = document.querySelector('#msgBox1');
const text = document.querySelector('#wish');

btn.addEventListener('click', () => {
    div.innerHTML = `${text.value}`;
});