const HomePage = () => {
  const main = document.querySelector('main');
  fetch('https://v2.jokeapi.dev/joke/Any?type=single')
    .then((response) =>  response.json())
    .then((data) => {
      main.innerHTML = `<h1>${data.joke}</h1>`;
      main.innerHTML += `<p>${data.category}</p>`;
    });
};

export default HomePage;
