import '../css/style.css';
import moviesList from './views/moviesList';
import posterBg from './views/posterBg';

document.addEventListener('DOMContentLoaded', () => {
  init();

  // Elements
  const movieContainer = document.querySelector('.movies-container .row');
  console.log(movieContainer);
  // Events
  movieContainer.addEventListener('mouseover', (e) => {
    console.log(e.target);
    if (e.target.classList.contains('movie-poster')) {
      console.log(e.target.style.backgroundImage);
      posterBg.changePoster(e.target.style.backgroundImage);
    }
  });

  function init() {
    moviesList.createMoviesList();
  }
});
