export default {
  data () {
    return {
      msg: '这是mixin的数据msg',
      mixinMsg: '这是mixin的数据mixinMsg'
    }
  },
  created () {
    console.log(123)
  },
  methods: {
    onClick () {
      console.log('触发了mixin中的onClick')
    }
  }
}
