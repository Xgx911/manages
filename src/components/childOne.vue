<template>
  <div class="about">
    一号 {{title}}
    <!-- <slot /> -->
    <slot name='two'> </slot>
    
    <el-button @click="changeTitle "
               size="mini">sync修改 </el-button>
  </div>
</template>
<script>
import childtwo from './childTwo'
export default {
  data () {
    return {}
  },
  props: {
    title: Object
  },
  components: {
    childtwo
  },
  methods: {
    changeTitle () {
      // this.$emit('update:title', 'hello')
      // this.$emit('change',{
      //   aa:'yihao',
      //   bb:'测试'
      // })
      this.$bus.$emit('setData','aAFSD')
    }
  },
  mounted(){

  },
  watch:{
    title:{
      deep:true,
      // immediate:true,
      handler:function(s,o){
        console.log( s,'监听值')
      }
    }
  }
}
</script>
<style lang="scss"></style>
