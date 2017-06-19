import $ from 'jquery';

const Animater = function () {
  this.canvas = $('#start-img')[0]; 
  this.ctx = this.canvas.getContext('2d');
  this.curFrame = 0;
}

Animater.prototype = {
  init() {
    var canvas = this.canvas;
    var ctx = this.ctx;
    var w = $('#masker').width(),
        h = $('#masker').height();

    var getRatio = this.getPixelRatio(ctx);
    if (getRatio.devicePixelRatio !== getRatio.backingStoreRatio) {
      canvas.width = w * getRatio.ratio;
      canvas.height = h * getRatio.ratio;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.scale(getRatio.ratio, getRatio.ratio);
    } else {
      canvas.width = w;
      canvas.height = h;
    }

    this.w = w;
    this.h = h;

    if(this.timer) {
      clearInterval(this.timer);
    }

    this.continue();
  },

  getPixelRatio(context) {
    var devicePixelRatio = window.devicePixelRatio || 1;
    var backingStoreRatio = context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;
    var ratio = devicePixelRatio / backingStoreRatio;

    return {
      'devicePixelRatio': devicePixelRatio,
      'backingStoreRatio' : backingStoreRatio, 
      'ratio' : ratio
    }
  },

  drawPic() {
    var p = window.result[this.curFrame];

    this.ctx.clearRect(0,0,this.w,this.h);

    p && this.ctx.drawImage(
      p,
      0,
      0,
      p.naturalWidth,
      p.naturalHeight,
      0,
      0,
      this.w,
      this.h
    )
  },

  start() {
    if(this.curFrame >= window.result.length) {
      this.curFrame = 29;
    }
    
    this.drawPic();
    this.curFrame++;
  },

  continue() {
    clearInterval(window.timer);
    window.timer = setInterval(this.start.bind(this), 1000 / 20);
  },

  stop() {
    clearInterval(this.timer);
  }
};

export default Animater;
