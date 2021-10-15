/**
 * 如何使用:
 * 1,在组件.json文件引入
 *   如:"time-picker": "/common/component/timeDataPiker/timeDataPiker"
 * 2,在组件.wxss文件里加入模板
 *   如: <time-picker pickerShow="{{isPickerShow}}" id="picker" 
 *        wx:if="{{isPickerRender}}"config="{{pickerConfig}}" bind:timeData="searchTime"
 *        bind:timeReset="timeReset"></time-picker>
 * 3,在组件js文件的data里加入配置项
 *   isPickerRender: false, 控制组件隐藏显示
 *   isPickerShow: false,   控制组件隐藏显示
 *   pickerConfig: {
 *     isTimeFrame: false,  是否显示开始结束时间框
 *     clear:'清空时间', 重置按钮文本
 *     isWeek:true   是否显示上午下午
 *   }
 * 4,bind:timeData="searchTime" 获取时间 * 5,bind:timeReset="timeReset" 重置时间
 */

var now = new Date();
var yearData = now.getFullYear(); //得到年份
var monthData = now.getMonth(); //得到月份
var monthDataRel = now.getMonth() + 1; //得到月份

var dayData = now.getDate(); //得到日期

Component({

  behaviors: [],

  properties: {
    pickerShow: {
      type: Boolean,
      observer: function (val) { //弹出动画
        if (val) {
          let animation = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
          });
          let animationOpacity = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
          });
          setTimeout(() => {
            animation.bottom(0).step();
            animationOpacity.opacity(0.7).step();
            this.setData({
              animationOpacity: animationOpacity.export(),
              animationData: animation.export()
            })
          }, 0);
        } else {
          let animation = wx.createAnimation({
            duration: 100,
            timingFunction: "ease"
          });
          let animationOpacity = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
          });
          animation.bottom(-320).step();
          animationOpacity.opacity(0).step();
          this.setData({
            animationOpacity: animationOpacity.export(),
            animationData: animation.export()
          });
        }
        this.setData({
          // startValue: '',
          // endValue: '',
          timeDataValue: '',
          isSrue: true,
          // value: [yearData - 1990, monthData, dayData-1],
        })
      }
    },
    config: {
      type: Object,
      observer(newVal, oldVal, changedPath) {

      }
    },
  },


  data: {
    startValue: '', //开始时间
    endValue: '', // 结束时间
    timeDataValue: '', // 不选择开始时间结束时间的时间
    isPicking: false,
    isStartEnd: 0,
    isSrue: true,
    currentWheel: [],
    time1stamp: 0,
    time2stamp: 0,
  }, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      this._initTimeArray();
    },
    moved: function () {},
    detached: function () {},
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {}, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function () {
    this._init();
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {},
    hide: function () {},
    resize: function () {},
  },

  methods: {
    // 取消
    _pickerHide: function () {
      this.setData({
        pickerShow: false,
      });
    },
    //滚动开始
    handlePickStart: function (e) {
      this.setData({
        isPicking: true
      })
    },
    //滚动结束
    handlePickEndFirst: function (e) {
      this.setData({
        isPicking: false,
      })
    },
    // 监控滑动
    changeDateTime: function (e) {
      
      this._calculation(e);
    },
    // 重新计算天数
    _calculation: function (e) {
      let year = 1990;
      let month = 1;
      let day = 1;
      let week = '';
      for (let i = 0; i <= e.detail.value.length; i++) {
        if (i == 0) {
          year = year + e.detail.value[i]
        }
        if (i == 1) {
          month = month + e.detail.value[i]
        }
        if (i == 2) {
          day = day + e.detail.value[i]
        }

        if (i == 3) {
          if (e.detail.value[i] == 0) {
            week = '全天'
          }
          if (e.detail.value[i] == 1) {
            week = '上午'
          }
          if (e.detail.value[i] == 2) {
            week = '下午'
          }

        }
        let days = [];
        for (let i = 1; i <= this.getDays(year, month); i++) {
          days.push(i);
        }
        this.setData({
          days,
        })
      }
      this._selectionPeriod(year, month, day, week);
    },
    // 重新计算天数
    getDays: function (year, month) {
      let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (month === 2) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ?
          29 :
          28;
      } else {
        return daysInMonth[month - 1];
      }
    },
    // 获取默认时间为今日时间
    _init: function () {
      this.setData({
        value: [yearData - 1990, monthData, dayData - 1],
      });
    },
    // 初始化时间列表
    _initTimeArray: function () {
      const date = new Date();
      const years = [];
      const months = [];
      const days = [];
      const weeks = ['全天', '上午', '下午'];

      for (let i = 1990; i <= date.getFullYear() + 50; i++) {
        years.push(i)
      }
      for (let i = 1; i <= 12; i++) {
        months.push(i)
      }
      for (let i = 1; i <= 31; i++) {
        days.push(i)
      }

      this.setData({
        years,
        months,
        days,
        weeks
      })
    },
    // 重置
    _reset: function () {
      this.setData({
        endValue: '',
        startValue: '',
        timeDataValue: ''
      })
      if (this.data.config.isTimeFrame) {
        this.setData({
          isSrue: false,
        });
      } else {
        this.triggerEvent('timeReset', {
          'timeData': this.data.timeDataValue
        });
        this.setData({
          pickerShow: false,
        });
      }

    },
    // 点击选择开始时间
    _getStartValue: function (e) {
      if (this.data.currentWheel.length != 0) {
        var y = ''
        var m = ''
        var d = ''
        var w = ""
        for (let i = 1; i <= this.data.currentWheel.length; i++) {
          if (i = 1) {
            y = this.data.currentWheel[i - 1]
          }
          if (i = 2) {
            m = this.data.currentWheel[i - 1]
          }
          if (i = 3) {
            d = this.data.currentWheel[i - 1]
          }
          if (i = 4) {
            w = this.data.currentWheel[i - 1]
          }
        }
        this.setData({
          startValue: y + '-' + m + '-' + d + '-' + w,
          isStartEnd: 1,
        })
      } else {
        var y = ''
        var m = ''
        var d = ''
        var w = ""
        for (let i = 1; i <= this.data.value.length; i++) {
          if (i = 1) {
            y = this.data.value[i - 1] + 1990
          }
          if (i = 2) {
            m = this.data.value[i - 1] + 1
          }
          if (i = 3) {
            d = this.data.value[i - 1] + 1
          }

        }
        this.setData({

          startValue: y + '-' + m + '-' + d + '-' + '全天',
          isStartEnd: 1,
        })
      }

    },
    // 点击选择结束时间
    _getEndValue: function () {
      if (this.data.currentWheel.length != 0) {
        var y = ''
        var m = ''
        var d = ''
        var w = ""
        for (let i = 1; i <= this.data.currentWheel.length; i++) {
          if (i = 1) {
            y = this.data.currentWheel[i - 1]
          }
          if (i = 2) {
            m = this.data.currentWheel[i - 1]
          }
          if (i = 3) {
            d = this.data.currentWheel[i - 1]
          }
          if (i = 4) {
            w = this.data.currentWheel[i - 1]
          }
        }
        this.setData({
          endValue: y + '-' + m + '-' + d + '-' + w,
          isStartEnd: 2,
        })
      } else {
        var y = ''
        var m = ''
        var d = ''
        for (let i = 1; i <= this.data.value.length; i++) {
          if (i = 1) {
            y = this.data.value[i - 1] + 1990
          }
          if (i = 2) {
            m = this.data.value[i - 1] + 1
          }
          if (i = 3) {
            d = this.data.value[i - 1] + 1
          }

        }
        this.setData({
          endValue: y + '-' + m + '-' + d + '-' + '全天',
          isStartEnd: 2,
        })
      }

    },
    // 滑动选择时间
    _selectionPeriod: function (year, mouth, day, week) {
      // this.setData({
      //   timeDataValue: year + '-' + mouth + '-' + day + '-' + week,
      // })
      if (this.data.config.isTimeFrame) {
        if (this.data.isStartEnd == 1) {
          this.setData({
            currentWheel: [year, mouth, day, week],
            startValue: year + '-' + mouth + '-' + day + '-' + week,
          })
        } else if (this.data.isStartEnd == 2) {
          this.setData({
            currentWheel: [year, mouth, day, week],
            endValue: year + '-' + mouth + '-' + day + '-' + week,
          })
        }
      } else {
        this.setData({

          timeDataValue: year + '-' + mouth + '-' + day + '-' + week,
        })
      }
    },
    // 确认
    onConfirm: function () {
      if (this.data.isSrue) {
        if (this.data.isPicking) {
          return
        }
        if (this.data.config.isTimeFrame) {
          if (!this.data.startValue) {
            wx.showToast({
              icon: "none",
              title: "请选择开始时间"
            });
            return
          }
          if (!this.data.endValue) {
            wx.showToast({
              icon: "none",
              title: "请选择结束时间"
            });
            return
          }
          var startList = this.data.startValue.split('-');
          var endList = this.data.endValue.split('-');
          startList.pop()
          endList.pop()
          console.log()
          if (new Date(startList) > new Date(endList)) {
            return wx.showToast({
              icon: "none",
              title: "结束时间不能早于开始时间"
            });
          }
          this.triggerEvent('timeData', {
            'startData': this.data.startValue,
            'endData': this.data.endValue
          });
        } else {
          if (!this.data.timeDataValue) {
            this.triggerEvent('timeData', {
              'timeData': yearData + '-' + monthDataRel + '-' + dayData + '-' + '全天'
            });
            this.setData({
              pickerShow: false,
            });
          } else {
            this.triggerEvent('timeData', {
              'timeData': this.data.timeDataValue
            });
            this.setData({
              pickerShow: false,
            });
          }
        }
      } else {
        this.triggerEvent('resetConfirm', {
          'startData': this.data.startValue,
          'endData': this.data.endValue
        });
        this.setData({
          pickerShow: false,
        });
      }

    }
  }
})