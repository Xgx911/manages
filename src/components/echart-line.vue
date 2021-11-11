<template>
  <div class="custom">
    <IEcharts
      ref="echarts"
      :option="option"
      :resizable="true"
      @ready="onReady"
      @click="onClick"
    ></IEcharts>
  </div>
</template>
<script>
import IEcharts from "vue-echarts-v3/src/full.js";
// import 'echarts/lib/chart/line'
export default {
  data() {
    return {
      option: {

    color: ['#0163FD', '#0087FE', '#00C7FD', '#00E3FF'],
    grid: {
        left: '2%',
        top: '1%',
        bottom: 10,
        right: '1%',
        containLabel: true,
    },
    tooltip: {
        trigger: 'item',
        textStyle: {
            fontSize: 14,
        },
        formatter: '{b} : {c} ({d}%)',
    },
    calculable: true,
    series: [
        {
            stack: 'a',
            type: 'pie',
            radius: ['25%', '65%'],
            center: ['55%', '45%'],
            roseType: 'radius',
            zlevel: 10,
            label: {
                normal: {
                    formatter: '{b} {c}人',
                    borderWidth: 0,
                    borderRadius: 4,
                    padding: [0, -50],
                    height: 40,
                    fontSize: 16,
                    align: 'center',
                    rich: {
                        b: {
                            fontSize: 13,
                            lineHeight: 5,
                            color: '#41B3DC',
                        },
                    },
                },
            },
            labelLine: {
                normal: {
                    show: true,
                    length: 20,
                    length2: 55,
                },
                emphasis: {
                    show: false,
                },
            },
            data: [
                {
                    value: 80,
                    name: '火灾事件',
                },
                {
                    value: 190,
                    name: '内涝',
                },
                {
                    value: 230,
                    name: '城管',
                },
                {
                    value: 290,
                    name: '民事纠纷',
                },
            ],
        },
    ],
}
    };
  },
  props: {
    setlist: Array,
    default: () => {},
  },
  components: {
    IEcharts,
  },
  mounted() {
    console.log(this.$props);
    // this.$refs.echarts.resize();
  },
  methods: {
    onReady(instance) {
      console.log(instance);
    },
    onClick(event, arg, echarts) {
      console.log(event, arg, echarts);
    },
  },
  watch: {
    setlist: {
      deep: true,
      handler: function (val, old) {
        if (val) {
          // this.option.series[0].data = val
          // this.$refs.echarts.resize()
        }
      },
    },
  },
};
</script>
<style lang="scss">
.custom {
  width: 100%;
  height: 100%;
}
</style>
