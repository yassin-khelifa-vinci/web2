const counter = document.querySelector('#counter');

const comments = document.querySelector('#comments');

window.addEventListener('click', () => {
    counter.innerText++;
    if (counter.innerText > 9 ) comments.innerText = 'Vous êtes passé maître en l\'art du clic !'; 
    else if (counter.innerText > 4) comments.innerText = 'Bravo, bel échauffement !';
});
