<template>
  <div style="height:100%">
    <!-- 卡片 -->
    <div class="main-card">

      <div class="card"
           title="反馈意见"
           v-drag
           id="card">
        <!-- <img src="../assets/fankui.png"
           alt=""> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  directives: {
    drag: {
      // 指令的定义
      bind: function (el) {
        const oDiv = el // 获取当前元素
        oDiv.onmousedown = (e) => {
          console.log(e, '元素信息', oDiv.offsetLeft)
          // 算出鼠标相对元素的位置
          const disX = e.clientX - oDiv.offsetLeft
          const disY = e.clientY - oDiv.offsetTop

          document.onmousemove = (e) => {
            // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            const left = e.clientX - disX
            const top = e.clientY
            oDiv.style.left = left + 'px'
            oDiv.style.top = top + 'px'
          }
          document.onmouseup = (e) => {
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
.card {
  position: absolute;
  // position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 40px;
  height: 40px;
  // background-color: #3ab5a0;
  background-image: url("../assets/fankui.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
}
.main-card {
  width: 100%;
  height: calc(100% - 100);
  // position: relative;
  // overflow: hidden;
}
</style>
