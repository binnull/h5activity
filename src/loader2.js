import $ from 'jquery';
import { preLoad } from 'common/js/base.js';
/**
 * 加载完全部才执行
 */
var pics = [],
  pics2 = [
    
  ]
window.imgcan = 0;

for(var i = 0; i < 16; i++) {
  pics.push(`12_028${48+i}.png`);
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

var finish_image = [];

finish_image.push(`${ENV_OPT.cdnURL}hangup.png`);
finish_image.push(`${ENV_OPT.cdnURL}receive.png`);
finish_image.push(`${ENV_OPT.cdnURL}phone_bg.jpg`);

for(var j = 0;j < finish_image.length;j++) {
  var fin_img = new Image();
  fin_img.src = finish_image[j];
  fin_img.onload = function() {
  }
}



export default function (cb) {
  var per = 0,
    totalW = parseInt($('.progress').width()),
    has = false;

  loadImages(pics, function() {
    var p = result.length / l;

    if (p === 1 && !has) {
      has = true;
      window.run_people = result;
    };
  })  
}

