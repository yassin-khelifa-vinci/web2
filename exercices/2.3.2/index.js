const divs = document.querySelectorAll('.color-div');

divs.forEach((div) => {
  div.addEventListener('click', (e) => {
    div.style.height = '200px';
    div.style.width = '200px';
    div.innerHTML = e.target.style.backgroundColor;
  });
});

