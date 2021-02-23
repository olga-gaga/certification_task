class Loader {
  constructor() {
    this.loader = document.querySelector('.loader');
    this.toggle = false;
  }

  toggleLoader(toggle) {
    if (this.toggle === toggle) return;
    console.log(this.loader.classList);
    this.loader.classList.toggle('hidden');
    this.toggle = Boolean(toggle);
  }
}

const loader = new Loader();
export default loader;
