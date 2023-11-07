import { clearPage, renderPageTitle } from '../../utils/render';
import grootImage from '../../img/groot.jpg';
import stormtrooperImage from '../../img/stormtrooper.jpg';

const HomePage = () => {
  clearPage();
  renderPageTitle('MyMovies');
  const main = document.querySelector('main');
  main.innerHTML = `<div class="text-center">
  <h3>Welcome to myMovies !</h3>

  <p>Here you can find a selection of our favorite movies ; )</p>
  <div class="pb-3">
    <img style="width:50%" src="${grootImage}" alt="Groot" />
  </div>

  <div>
    <img style="width:50%" src="${stormtrooperImage}" alt="Stormtrooper" />
  </div>
</div>;`;

};

export default HomePage;
