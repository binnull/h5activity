import $ from 'jquery';
import 'common/scss/index.scss';
import { preLoad } from 'common/js/base.js';
// 加载控制
import loader from './loader.js';
import loader2 from './loader2.js';
// 首屏动画控制
import Animater from './Animater.js';
//分享
import './share.js';
//slider
import bindSlide from './slider.js';

window.canplay = 0;

var animater;

$(window).resize(function() {
  var meta_content = document.getElementsByTagName("meta");
  if( $(window).width() > $(window).height() ) {
    var width1 = $(window).width() / $(window).height() * 640
    meta_content[0]["content"] = "user-scalable=no, width=" + width1;
  } else {
    meta_content[0]["content"] = "user-scalable=no, width=640";
  }
});

/**
 * 开始动画的控制
 */
document.addEventListener("WeixinJSBridgeReady",function(){
  $('.js-video').get(0).load();
  $('.js-video-2').get(0).load();
  $('#ling')[0].load();
  $('#slidemusic')[0].load();
},!1);

function startCb() {
  window.imgcan = 0;
  window.canplay = 0;
  $('.child').width('100%');

  setTimeout(function () {
    $('#masker').fadeIn();
    $('.js-video-wrapper').css('display', 'block');

    setTimeout(function() {
      $('#loading').fadeOut();
    }, 1000);

    animater = new Animater();
    animater.init();
  }, 500)

}

loader(startCb)
loader2();

//视频可以进行播放的时候
$('.js-video').get(0).addEventListener('canplaythrough',function(){
  window.canplay = 1;

  if(window.imgcan) {
    startCb();
  }
})

//控制铃声时间
$('.js-video').on('playing', function(e) {
  event.preventDefault();

  setTimeout(function () {
    $('#ling')[0].play();
  }, 65 * 1000);
});

//第一段视频播完，展示语音页面
$('.js-video').get(0).addEventListener('timeupdate', function(data) {
  if(this.currentTime > 65.8) {
    $('#phone')
      .css('z-index', '11000')
    $('.js-video-wrapper').css('display', 'none');
  }
});
$('.js-video').on('ended',function(){
  $('#phone')
    .animate({
      'opacity': '1'
    }, 500 ,function() {
      
      $('.js-video-wrapper-2').css('display', 'block');
      bindSlide();
    });
})  


//点击接听
$('.right').click(function () {
  $('.clouds-wrap').show();
  $('.js-video-wrapper-2').show();
  $('#phone').remove();
  $('#ling').remove()
  $('.js-video-2')[0].play();
  $('#slide').show();
});

//第二段视频结束，播放h5  (slide)
$('.js-video-2').on('ended',function(){
  $('.js-video-wrapper-2').animate({opacity:0});
  $('#slide').animate({'opacity':'1'});
  $('#slidemusic')[0].play();
  setTimeout(function () {
    $('#slidemusic')[0].play();
  }, 0)
  $('.move-tip').show();
  
  setTimeout(function () {
    $('.js-video-wrapper-2').remove();
  }, 1000);
})

//left-finger点击，出分享
$('.share-btn').on('touchstart', function() {
  $('.share-btn').addClass('share-btn-click');
  $('.share').css('opacity', '1');
  $('.share-mask').show();
}).on('touchend', function() {
  $('.share-btn').removeClass('share-btn-click');
});



var has = 0;

var cfg = {
  max: $('#masker').height() - window.innerHeight
}

//拖动开始播放视频
$('#masker').on('touchstart', function(e) {
  event.preventDefault();
  animater.stop();
  cfg.start = e.originalEvent.targetTouches[0].clientY;
  cfg.cur = parseInt($(this).css('top') )|| 0
}).on('touchmove', function(e) {
  event.preventDefault();

  var changed = e.originalEvent.targetTouches[0].clientY - cfg.start;
  var result = cfg.cur + changed;
  var max = -cfg.max + 10;

  result > 0 ? result = 0 : '';
  result < max ? result = max : '';

  cfg.changed = changed;
  $(this).css('top', result);
}).on('touchend',function(){
  if(has) {
    return;
  }

  if (cfg.changed < -10) {
    has = 1;

    $('#masker').css('top', -215 + 'px');

    $('.js-video').get(0).play();
      $('.js-video-wrapper').show();
      $('#masker').remove();

    setTimeout(function () {
    }, 500);
  } else {
    animater.continue();
  }
})

$(document).on('touchmove', function(e) {
  event.preventDefault();
});



