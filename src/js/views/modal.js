import { MoviesList } from './moviesList';

class Modal {
  constructor() {
    this.container = document.querySelector('.modal-container');
  }

  showModal(movie) {
    if (!movie) return;
    this.changeModalContainer(movie);
    this.toggleClasses();
  }

  closeModal() {
    const child = this.container.children[0];
    if (child) {
      this.container.removeChild(child);
      this.toggleClasses();
    }
  }

  toggleClasses() {
    this.container.classList.toggle('hidden');
    document.body.classList.toggle('modal-open');
  }

  changeModalContainer(movie) {
    const fragment = Modal.modalTemplate(movie);
    this.container.insertAdjacentHTML('afterbegin', fragment);
  }

  static overlayTemplate() {
    return '<div class="modal-backdrop show"></div>';
  }

  static starsTemplate(rating) {
    const ceilRating = Math.ceil(rating);
    const filledStar = `
      <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" class="svg-inline--fa fa-star fa-w-18 " 
      role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
        <path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 
        46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 
        17.8c-11.7-23.6-45.6-23.9-57.4 0z"> </path>
      </svg>`;
    const halfFilledStar = `
      <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" class="svg-inline--fa fa-star fa-w-18 " 
      role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
        <path fill="currentColor" d="M508.55 171.51L362.18 150.2 296.77 17.81C290.89 5.98 279.42 0 267.95 0c-11.4 0-22.79 5.9-28.69 
        17.81l-65.43 132.38-146.38 21.29c-26.25 3.8-36.77 36.09-17.74 54.59l105.89 103-25.06 145.48C86.98 495.33 103.57 512 122.15 512c4.93 
        0 10-1.17 14.87-3.75l130.95-68.68 130.94 68.7c4.86 2.55 9.92 3.71 14.83 3.71 18.6 0 35.22-16.61 31.66-37.4l-25.03-145.49 
        105.91-102.98c19.04-18.5 8.52-50.8-17.73-54.6zm-121.74 123.2l-18.12 17.62 4.28 24.88 19.52 113.45-102.13-53.59-22.38-11.74.03-317.19 
        51.03 103.29 11.18 22.63 25.01 3.64 114.23 16.63-82.65 80.38z"></path>
      </svg>`;
    const unfilledStar = `
      <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" class="svg-inline--fa fa-star fa-w-18 " 
      role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
        <path fill="currentColor" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 
        36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 
        105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 
        139 20.2-100.6 98z"></path>
      </svg>`;
    let fragment = '';
    for (let i = 0; i < Math.round(rating); i++) {
      fragment += filledStar;
    }
    if ((ceilRating - rating) * 10 > 5) {
      fragment += halfFilledStar;
    }
    if (ceilRating < 10) {
      for (let i = 0; i < 10 - ceilRating; i++) {
        fragment += unfilledStar;
      }
    }
    return fragment;
  }

  static modalTemplate({
    Poster, Title, imdbRating, Plot, Year, Runtime, Genre,
    Production, Country, Director, Writer, Actors, Awards,
  } = {}) {
    return `
      <div>
        <div class="modal fade show" role="dialog" tabindex="-1" style="display: block;">
          <div class="modal-dialog sc-EHOje hSpdwA modal-xl" role="document">
            <div class="modal-content">
              <div class="sc-bZQynM kWyGiU modal-header">
                <h5 class="modal-title">Movie view</h5>
                <button type="button" class="close" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div class="sc-gzVnrw bwGZMA modal-body">
                <div class="row">
                  <div class="col-12 col-sm-4">
                    <div class="mb-3 sc-VigVT htVHHo">
                      ${MoviesList.noPosterTemplate(Poster)}
                    </div>
                  </div>
                  <div class="col-12 col-sm-8">
                    <h3 class="sc-kAzzGY duMhxZ">${Title}</h3>
                    <div class="my-2 sc-chPdSV hEtnib">
                      <span class="text-warning mr-2"> ${Modal.starsTemplate(imdbRating)} </span> ${imdbRating} / 10
                    </div>
                    <div class="lead"> ${Plot} </div>
                    <div class="my-3 mb-4">
                      <span class="mr-2 badge badge-success">${Year}</span>
                      <span class="mr-2 badge badge-success">${Runtime}</span>
                      <span class="mr-2 badge badge-success">${Genre}</span>
                    </div>
                    <table class="table small">
                      <tbody>
                        <tr>
                          <th>Production</th>
                          <td>${Production}</td>
                        </tr>
                        <tr>
                          <th>Country</th>
                          <td>${Country}</td>
                        </tr>
                        <tr>
                          <th>Director</th>
                          <td>${Director}</td>
                        </tr>
                        <tr>
                          <th>Writer</th>
                          <td>${Writer}</td>
                        </tr>
                        <tr>
                          <th>Actors</th>
                          <td>${Actors}</td>
                        </tr>
                        <tr>
                          <th>Awards</th>
                          <td>${Awards}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-backdrop fade show"></div>
      </div>      
    `;
  }
}

const modal = new Modal();
export default modal;
