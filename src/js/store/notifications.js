class Notifications {
  constructor() {
    this.messagePool = [];
  }

  set notifyMessage(message) {
    if (message) {
      this.messagePool.push(message);
    }
  }

  get notifyMessage() {
    return this.messagePool[this.messagePool.length - 1] || '';
  }
}

const notify = new Notifications();
export default notify;
