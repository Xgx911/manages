<template>
  <div class="about">
    一号 {{title}}
    <!-- <slot /> -->
    <slot name='two'> </slot>
    <childtwo />
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
    title: String
  },
  components: {
    childtwo
  },
  methods: {
    changeTitle () {
      this.$emit('update:title', 'hello')
    }
  }
}
</script>
<style lang="scss"></style>
