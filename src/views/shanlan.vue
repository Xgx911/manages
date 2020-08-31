<template>
  <div class="about" id="home">
    <!-- <div class='wrap'>
      <div class="left"></div>
      <div class="right"></div>
    </div> -->
    <el-row :gutter="10">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="6">
        <div class="grid-content bg-purple">
          <el-button size="mini" @click="openFrame">点击</el-button>
        </div>
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="6">
        <div class="grid-content bg-purple-light">
          <el-input size="mini" v-model="text"></el-input>
        </div>
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="6">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
    <div class="could">
      <iframe
        name="iframeMap"
        id="iframeMapViewComponent"
        width="50%"
        height="470px"
        style="border:1px solid aqua"
        src="could.html"
        frameborder="0"
        scrolling="no"
        ref="iframeDom"
      ></iframe>
      <iframe
        name="iframeMap"
        id="iframeMapView"
        width="50%"
        height="470px"
        style="border:1px solid aqua"
        src="rice.html"
        frameborder="0"
        scrolling="no"
        ref="iframeDom"
      ></iframe>
    </div>
  </div>
</template>
<script>
// import coludePage from '../../static/could'
export default {
  data () {
    return {
      text: '',
      dialogVisible: false,
      spanClick: 'handleSpanClick' // html中需要响应的事件
    }
  },
  methods: {
    openFrame () {
      console.log(this.text)
      var iframeWin = document.getElementById('iframeMapViewComponent')
        .contentWindow
      iframeWin.postMessage(this.text, '*')
      window.addEventListener(
        'message',
        function (event) {
          console.log(event, event.data)
        },
        false
      )
    },
    doSomeThing (val) {
      console.log(val, '接受数据------')
    }
  },
  mounted () {
    const _this = this

    window[this.spanClick] = params => {
      _this.doSomeThing(params)
    };
  }
}
</script>
<style lang="scss">
.about {
  height: 100%;
}
// .el-row {
//   height: 100px;
// }
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.could {
  width: 100%;
  height: calc(100% - 36px);
  border: 1px solid darkgrey;
  display: flex;
}
#home {
  color: red;
}
#iframeMapViewComponent {
  overflow: scroll;
}
// .wrap {
//   width: 1200px;
//   border: 1px solid #333;
//   overflow: hidden;
//   display: flex;
// }
// .wrap:after {
//   content: "";
//   display: block;
//   clear: both;
// }
// .left {
//   // float: left;
//   background: blue;
//   height: 100px;
//   width: 100px;
// }
// .right {
//   // float: left;
//   background: red;
//   // height: 50px;
//   // width: 100px;
//   flex: 1;
// }
</style>
