import $ from 'jquery';
import Animater2 from './Animater2.js';


var has = 0;
var index = 0;
var changeResArr = [0,-230,-670,-1100,-1400,-1460,-1700];
var cfg = {
  step: parseInt($('.swiper-slide').height()),
  max: 70,
  min: parseInt($('.swiper-container').height()) - parseInt($('.swiper-wrapper').height()) - 140
};
var indexAbs = 0;

export default function () {
  

  $('.swiper-slide').removeClass('active').eq(index).addClass('active')
  $('#slide').bind("touchstart",function(e){
    //记录初始位置
    cfg.start = e.originalEvent.targetTouches[0].clientY;
    cfg.cur = parseInt($('.swiper-wrapper').css('top'));
  }).bind('touchmove', function (e) {
     e.preventDefault()
     e.stopPropagation(); 
  });

   $('#slide').bind("touchend", function(e) {
    var end = e.originalEvent.changedTouches[0].clientY;
    let offset = end - cfg.start;    //移动的距离

    if(offset>0){ //向下
      indexAbs--;
      if(indexAbs <= 0) {
        indexAbs = 0;
      }
      up(indexAbs, true);
    } else {//向上
      indexAbs++;
      if(indexAbs >= 7) {
        indexAbs = 7;
      }
      down(indexAbs, true);
    }

    $('.swiper-slide').removeClass('active').eq(indexAbs).addClass('active')
  })
}

function up(num, isEnd) {
  var res = changeResArr[indexAbs];
  $('.swiper-wrapper').css('top', res);
}

var animater;

function down(num, isEnd) {
  if(num > 7) {
    return;
  }
  if(num == 7) {

    animater = new Animater2();
    animater.init();

    num++;

    $('.move-tip').hide();
    $('.swiper-container').hide();
    $('.run-people').css('bottom', '-20px');

    window.timer3 = setTimeout(function() {
      $('.before-share').show();
    }, 1000);
    
    window.timer1 = setTimeout(function() {
      $('.share-btn-wrap').css('display', 'block').css('opacity', '1');
      $('.before-share').remove();
      window.timer2 = setTimeout(function() {
        $('.share-btn').addClass('share-btn-enter');
      }, 500);
    }, 4000);

    return;
  }
  var res = changeResArr[indexAbs];
  $('.swiper-wrapper').css('top', res);
}
