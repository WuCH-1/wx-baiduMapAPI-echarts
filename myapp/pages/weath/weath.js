// pages/weath/weath.js
Page({
  data: {
    lifeArr:'',
    date:'',
    
  },
  onLoad: function () {
    let data = getApp().wData;
    let lifeArr = data.originalData.results[0].index;
    let date = data.originalData.results[0].weather_data
    this.setData({
        lifeArr:lifeArr,
        date:date
    });
  }
})