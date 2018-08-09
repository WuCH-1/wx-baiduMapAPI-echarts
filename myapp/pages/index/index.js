const bmap = require('..//libs/bmap-wx.min.js');
Page({
  data: {
    city: '',
    pm25: '',
    date: '',
    temperature: '',
    weatherDesc: '',
    wind: '',
  },
  onLoad: function () {
    let that = this; 
    // 新建百度地图对象 
    let BMap = new bmap.BMapWX({
      ak: '你自己的百度AK'
    });
    let success = function (data) {
      let weatherData = data.currentWeather[0];
      var app = getApp();
      app.wData = data;
      that.setData({
        city: weatherData.currentCity,
        pm25: weatherData.pm25,
        date: weatherData.date,
        temperature: weatherData.temperature,
        weatherDesc: weatherData.weatherDesc,
        wind: weatherData.wind,
      });
    }
    // 发起weather请求 
    BMap.weather({
      success: success
    });
  }
})