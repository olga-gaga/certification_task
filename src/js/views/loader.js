class Loader {
  constructor() {
    this.loader = document.querySelector('.loader');
    this.toggle = false;
  }

  toggleLoader(toggle) {
    if (this.toggle === toggle) return;
    this.loader.classList.toggle('hidden');
    this.toggle = Boolean(toggle);
  }
}

const loader = new Loader();
export default loader;
