import * as echarts from '../../ec-canvas/echarts';
var lin,maxtt, mintt, weeks

Page({
  data: {
    days:'',
    ec: {
      onInit: function (canvas, width, height) {
        lin = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(lin);
        return lin;
      }
    }
  },
  onLoad (options){
    this.echartsComponnet = this.selectComponent('#mychart');
    let data = getApp().wData;
    let days = data.originalData.results[0].weather_data;
    weeks = days.map((item,index)=>{
        item.date = item.date.substring(0,2);
        return item.date;
    }) 
    let temperatures = days.map((item, index)=>{   
      item = item.temperature.substring(0,item.temperature.length-1).split(' ~ ');
      return item;
    })
    maxtt= temperatures.map((item)=>{
      return item[0]
    })
    mintt = temperatures.map((item) => {
      return item[1]
    })
    let weathers = days.map((item)=>{
      return item.weather
    })
    days.map((item)=>{
      item.icon = getIcon(item.weather);
    })
    function getIcon(item) {
      if (item.indexOf("雨") != -1) {
        return "../img/rain1.png"
      } else if (item.indexOf("雪") != -1) {
        return "../img/snow1.png"
      } else if (item.indexOf("云") != -1 || item.indexOf("阴") != -1) {
        return "../img/cloudy1.png"
      } else if (item.indexOf("霾") != -1) {
        return "../img/haze.png"
      } else if (item.indexOf("晴") != -1) {
        return "../img/sun1.png"
      } else {
        return "../img/sand.png"
      }
    }
    this.setData({
        days:days
    });
   
  },
  getOption:function(){
    var option = {
      title: {
        text: '温度变化曲线',
        left: 'center'
      },
      color: ["#37A2DA", "#67E0E3"],
      legend: {
        data: ['最高气温', '最低气温'],
        top: 30,
        left: 'center',
        z: 100
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },

      xAxis: {
        type: 'category',
        data: weeks,
        boundaryGap: true,
        show: true
      },
      yAxis: {
        x: 'center',
        min: function (value) {
          return value.min - 20;
        },
        max: function (value) {
          return value.max + 10;
        },
        type: 'value',
        scale:true,
        show: true
      },
      series: [{
        name: '最高气温',
        type: 'line',
        smooth: true,
        data: maxtt,
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        }
      }, {
        name: '最低气温',
        type: 'line',
        smooth: true,
        data: mintt,
        label: {
          normal: {
            show: true,
            position: 'bottom'
          }
        }
      }]
    };
    return option;
  },
  onReady(){
    setTimeout(() => { lin.setOption(this.getOption());},400)
  }
});
