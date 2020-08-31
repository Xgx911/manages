<template>
  <div class="custom">
    <IEcharts ref="echarts"
              :option="option"
              :resizable="true"
              @ready="onReady"
              @click="onClick"></IEcharts>
  </div>
</template>
<script>
import IEcharts from 'vue-echarts-v3/src/full.js'
import 'echarts/lib/chart/line'
export default {
  data () {
    return {
      option: {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          },
          {
            name: '销量1',
            type: 'bar',
            data: [15, 14, 26, 12, 10, 18]
          }

        ]
      }
    }
  },
  props: {
    setlist: Array,
    default: () => { }
  },
  components: {
    IEcharts
  },
  mounted () {
    console.log(this.$props)
  },
  methods: {
    onReady (instance) {
      console.log(instance)
    },
    onClick (event, arg, echarts) {
      console.log(event, arg, echarts)
    }
  },
  watch: {
    setlist: {
      deep: true,
      handler: function (val, old) {
        if (val) {
          debugger
          // this.option.series[0].data = val
          // this.$refs.echarts.resize()
        }
      }
    }
  }
}
</script>
<style lang="scss">
.custom {
  width: 100%;
  height: 100%;
}
</style>
