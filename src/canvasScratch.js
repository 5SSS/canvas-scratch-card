/* eslint-disable */
function isMobile() {
  return 'ontouchstart' in window;
}

var canvasScratchCard = {
  img: null,
  fillColor: null,
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
  init: function init(_ref) {
    var dom = _ref.dom,
      image = _ref.image,
      fillColor = _ref.fillColor,
      _ref$r = _ref.r,
      r = _ref$r === void 0 ? 20 : _ref$r,
      _ref$rate = _ref.rate,
      rate = _ref$rate === void 0 ? 0.5 : _ref$rate,
      _ref$callback = _ref.callback,
      callback = _ref$callback === void 0 ? function () {} : _ref$callback;

    //判断平台
    if (!isMobile()) {
      //PC
      this.isMobile = false;
      this.eventStrat = 'mousedown';
      this.eventMove = 'mousemove';
      this.eventEnd = 'mouseup';
    }

    var canvas = document.createElement('canvas');
    var tempcanvas = document.createElement('canvas');
    canvas.style.cssText = 'width: 100%; height: 100%;';
    tempcanvas.width = canvas.width = dom.offsetWidth;
    tempcanvas.height = canvas.height = dom.offsetHeight;
    dom.innerHTML = null;
    dom.appendChild(canvas);
    this.tempcvs = tempcanvas;
    this.cvs = canvas;
    this.tempcxt = tempcanvas.getContext('2d');
    this.cxt = canvas.getContext('2d');
    this.r = r;
    this.rate = rate;
    this.callback = callback; // use color

    if (!!fillColor) {
      this.fillColor = fillColor;
      this.draw({
        fillColor: fillColor,
      });
      return false;
    } // use image

    var img = new Image();
    var that = this;

    img.onload = function () {
      that.img = img;
      that.draw({
        img: img,
      });
    };

    img.onerror = function () {
      console.error('img load fail. -- canvasScratchCard.js');
    };

    img.src = typeof image === 'string' ? image : image.src;
  },
  callback: function callback() {},
  draw: function draw(_ref2) {
    var img = _ref2.img,
      fillColor = _ref2.fillColor;
    var that = this;
    this.tempcxt.fillStyle = '#000';
    this.tempcxt.fillRect(0, 0, this.tempcvs.width, this.tempcvs.height);

    if (!!fillColor) {
      this.cxt.fillStyle = fillColor;
      this.cxt.fillRect(0, 0, this.cvs.width, this.cvs.height);
    } else {
      this.cxt.drawImage(img, 0, 0, this.cvs.width, this.cvs.height);
    } // event

    this.foos = function (e) {
      that.start(e);
    };

    this.foom = function (e) {
      that.move(e);
    };

    this.fooe = function (e) {
      that.end(e);
    };

    this.cvs.addEventListener(this.eventStrat, this.foos, {
      passive: false,
    });
    this.cvs.addEventListener(this.eventMove, this.foom, {
      passive: false,
    });
    this.cvs.addEventListener(this.eventEnd, this.fooe, {
      passive: false,
    });
  },
  start: function start(e) {
    e.preventDefault();
    this.isDown = true;
    var pot = this.getBound(e);
    this.clip(pot.x, pot.y, this.r);
  },
  move: function move(e) {
    e.preventDefault();

    if (this.isDown) {
      var pot = this.getBound(e);
      this.clip(pot.x, pot.y, this.r);
    }
  },
  end: function end() {
    this.isDown = false;

    if (this.cale() > this.cvs.width * this.cvs.height * this.rate) {
      this.callback();
    }
  },
  getBound: function getBound(e) {
    var point = {
      x: 0,
      y: 0,
    };

    var _this$cvs$getBounding = this.cvs.getBoundingClientRect(),
      left = _this$cvs$getBounding.left,
      top = _this$cvs$getBounding.top;

    if (this.isMobile) {
      point.x = Math.round(e.touches[0].pageX - left);
      point.y = Math.round(e.touches[0].pageY - top);
    } else {
      point.x = Math.round(e.clientX - left);
      point.y = Math.round(e.clientY - top);
    }

    return point;
  },
  clip: function clip(x, y, r) {
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
  cale: function cale() {
    var num = 0;
    var imageData = this.tempcxt.getImageData(
      0,
      0,
      this.tempcvs.width,
      this.tempcvs.height
    );
    var pixeData = imageData.data;

    for (var i = 0; i < this.tempcvs.width * this.tempcvs.height; i++) {
      if (pixeData[4 * i + 3] == 0) {
        num++;
      }
    }

    return num;
  },
  clear: function clear() {
    this.cxt.clearRect(0, 0, this.cvs.width, this.cvs.width);
    this.tempcxt.clearRect(0, 0, this.tempcvs.width, this.tempcvs.width);
    this.cvs.removeEventListener(this.eventStrat, this.foos);
    this.cvs.removeEventListener(this.eventMove, this.foom);
    this.cvs.removeEventListener(this.eventEnd, this.fooe);
  },
  reset: function reset() {
    this.draw({
      img: this.img,
      fillColor: this.fillColor,
    });
  },
};

exports.default = canvasScratchCard;
