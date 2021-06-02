<template>
  <div>
    <p>欢迎使用图书管理系统</p>
    <div class="pie" ref="pie"></div>
    <div class="pie" ref="bookTop"></div>
    <p>库存图书总量：{{allBookCount}}本</p>
    <p>库存图书：{{bookType}}种</p>
    <p>注册用户总数：{{allUserCount}}人</p>
    <p>当前在线人数：{{loginCount}} 人</p>
    <p></p>
  </div>

</template>

<script>
import http from '../http/api'
import * as echarts from 'echarts';

export default {
  name: 'Welcome',
  data () {
    return {
      loginCount: '',
      bookType:'',
      allBookCount:'',
      allUserCount: '',
      user: '',
      manager :''
    }
  },
  methods: {
    getUserInfo () {
      http.getUserInfo().then(res => {
        // this.$message.success(res.message)
        this.$store.commit('set_userInfo', res.result)
        this.$store.commit('set_isLogin', true)
      })
    },
    initWeekDateEcharts () {
      http.getWeekDate().then(res => {
        let count = res.result.count
        let weekDate = res.result.weekDate

        let myChart = echarts.init(this.$refs.pie);
        myChart.showLoading({
          text: 'loading'
        })
        let option = {};
        option = {
          title: {
            show: true,
            width: '500px',
            text: '系统近一周点击量',
            textStyle: {
              color: 'black'
            },
            textAlign: 'left',
          },
          xAxis: {
            type: 'category',
            data: weekDate
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: count,
            type: 'line'
          }]
        };
        // option && myChart.setOption(option);
        setTimeout(() => {
          myChart.hideLoading();
          option && myChart.setOption(option);
        })
      })
    },

    initBookTopEcharts () {
      http.getBookTop().then(res => {
        let count = res.result.count
        let book = res.result.book

        let myChart = echarts.init(this.$refs.bookTop);
        myChart.showLoading({
          text: 'loading'
        })
        let option = {};
        option = {
          title: {
            show: true,
            width: '500px',
            text: '图书借阅量排行榜',
            textStyle: {
              color: 'black'
            },
            textAlign: 'left',
          },
          xAxis: {
            type: 'category',
            data: book
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: count,
            type: 'bar'
          }]
        };
        // option && myChart.setOption(option);
        setTimeout(() => {
          myChart.hideLoading();
          option && myChart.setOption(option);
        })
      })
    },

    getAllBookCount () {
      http.getBookCount().then(res => {
        this.bookType = res.result.bookType
        this.allBookCount = res.result.allCount
      })
    },

    getAllUserCount () {
      http.getUserCount().then(res => {
        this.allUserCount = res.result.allCount
        this.user = res.result.user
        this.manager = res.result.manager
      })
    },
    getCurrentLoginCount () {
      http.getLoginCount().then(res => {
        this.loginCount = res.result.count
        console.log(this.loginCount)
      })
    },
  },
  mounted () {
    this.getUserInfo();
    this.initWeekDateEcharts();
    this.getCurrentLoginCount();
    this.initBookTopEcharts();
    this.getAllBookCount();
    this.getAllUserCount();
  }
}
</script>

<style scoped>
.pie{
  width: 500px;
  height: 400px;
}
</style>
