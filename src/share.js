import $ from 'jquery';

setTimeout(function () {
  $.get('http://api.holyhilab.com/share', {
    url: window.location.href.split('#')[0]
  }, function(data) {
    data = data.data;
    
    var shareConfig = {
      debug: false,
      appId: data.appId,//php输出参数
      timestamp: data.timestamp,//php输出参数
      nonceStr: data.noncestr,//php输出参数
      signature: data.signature,//php输出参数
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo'
      ]
    }

    var shareAllData = {
      title:'震惊！你家孩子在社交媒体上竟然是这样的……',
      desc:'妈妈不在家，双胞胎竟然...',
      imgUrl:'http://cdn.holyhilab.com/meta.png',
      link:'http://h5.holyhilab.com/capri-sun/'
    }

    wx.config(shareConfig);
    wx.ready(function () {
      wx.onMenuShareAppMessage(shareAllData);
      wx.onMenuShareTimeline({
        title: shareAllData.desc,
        link: shareAllData.link,
        imgUrl: shareAllData.imgUrl,
        desc: shareAllData.desc
      });

      $('.js-video').get(0).load();
      $('.js-video-2').get(0).load();
      $('#ling')[0].load();
    });
  }); 
}, 2000);
