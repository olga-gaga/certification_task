class PosterBg {
  constructor() {
    this.container = document.querySelector('.poster-page-bg');
    this.currentBg = null;
  }

  changePoster(newBg) {
    if (!newBg || newBg === this.currentBg) {
      return;
    }
    this.currentBg = newBg;
    this.container.style.backgroundImage = this.currentBg;
  }
}

const posterBg = new PosterBg();
export default posterBg;
