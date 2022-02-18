<template>
  <div class="wang-main">
    <div v-for="(item, index) in content" :key="index">
      <h2>{{ item.title }}</h2>
      <div v-html="item.text"   @click="next(item.id)"></div>
      <el-button
        class="next"
        v-show="item.isShow"
        type="primary"
        @click="next(item.id)"
        >下一步</el-button
      >
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dataList: "",
      content: [],
      linkData: [],
      nodeData: [],
    };
  },
  computed: {
    ...mapGetters({
      wangList: "wandList",
    }),
  },
  mounted() {
    if (!this.wangList) return;
    console.log(this.$store, JSON.parse(this.wangList));

    this.dataList = JSON.parse(this.wangList);
    const { linkList, nodeList } = JSON.parse(this.wangList);
    this.linkData = linkList;
    this.nodeData = nodeList;
    let start1 = {}; //开始节点
    let startList = [];
    let linkArr = function (val) {};

    linkList.forEach((element, index) => {
      startList.push(element.endId);
      //   linkList.forEach((ele, i) => {
      //     if (element.startId != ele.endId) {
      //       start1 = element.startId;
      //     }
      //   });
    });

    linkList.forEach((element, index) => {
      if (startList.indexOf(element.startId) == -1) {
        start1 = Object.assign(
          {},
          {
            id: element.startId,
            show: element.meta ? element.meta.desc : false,
          }
        );
      }
    });

    this.nodeData.forEach((e) => {
      if (e.id == start1.id) {
        this.content.push({
          title: e.meta.name,
          text: e.meta.desc,
          id: e.id,
          isShow: start1.show,
        });
      }
    });
    console.log(start1, "节点----", this.content);
  },
  methods: {
    next(val) {
      console.log(val, "-------");
      let endData = this.linkData.filter((e) => {
        return e.startId == val;
      });
      console.log(endData, "多个节点");
      let data1 = [];
      this.nodeData.forEach((e) => {
        endData.forEach((ele) => {
          if (e.id == ele.endId) {
            console.log("多条数据", e);
            data1.push({
              title: e.meta.name,
              text: e.meta.desc,
              id: e.id,
              isShow: ele.meta ? ele.meta.desc : false,
            });
            // this.content = Object.assign(
            //   {},
            //   {
            //     title: e.meta.name,
            //     text: e.meta.desc,
            //     id: e.id,
            //   }
            // );
          }
        });
      });
      this.content = data1;
    },
  },
};
</script>
<style lang="less" scoped>
.wang-main {
  width: 40rem;
  min-height: 30rem;
  border: 1px solid red;
  position: relative;
  .next {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
  }
}
</style>