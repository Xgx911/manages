<template>
  <div class="home">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="15%">
          <el-menu default-active="1-1"
                   class="el-menu-vertical-demo"
                   @open="handleOpen"
                   @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item index="1-1">
                <router-link tag="div"
                             to="/">选项1</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link tag="div"
                             to="/two">echarts-scroll</router-link>
              </el-menu-item>
              <el-menu-item index="1-3">
                <router-link tag="div"
                             to="/three">echarts</router-link>
              </el-menu-item>
            </el-submenu>
            <el-menu-item index="2">
              <router-link tag="div"
                           to="/four">
                <!-- <i class="el-icon-menu"></i> -->
                导航二
              </router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <!-- <div slot="title"> -->
              <router-link to="shanlan"
                           tag="span"> 云标签</router-link>
              <!-- </div> -->
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <router-link to="table"
                           tag="span"> 表格</router-link>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main width="85%">
          <router-view></router-view>

        </el-main>
      </el-container>
    </el-container>
    <div id="moves"
         @mousedown="move">
      <span v-show="false"> {{positionX}} {{positionY}}</span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data () {
    return {
      positionX: '',
      positionY: ''
    }
  },
  components: {
    HelloWorld
  },
  mounted () { },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    move (e) {
      const odiv = e.target // 获取目标元素

      // 计算出鼠标相对点击元素的位置,e.clientX获取的是鼠标的位置，OffsetLeft是元素相对于外层元素的位置
      const x = e.clientX - odiv.offsetLeft
      const y = e.clientY - odiv.offsetTop

      console.log(odiv.offsetLeft, odiv.offsetTop)
      document.onmousemove = e => {
        // 获取拖拽元素的位置
        let left = e.clientX - x
        let top = e.clientY - y
        this.positionX = left
        this.positionY = top
        // console.log(document.documentElement.clientHeight,odiv.offsetHeight)
        // 把拖拽元素 放到 当前的位置
        if (left <= 0) {
          left = 0
        } else if (
          left >=
          document.documentElement.clientWidth - odiv.offsetWidth
        ) {
          // document.documentElement.clientWidth 屏幕的可视宽度
          left = document.documentElement.clientWidth - odiv.offsetWidth
        }
        if (top <= 0) {
          top = 0
        } else if (
          top >=
          document.documentElement.clientHeight - odiv.offsetHeight
        ) {
          // document.documentElement.clientHeight 屏幕的可视高度
          top = document.documentElement.clientHeight - odiv.offsetHeight
        }
        // odiv.style.left = left  +'px'
        odiv.style.top = top + 'px'
      }
      // 为了防止 火狐浏览器 拖拽阴影问题
      document.onmouseup = e => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
</script>
<style lang="scss">
.home,
.home > .el-container {
  height: 100%;
}
.el-header {
  background: #eeeeee;
  // height: 4rem !important;
}
.el-aside,
.el-menu {
  height: 100%;
  // border: 1px salmon dashed;
}
#moves {
  position: fixed; /*定位*/
  bottom: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  /*  background: #666; 设置一下背景*/
  background-image: url("../assets/fankui.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
