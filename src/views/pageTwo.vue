<template>
  <div class="pageOne">
    <div class="scroll-wid">
      <vue-seamless-scroll :data="projectDesList"
                           :class-option="optionSetting"
                           class="seamless-warp">
        <!-- //参数配置，计算属性 -->
        <ul class="item">
          <li v-for="(item, key) in projectDesList"
              :key="key">
            <span class="title"
                  v-text="item.title"></span>
            <span v-text="item.date"> </span>
          </li>
        </ul>
      </vue-seamless-scroll>
    </div>
    <el-button size="mini"
               @click="updateNum">传递数据</el-button>
    <el-button size="mini"
               @click="toPath">跳转页面</el-button>
    <div class="show-char">
      <div class="echart-show"
           id="test-char"
           ref="line"></div>
      <echar-line class="echart-show"
                  :setlist='list' />
    </div>

  </div>
</template>
<script>
import vueSeamless from 'vue-seamless-scroll'
import echarLine from '@/components/echart-line.vue'
var lineChar
export default {
  data () {
    return {
      projectDesList: [
        {
          title: '无缝滚动第一行无缝滚动第一行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第三行无缝滚动第三行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第四行无缝滚动第四行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第五行无缝滚动第五行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第六行无缝滚动第六行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第七行无缝滚动第七行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第八行无缝滚动第八行',
          date: '2017-12-16'
        },
        {
          title: '无缝滚动第九行无缝滚动第九行',
          date: '2017-12-16'
        }
      ],
      list: []
    }
  },
  components: {
    'vue-seamless-scroll': vueSeamless,
    'echar-line': echarLine
  },
  computed: {
    optionSetting () {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 0, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 3000 // 单步运动停止的时间(默认值1000ms)
      }
    }
  },
  created () { },
  mounted () {
    this.initLineChar()
    const target = { aa: '测试数据' }
    const cour = { aa: '修改' }
    const c = {}
    const end = Object.assign(target, cour, c)
    console.log(target, '天际')
    console.log(end, '源数据')
    // this.initSlint()
  },
  methods: {
    initLineChar () {
      // const charone = this.$refs.line
      lineChar = echarts.init(document.getElementById('test-char'))

      const options = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }
        ]
      }

      lineChar.setOption(options)
      window.addEventListener('resize', () => {
        lineChar.resize()
      })
    },
    updateNum () {
      this.list = [100, 200, 300, 400, 500]
    },
    toPath () {
      this.$router.push({ name: 'About', params: { pam: '我要传递的参数' } })
    }
    // async initSlint () {
    //   const num = await this.initOne()
    //   console.log('await', num)
    //   console.log('普通执行')
    // },
    // initOne () {
    //   return new Promise((resolve, reject) => {
    //     const sino = parseInt(Math.random() * 6 + 1)
    //     setTimeout(() => {
    //       console.log('await')
    //       resolve(sino)
    //     }, 3000)
    //   })
    // }
  }
}
</script>
<style lang="scss" scoped >
.scroll-wid {
  width: 500px;
  height: 400px;
  border: 1px solid red;
  padding: 1rem;
  box-sizing: border-box;
}
.seamless-warp {
  height: 188px;
  overflow: hidden;
  ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    li {
      height: 30px;
      line-height: 30px;
      display: flex;
      justify-content: space-between;
      font-size: 15px;
    }
  }
}
.title {
  display: inline-block;
}
.echart-show {
  width: 400px;
  height: 300px;
  border: 1px solid red;
}
.show-char {
  display: flex;
}
</style>
