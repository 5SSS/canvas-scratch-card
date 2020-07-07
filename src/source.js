const isMobile = () => {
  return 'ontouchstart' in window;
};

export const canvasCard = {
  img: null,
  cvs: null,
  cxt: null,
  tempcvs: null,
  tempcxt: null,
  isDown: false,
  r: null,
  rate: 0.5,
  isMobile: true,
  eventStrat: 'touchstart',
  eventMove: 'touchmove',
  eventEnd: 'touchend',
  foos: null,
  foom: null,
  fooe: null,
  init({ dom, image, r = 20, rate = 0.5, callback = () => {} }) {
    //判断平台
    if (!isMobile()) {
      //PC
      this.isMobile = false;
      this.eventStrat = 'mousedown';
      this.eventMove = 'mousemove';
      this.eventEnd = 'mouseup';
    }
    this.callback = callback;
    let that = this;
    let img = new Image();
    img.onload = function () {
      let canvas = document.createElement('canvas');
      let tempcanvas = document.createElement('canvas');
      canvas.style.cssText = 'width: 100%; height: 100%;';
      tempcanvas.width = canvas.width = dom.offsetWidth;
      tempcanvas.height = canvas.height = dom.offsetHeight;
      dom.innerHTML = null;
      dom.appendChild(canvas);
      that.tempcvs = tempcanvas;
      that.cvs = canvas;
      that.tempcxt = tempcanvas.getContext('2d');
      that.cxt = canvas.getContext('2d');
      that.r = r;
      that.rate = rate;
      that.img = img;
      that.draw(img);
    };
    img.onerror = function () {
      console.error('img load fail. -- canvasCard.js');
    };
    img.src = typeof image === 'string' ? image : image.src;
  },
  callback() {},
  draw(img) {
    let that = this;
    this.tempcxt.fillStyle = '#000';
    this.tempcxt.fillRect(0, 0, this.tempcvs.width, this.tempcvs.height);
    this.cxt.drawImage(img, 0, 0, this.cvs.width, this.cvs.height);
    // event
    this.foos = function (e) {
      that.start(e);
    };
    this.foom = function (e) {
      that.move(e);
    };
    this.fooe = function (e) {
      that.end(e);
    };
    this.cvs.addEventListener(this.eventStrat, this.foos, { passive: false });
    this.cvs.addEventListener(this.eventMove, this.foom, { passive: false });
    this.cvs.addEventListener(this.eventEnd, this.fooe, { passive: false });
  },
  start(e) {
    e.preventDefault();
    this.isDown = true;
    let pot = this.getBound(e);
    this.clip(pot.x, pot.y, this.r);
  },
  move(e) {
    e.preventDefault();
    if (this.isDown) {
      let pot = this.getBound(e);
      this.clip(pot.x, pot.y, this.r);
    }
  },
  end() {
    this.isDown = false;
    if (this.cale() > this.cvs.width * this.cvs.height * this.rate) {
      this.callback();
    }
  },
  getBound(e) {
    let point = { x: 0, y: 0 };
    let { left, top } = this.cvs.getBoundingClientRect();
    if (this.isMobile) {
      point.x = Math.round(e.touches[0].pageX - left);
      point.y = Math.round(e.touches[0].pageY - top);
    } else {
      point.x = Math.round(e.clientX - left);
      point.y = Math.round(e.clientY - top);
    }
    return point;
  },
  clip(x, y, r) {
    this.cxt.save();
    this.cxt.beginPath();
    this.cxt.arc(x, y, r, 0, 2 * Math.PI);
    this.cxt.clip();
    this.cxt.clearRect(x - r, y - r, x + r, y + r);
    this.cxt.restore();
    this.tempcxt.save();
    this.tempcxt.beginPath();
    this.tempcxt.arc(x, y, r, 0, 2 * Math.PI);
    this.tempcxt.clip();
    this.tempcxt.clearRect(x - r, y - r, x + r, y + r);
    this.tempcxt.restore();
  },
  cale() {
    let num = 0;
    let imageData = this.tempcxt.getImageData(
      0,
      0,
      this.tempcvs.width,
      this.tempcvs.height
    );
    let pixeData = imageData.data;
    for (let i = 0; i < this.tempcvs.width * this.tempcvs.height; i++) {
      if (pixeData[4 * i + 3] == 0) {
        num++;
      }
    }
    return num;
  },
  clear() {
    this.cxt.clearRect(0, 0, this.cvs.width, this.cvs.width);
    this.tempcxt.clearRect(0, 0, this.tempcvs.width, this.tempcvs.width);
    this.cvs.removeEventListener(this.eventStrat, this.foos);
    this.cvs.removeEventListener(this.eventMove, this.foom);
    this.cvs.removeEventListener(this.eventEnd, this.fooe);
  },
  reset() {
    this.draw(this.img);
  },
};
