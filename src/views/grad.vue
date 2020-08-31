<template>
  <div @touchstart="down"
       @touchmove="move"
       @touchend="end"
       id="circlebox"
       class="circle"
       @click="goHome">
  </div>
</template>
<script>
export default {
  data () {
    return {
      positionX: 0,
      positionY: 0,
      innerHeight: 0,
      innerWidth: 0
    }
  },
  methods: {
    // 返回首页
    goHome () {
      console.log('返回首页')
    },
    /* 阻止移动端屏幕默认滑动 */
    default (e) {
      const divv = document.getElementById('circlebox')
      divv.addEventListener(
        'touchmove',
        function (e) {
          e.preventDefault()
        },
        { passive: false }
      )
    },
    getThisNode () {
      const odiv = document.getElementById('circlebox')
      // console.log(this.positionX, this.positionY);
      if (this.positionX <= 0) {
        this.positionX = 0
      } else if (this.positionX >= this.innerWidth) {
        this.positionX = this.innerWidth
      } else {
        this.positionX = this.positionX
      }
      if (this.positionY <= 0) {
        this.positionY = 0
      } else if (this.positionY >= this.innerHeight) {
        this.positionY = this.innerHeight
      } else {
        this.positionY = this.positionY
      }
      // if (this.positionX <= 20) {
      //   this.positionX = 20;
      // } else if (this.positionX >= this.innerWidth - 20) {
      //   this.positionX = this.innerWidth - 20;
      // } else {
      //   this.positionX = this.positionX;
      // }
      // if (this.positionY <= 20) {
      //   this.positionY = 20;
      // } else if (this.positionY >= this.innerHeight - 20) {
      //   this.positionY = this.innerHeight - 20;
      // } else {
      //   this.positionY = this.positionY;
      // }
      odiv.style.left = `${this.positionX - 20}px`
      odiv.style.top = `${this.positionY - 20}px`
    },
    // 光标按下
    down (e) {
      this.default()
      this.innerHeight = e.view.innerHeight
      this.innerWidth = e.view.innerWidth
      this.positionX = e.changedTouches[0].pageX
      this.positionY = e.changedTouches[0].pageY
    },
    // 光标移动
    move (e) {
      this.getThisNode()
      this.default()
      this.positionX = e.changedTouches[0].pageX
      this.positionY = e.changedTouches[0].pageY
      this.getThisNode()
    },
    // 光标抬起
    end (e) {
      // console.log('end');
    }
  }
}
</script>
<style lang="scss" scoped>
.circle {
  display: block;
  position: fixed;
  z-index: 999;
  touch-action: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: red;
  right: -20px;
  top: 60%;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
