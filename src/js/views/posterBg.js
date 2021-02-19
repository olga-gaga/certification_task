class PosterBg {
  constructor() {
    this.container = document.querySelector('.poster-page-bg');
    // this.backgrond = 'linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(82, 15, 117) 100%)';
    this.currentBg = null;
  }

  changePoster(newBg) {
    if (!newBg) return;
    if (newBg !== this.currentBg) {
      this.currentBg = newBg;
      console.log(newBg);
      this.container.style.backgroundImage = this.currentBg;
    }
  }
}

const posterBg = new PosterBg();
export default posterBg;
