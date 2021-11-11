<template>
  <div class="board"
       style="width: 100%">
    <div class="home">
      <grid-layout :layout="layoutData"
                   :col-num="12"
                   :row-height="layoutHeight"
                   :is-draggable="dialogVisible"
                   :is-resizable="dialogVisible"
                   :is-mirrored="false"
                   :vertical-compact="true"
                   :margin="[10, 10]"
                   :use-css-transforms="true">

        <grid-item v-for="(item, index) in layoutData"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i"
                   :key="index">
          <echar-line />
        </grid-item>
      </grid-layout>
    </div>

    <div class="box"
         @click="openbig($event)">
      <div class="aa"
           @click="opensmall($event)"></div>
    </div>
    {{ update }}
    <br>
    <div>{{msg}}</div>
    <!-- <div>{{mixinMsg}}</div> -->
    <el-button @click="onClick"
               size="mini">点一下</el-button>
    <br>
    {{testmess}}
  </div>
</template>

<script>
import layoutData from '../server/layoutData.json'
import VueGridLayout from 'vue-grid-layout'
import echarLine from '@/components/echart-line'
// import mixin from '@/components/mixin/index.js'
const GridLayout = VueGridLayout.GridLayout
const GridItem = VueGridLayout.GridItem
export default {
  // mixins: [mixin],
  data () {
    return {
      // 布局数据
      layoutData: [],
      // layoutConfig: {
      layoutHeight: 100, // 默认高度
      dialogVisible: true, // 是否可拖拽或改变大小
      // }
      update: {
        data: ''
      },
      msg: '组件中的数据',
      testmess: {
        num: 10,
        message: '测试数据'
      }
    }
  },
  components: {
    'grid-layout': GridLayout,
    'grid-item': GridItem,
    'echar-line': echarLine
  },
  methods: {
    init () {
      this.layoutData = layoutData.mainData
    },
    openbig (e) {
      console.log('点击大的')
    },
    opensmall (e) {
      console.log('点击小的')
      e.stopPropagation()
      this.update.data = '修改后的数据'
    },
    onClick () {
      console.log('触发了组件中的onClick')
      // this.testmess.message = '00'
      this.$set(this.testmess, 'message', '修改后的数据')
    }
  },
  created () {
    this.init()
    console.log('组件内的created')
    let arr = [1,2,3,4,5,6,7,8,9 ]

  let arr1= arr.map((e)=>{
      return e>3
    })
  console.log( arr1 )


  }
}
</script>

<style lang="scss" scoped>
.vue-grid-item {
  background: aquamarine;
}
.box {
  width: 500px;
  height: 200px;
  border: 1px solid red;
}
.aa {
  width: 50px;
  height: 50px;
  background: aqua;
}
</style>
