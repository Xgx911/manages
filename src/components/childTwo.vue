<template>
  <div class="about">
    二号
    {{ setOption }}

    <div class="scro">
      <h2 v-text="`${setOption}`"></h2>
      <h2 v-text="`${setOption}`"></h2>
      <h2 v-text="`${setOption}`"></h2>
      <h2 v-text="`${setOption}`"></h2>
      <h2 v-text="`${setOption}`"></h2>
      <h2 v-text="`${setOption}`"></h2>
      <h2 v-text="`${setOption}`"></h2>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  inject: ['setOption']
}
</script>
<style lang="scss">
.scro {
  width: 500px;
  height: 300px;
  overflow-y: auto;
  border: 1px solid red;
  // scrollbar-width: none;
  // -ms-overflow-style: none;
  scrollbar-width: thin;
  -ms-overflow-style: none;
  scrollbar-color: #50b5c7 #f7f7f9;
}

/*----- 滚动条 -------*/

.scro::-webkit-scrollbar {
  width: 10px;
  // height: 8px;
  // background-color: #f5f5f5;
  border-radius: 5px;
  // display: none;
}
::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-thumb {
  background: #0c4ea2;
  border-radius: 5px;
}
::-webkit-scrollbar-corner {
  background-color: #f5f5f5;
}
</style>
