import $ from 'jquery';
import { preLoad } from 'common/js/base.js';
/**
 * 加载完全部才执行
 */
var pics = [],
  pics2 = [
    
  ]
window.imgcan = 0;

for(var i = 1; i <= 62; i++) {
  var start = i >= 30 ? 2 : 1;

  if(i < 10) {
    i = '0' + i;
  }

  pics.push(`${start}_000${i}.jpg`);
}

var l = pics.length,
  result = [],
  index = 0;

function loadImages(pics, callback) {
  if (pics.length) {
    var img = new Image(),
      pic = pics.shift();


    preLoad(ENV_OPT.cdnURL + pic).then((index => {

      return pic => {
        result[index] = pic;
        callback();
      }
    })(index)).catch((index => {

      return _ => {
        result[index] = false;
        callback();
      }
    })(index))

    index++;

    loadImages(pics, callback);
  } else {
    return;
  }
}

export default function (cb) {
  var per = 0,
    totalW = parseInt($('.progress').width()),
    has = false;

  loadImages(pics, function() {
    var p = result.length / l;
    $('.child').width(p * 95 + '%');

    if (p === 1 && !has) {
      has = true;
      window.imgcan = 1;
      window.result = result;
      if(window.canplay) {
        cb();
        preLoad(ENV_OPT.cdnURL + 'phone_bg.jpg');
      } else {
        $('.js-video').get(0).load();
        $('.js-video-2').get(0).load();
      }
    };
  })  
}

