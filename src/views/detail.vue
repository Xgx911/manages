<template>
  <div>
    <el-input size="mini"
              v-model="value"
              placeholder="请输入..."></el-input>
    {{  JSON.parse($route.query.mess) }}

  </div>
</template>
<script>
export default {
  data () {
    return {
      value: ''
    }
  }

}
</script>
