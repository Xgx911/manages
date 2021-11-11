<template>
  <el-row>
    <el-col :span="12">
      <div class="pageOne">
        <h1>图片</h1>
        <div class="brek-img">
          <div class="day"></div>
          <div class="night"></div>
        </div>
        <h2>图片</h2>

        <div>
          {{ message }}
        </div>
        <el-button size="mini"
                   @click="updatemess">修改</el-button>
        <!-- <img class="imgcla"
             v-lazy="
            'https://tva1.sinaimg.cn/large/007S8ZIlgy1gfynwi1sejj30ij0nrdx0.jpg'
          " /> -->
      </div>
    </el-col>
    <el-col :span="12">
      <span class="button-cover">按钮1</span>
      <span class="button-cover">按钮2</span>
      <span class="button-cover">按钮3</span>
     <div class="comts" @mouseover="mouseover($event)" @mouseout="mouseout" >
       <div class="comchild" v-if="show" > 1111</div>

     </div>
      <hr />
      <div @click="refreshCode">
        <sidentify :identifyCode="identifyCode"
                   @focus="refreshCode">
        </sidentify>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { VueCropper } from 'vue-cropper'
import sidentify from '@/components/canvan'
export default {
  data () {
    return {
      example2: {
        // img的路径自行修改
        img: '~@/assets/photof.webp',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 300,
        autoCropHeight: 250,
        fixed: true,
        // 真实的输出宽高
        infoTrue: true,
        fixedNumber: [4, 3]
      },
      identifyCode: '',
      identifyCodes: '1234567890',
      show:false
    }
  },
  computed: {
    ...mapState({
      message: state => state.message.page
    })
  },
  components: {
    VueCropper,
    sidentify
  },

  methods: {
    mouseover(){
      console.log( '进入' )
      this.show = true
    },
    mouseout(){
      console.log( '离开' )
      this.show = false
    },
    updatemess () {
      this.$store.commit('updateMess', '我要修改的数据')
    },
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ]
      }
    }
  },

  mounted () {
    this.identifyCode = ''
    console.log(this.identifyCodes, '刷-----')
    this.makeCode(this.identifyCodes, 4)
    const fruits = [
      'banana',
      'apple',
      'orange',
      'watermelon',
      'apple',
      'orange',
      'grape',
      'apple'
    ]
    console.log(fruits.slice(0, 3), 'splice', fruits)
    const arr = new Set(fruits)
    const uniqueFruits2 = [...new Set(fruits)]
    // const numsplit = fruits.splice(0, 2, 'potato', 'tomato')
    // console.log(numsplit, arr)

    const friends = [
      { name: 'John', age: 22 },
      { name: 'Peter', age: 23 },
      { name: 'Mark', age: 24 },
      { name: 'Maria', age: 22 },
      { name: 'Monica', age: 21 },
      { name: 'Martha', age: 19 }
    ]

    const obj = {
      aa: '11',
      bb: '22',
      cc: '33',
      dd: '44'
    }

    // const name = friends.map(e => {
    //   return e.name
    // })
    // const name = []
    // obj.forEach(e => {
    //   console.log(e, 'i=====')
    // })

    // for (const i in obj) {
    //   console.log(i, 'i=====')
    // }
    const copya = Object.assign({}, obj)
    copya.aa = '新数据'

    const josnarr = [1, 2, 3]
    const ele = josnarr.join('-')

    console.log(ele)
  }
}
</script>
<style lang="scss">
.comts{
  width: 100px;
  height: 100px;
  border: 1px solid red;
  position: relative;
  .comchild{
    position: absolute;
  left: -100px;
  top: -10px;
  background: antiquewhite;
  width: 90px;
height: 90px;
  }
}
.brek-img {
  width: 500px;
  height: 360px;
  position: relative;
}
.day {
  background-image: url(" ~@/assets/photof.webp");
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  width: 500px;
  height: 360px;
  top: 0;
  left: 0;
}

.night {
  background-image: url("~@/assets/55f.webp");
  background-size: cover;
  background-repeat: no-repeat;
  clip-path: polygon(500px 0, 0% 0, 500px 360px);
  position: absolute;
  width: 500px;
  height: 360px;
  top: 0;
  left: 0;
}
.imgcla {
  width: 300px;
}
.croppers {
  width: 300px;
  height: 500px;
}
.vue-cropper {
  height: 500px;
}
.button-cover {
  position: relative;
  padding: 10px 30px;
  margin: 45px 0;
  color: #b7a3e0;
  text-decoration: none;
  font-size: 20px;
  transition: 0.5s;
  overflow: hidden; //隐藏溢出的线条
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0003); //倒影在文字下方 ，线性渐变创建遮罩图像
  margin-right: 3rem;
  cursor: pointer;
}
.button-cover:hover {
  background: #b7a3e0;
  color: #111;
  box-shadow: 0 0 50px #b7a3e0; //盒子阴影
  transition-delay: 0.25s;
}
.button-cover::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-top: 2px solid #b7a3e0;
  border-right: 2px solid #b7a3e0;
  transition: 0.5s;
  transition-delay: 0.25s;
  box-sizing: border-box;
}
.button-cover:hover::before {
  width: 100%;
  height: 100%;
  transition-delay: 0s;
}
.button-cover::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-bottom: 2px solid #b7a3e0;
  border-left: 2px solid #b7a3e0;
  transition: 0.5s;
  transition-delay: 0.25s;
  box-sizing: border-box;
}
.button-cover:hover::after {
  width: 100%;
  height: 100%;
  transition-delay: 0s;
}
.button-cover:nth-child(1) {
  filter: hue-rotate(100deg); //css滤镜
}
.button-cover:nth-child(3) {
  filter: hue-rotate(200deg);
}
</style>
