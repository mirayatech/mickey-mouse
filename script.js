window.addEventListener("DOMContentLoaded", () => {
  const mm = new MickeyMouse(".mickey");
});

class MickeyMouse {
  constructor(el) {
    this.el = document.querySelector(el);

    this.init();
  }
  get isMobile() {
    return "ontouchstart" in document.documentElement;
  }
  get maxDistance() {
    const { innerWidth, innerHeight } = window;

    if (innerWidth > innerHeight) return innerWidth / 2;
    return innerHeight / 2;
  }
  init() {
    const moveEvent = this.isMobile ? "touchmove" : "mousemove";

    document.addEventListener(moveEvent, this.update.bind(this));

    if (this.isMobile)
      document.addEventListener("touchstart", this.update.bind(this));
  }
  update(e) {
    let eX = 0;
    let eY = 0;

    if (this.isMobile) {
      const firstTouch = e.touches[0];
      eX = firstTouch.clientX;
      eY = firstTouch.clientY;
    } else {
      eX = e.clientX;
      eY = e.clientY;
    }

    const x = Math.round(eX - window.innerWidth / 2);
    const y = Math.round(eY - window.innerHeight / 2);
    const max = this.maxDistance;
    const percentX = x / max;
    const percentY = y / max;

    this.el?.style.setProperty("--x", percentX);
    this.el?.style.setProperty("--x-abs", Math.abs(percentX));
    this.el?.style.setProperty("--y", percentY);
    this.el?.style.setProperty("--y-abs", Math.abs(percentY));
  }
}
