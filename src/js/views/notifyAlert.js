class NotifyView {
  constructor() {
    this.container = document.querySelector('.errors');
    this.message = 'Something went wrong';
  }

  renderNotify({ message = this.message } = {}) {
    const date = Date.now();
    const template = NotifyView.notifyTemplate({ date, message });
    this.container.insertAdjacentHTML('beforeend', template);
    NotifyView.addRemoveTimer(date);
  }

  static addRemoveTimer(date = 0) {
    setTimeout(() => {
      const notify = document.querySelector(`[data-time="${date}"]`);
      if (notify) {
        notify.remove();
      }
    }, 2000);
  }

  static notifyTemplate({ date, message } = {}) {
    return `
    <div class="alert alert-dark" data-time="${date}" role="alert">
      ${message}
    </div>`;
  }
}

const notifyView = new NotifyView();
export default notifyView;
