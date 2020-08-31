<template>
  <div class="about">
    <el-button @click="show"> 展示 </el-button>
    <echarLine class="echart-show"
               :setlist='list' />
  </div>
</template>
<script>
import { datas } from '@/components/echarts.json'
import echarLine from '@/components/echart-line'
export default {
  data () {
    return {
      list: []
    }
  },
  props:
    ['pam'],
  components: {
    echarLine
  },
  mounted () {
    console.log(this.pam, '数据---------------')
  },
  methods: {
    show () {

    }
  }
}
</script>
<style lang="scss" scoped >
.wrap {
  width: 200px;
  border: 1px solid #333;
  overflow: hidden;
}
// .wrap:after {
//   content: "";
//   display: block;
//   clear: both;
// }

.echart-show {
  width: 1000px;
  height: 700px;
}
</style>
