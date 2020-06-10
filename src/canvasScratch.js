/* eslint-disable */
var isMobile = function isMobile() {
  var check = false;

  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);

  return check;
};

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
