<template>
  <div>
    <div>
      <el-form
        class="link-base-style-form"
        ref="linkBaseStyle"
        label-width="100px"
        @submit.native.prevent
        :model="linkBaseStyle"
      >
        <h4>linkBaseStyle (连线的样式定制)</h4>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="color">
              <el-color-picker v-model="linkBaseStyle.color"> </el-color-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="hover">
              <el-color-picker v-model="linkBaseStyle.hover"> </el-color-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="textColor">
              <el-color-picker v-model="linkBaseStyle.textColor">
              </el-color-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="textHover">
              <el-color-picker v-model="linkBaseStyle.textHover">
              </el-color-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="font">
              <el-select size="medium" v-model="linkBaseStyle.font">
                <el-option
                  v-for="item in fontList"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="dotted">
              <el-switch
                v-model="linkBaseStyle.dotted"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="lineDash">
              <el-select
                size="medium"
                style="width: 80px"
                v-model="linkBaseStyle.lineDash[0]"
              >
                <el-option
                  v-for="item in [1, 2, 3, 4, 5, 6, 7, 8]"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
              <el-select
                size="medium"
                style="width: 80px"
                v-model="linkBaseStyle.lineDash[1]"
              >
                <el-option
                  v-for="item in [1, 2, 3, 4, 5, 6, 7, 8]"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="background">
              <el-color-picker v-model="linkBaseStyle.background">
              </el-color-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="super-flow-demo1">
      <div class="node-container">
        <div>
          <el-button type="primary" @click="addSteDom(addNum)"
            >添加节点</el-button
          >
          <el-button type="primary" @click="pointflow">确定</el-button>
        </div>
        <span
          class="node-item"
          v-for="item in nodeItemList"
          :key="item.label"
          @mousedown="(evt) => nodeItemMouseDown(evt, item.value)"
        >
          {{ item.label }}
        </span>
      </div>
      <div class="flow-container" ref="flowContainer">
        <super-flow
          ref="superFlow"
          :graph-menu="graphMenu"
          :node-menu="nodeMenu"
          :link-menu="linkMenu"
          :link-base-style="linkBaseStyle"
          :link-style="linkStyle"
          :link-desc="linkDesc"
          :node-list="nodeList"
          :link-list="linkList"
        >
          <template v-slot:node="{ meta }">
            <div
              @mouseup="nodeMouseUp"
              @click="nodeClick"
              class="flow-node ellipsis"
            >
              {{ meta.name }}
            </div>
          </template>
        </super-flow>
      </div>
    </div>

    <el-dialog
      :title="drawerConf.title"
      :visible.sync="drawerConf.visible"
      :close-on-click-modal="false"
    >
      <!--         @keyup.native.enter="settingSubmit" -->
      <el-form
        @submit.native.prevent
        v-show="drawerConf.type === drawerType.node"
        ref="nodeSetting"
        :model="nodeSetting"
      >
        <el-form-item label="节点名称" prop="name">
          <el-input
            v-model="nodeSetting.name"
            placeholder="请输入节点名称"
            maxlength="30"
          >
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="节点描述" prop="desc">
          <el-input
            v-model="nodeSetting.desc"
            placeholder="请输入节点描述"
            maxlength="30"
          >
          </el-input>
        </el-form-item> -->
        <ditor
          v-if="drawerConf.visible"
          ref="wangDitor"
          :value="wangDesc"
          :wangId="addNum"
          @setData="setData"
        />
      </el-form>
      <el-form
        @keyup.native.enter="settingSubmit"
        @submit.native.prevent
        v-show="drawerConf.type === drawerType.link"
        ref="linkSetting"
        :model="linkSetting"
      >
        <el-form-item label="连线描述" prop="desc">
          <el-input v-model="linkSetting.desc" placeholder="请输入连线描述">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="drawerConf.cancel"> 取 消 </el-button>
        <el-button type="primary" @click="settingSubmit"> 确 定 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const drawerType = {
  node: 0,
  link: 1,
};
import ditor from "@/components/wangditor";
export default {
  data() {
    return {
      addNum: 1,
      remark: "",
      drawerType,
      wangDesc: "",
      nodeList: [],
      linkList: [],
      drawerConf: {
        title: "",
        visible: false,
        type: null,
        info: null,
        open: (type, info) => {
          // debugger;
          const conf = this.drawerConf;
          conf.visible = true;
          conf.type = type;
          conf.info = info;
          if (conf.type === drawerType.node) {
            conf.title = "节点";

            // if (this.$refs.nodeSetting) this.$refs.nodeSetting.resetFields();
            if (this.$refs.nodeSetting) this.wangDesc = "";
            this.$set(this.nodeSetting, "name", info.meta.name);
            this.$set(this.nodeSetting, "desc", info.meta.desc);
            this.$nextTick(() => {
              this.wangDesc = info.meta.desc;
            });
          } else {
            conf.title = "连线";
            if (this.$refs.linkSetting) this.$refs.linkSetting.resetFields();
            this.$set(
              this.linkSetting,
              "desc",
              info.meta ? info.meta.desc : ""
            );
          }
        },
        cancel: () => {
          this.drawerConf.visible = false;
          if (this.drawerConf.type === drawerType.node) {
            this.$refs.nodeSetting.clearValidate();
          } else {
            this.$refs.linkSetting.clearValidate();
          }
        },
      },
      linkSetting: {
        desc: "",
      },
      nodeSetting: {
        name: "",
        desc: "",
      },

      dragConf: {
        isDown: false,
        isMove: false,
        offsetTop: 0,
        offsetLeft: 0,
        clientX: 0,
        clientY: 0,
        ele: null,
        info: null,
      },
      nodeItemList: [
        // {
        //   label: "节点1",
        //   value: () => ({
        //     width: 120,
        //     height: 40,
        //     meta: {
        //       label: "1",
        //       name: "1",
        //     },
        //   }),
        // },
        // {
        //   label: "节点2",
        //   value: () => ({
        //     width: 120,
        //     height: 40,
        //     meta: {
        //       label: "2",
        //       name: "2",
        //     },
        //   }),
        // },
        // {
        //   label: "节点3",
        //   value: () => ({
        //     width: 120,
        //     height: 40,
        //     meta: {
        //       label: "3",
        //       name: "3",
        //     },
        //   }),
        // },
        // {
        //   label: "节点4",
        //   value: () => ({
        //     width: 120,
        //     height: 40,
        //     meta: {
        //       label: "4",
        //       name: "4",
        //     },
        //   }),
        // },
      ],

      graphMenu: [
        // [
        //   {
        //     // 选项 label
        //     label: "节点1",
        //     // 选项是否禁用
        //     disable(graph) {
        //       return !!graph.nodeList.find((node) => node.meta.label === "1");
        //     },
        //     // 选项选中后回调函数
        //     selected(graph, coordinate) {
        //       graph.addNode({
        //         width: 120,
        //         height: 40,
        //         coordinate,
        //         meta: {
        //           label: "1",
        //           name: "1",
        //         },
        //       });
        //     },
        //   },
        //   {
        //     label: "节点2",
        //     selected(graph, coordinate) {
        //       graph.addNode({
        //         width: 120,
        //         height: 40,
        //         coordinate,
        //         meta: {
        //           label: "2",
        //           name: "2",
        //         },
        //       });
        //     },
        //   },
        //   {
        //     label: "节点3",
        //     selected(graph, coordinate) {
        //       graph.addNode({
        //         width: 120,
        //         height: 40,
        //         coordinate,
        //         meta: {
        //           label: "3",
        //           name: "3",
        //         },
        //       });
        //     },
        //   },
        // ],
        // [
        //   {
        //     label: "节点4",
        //     selected(graph, coordinate) {
        //       graph.addNode({
        //         width: 120,
        //         height: 40,
        //         coordinate,
        //         meta: {
        //           label: "4",
        //           name: "4",
        //         },
        //       });
        //     },
        //   },
        // ],
        [
          {
            label: "全选",
            selected: (graph) => {
              graph.selectAll();
            },
          },
        ],
      ],
      nodeMenu: [
        [
          {
            label: "删除",
            selected: (node) => {
              node.remove();
            },
          },
          {
            label: "编辑",
            selected: (node) => {
              this.$nextTick(() => {
                // this.$refs.wangDitor.clearText();
              });
              this.drawerConf.open(drawerType.node, node);
            },
          },
        ],
      ],
      linkMenu: [
        [
          {
            label: "删除",
            selected: (link) => {
              link.remove();
            },
          },
          {
            label: "编辑",
            selected: (link) => {
              this.drawerConf.open(drawerType.link, link);
            },
          },
        ],
      ],

      linkBaseStyle: {
        color: "#666666", // line 颜色
        hover: "#FF0000", // line hover 的颜色
        textColor: "#666666", // line 描述文字颜色
        textHover: "#FF0000", // line 描述文字 hover 颜色
        font: "14px Arial", // line 描述文字 字体设置 参考 canvas font
        dotted: false, // 是否是虚线
        lineDash: [4, 4], // 虚线时生效，虚线间隔
        background: "rgba(255,255,255,0.6)", // 描述文字背景色
      },
      fontList: ["14px Arial", "italic small-caps bold 12px arial"],
    };
  },
  components: {
    ditor,
  },
  mounted() {
    document.addEventListener("mousemove", this.docMousemove);
    document.addEventListener("mouseup", this.docMouseup);
    this.$once("hook:beforeDestroy", () => {
      document.removeEventListener("mousemove", this.docMousemove);
      document.removeEventListener("mouseup", this.docMouseup);
    });

    let data = JSON.parse(sessionStorage.getItem("data"));
    const { linkList, nodeList } = data;

    this.$nextTick(() => {
      this.linkList = linkList;
      this.nodeList = nodeList;
    });
  },
  methods: {
    flowNodeClick(meta) {
      console.log(this.$refs.superFlow.graph);
    },
    linkStyle(link) {
      if (link.meta && link.meta.desc === "1") {
        return {
          color: "red",
          hover: "#FF00FF",
          dotted: true,
        };
      } else {
        return {};
      }
    },
    addSteDom(val) {
      this.nodeItemList.push({
        label: "节点" + val,
        value: () => ({
          width: 120,
          height: 40,
          id: "node" + val,
          meta: {
            label: "label" + val,
            name: "节点" + val,
          },
        }),
      });

      this.addNum++;
    },
    setData(val) {
      this.remark = val;
    },
    pointflow() {
      // console.log(
      //   this.$refs.superFlow.toJSON(),
      //   JSON.stringify(this.$refs.superFlow.toJSON())
      // );
      sessionStorage.setItem(
        "data",
        JSON.stringify(this.$refs.superFlow.toJSON())
      );
      // let data = JSON.parse(sessionStorage.getItem("data"));
      this.$store.commit("uploadWang", JSON.stringify(this.$refs.superFlow.toJSON()));
    },
    linkDesc(link) {
      return link.meta ? link.meta.desc : "";
    },
    settingSubmit() {
      const conf = this.drawerConf;
      // debugger;
      if (this.drawerConf.type === drawerType.node) {
        if (!conf.info.meta) conf.info.meta = {};
        Object.keys(this.nodeSetting).forEach((key) => {
          if (key == "desc") {
            this.$set(conf.info.meta, key, this.remark);
          } else {
            this.$set(conf.info.meta, key, this.nodeSetting[key]);
          }
        });
        this.$refs.nodeSetting.resetFields();
      } else {
        if (!conf.info.meta) conf.info.meta = {};
        Object.keys(this.linkSetting).forEach((key) => {
          this.$set(conf.info.meta, key, this.linkSetting[key]);
        });
        this.$refs.linkSetting.resetFields();
      }
      conf.visible = false;
    },
    nodeMouseUp(evt) {
      evt.preventDefault();
    },
    nodeClick() {
      console.log(arguments);
    },
    docMousemove({ clientX, clientY }) {
      // console.log("docMousemove");
      const conf = this.dragConf;

      if (conf.isMove) {
        conf.ele.style.top = clientY - conf.offsetTop + "px";
        conf.ele.style.left = clientX - conf.offsetLeft + "px";
      } else if (conf.isDown) {
        // 鼠标移动量大于 5 时 移动状态生效
        conf.isMove =
          Math.abs(clientX - conf.clientX) > 5 ||
          Math.abs(clientY - conf.clientY) > 5;
      }
    },
    docMouseup({ clientX, clientY }) {
      // console.log("docMouseup");
      const conf = this.dragConf;
      conf.isDown = false;

      if (conf.isMove) {
        const { top, right, bottom, left } =
          this.$refs.flowContainer.getBoundingClientRect();

        // 判断鼠标是否进入 flow container
        if (
          clientX > left &&
          clientX < right &&
          clientY > top &&
          clientY < bottom
        ) {
          // 获取拖动元素左上角相对 super flow 区域原点坐标
          const coordinate = this.$refs.superFlow.getMouseCoordinate(
            clientX - conf.offsetLeft,
            clientY - conf.offsetTop
          );
          // 添加节点
          this.$refs.superFlow.addNode({
            coordinate,
            ...conf.info,
          });
        }

        conf.isMove = false;
      }

      if (conf.ele) {
        conf.ele.remove();
        conf.ele = null;
      }
    },
    nodeItemMouseDown(evt, infoFun) {
      // console.log("nodeItemMouseDown", evt, infoFun, this.dragConf);
      const { clientX, clientY, currentTarget } = evt;
      const { top, left } = evt.currentTarget.getBoundingClientRect(); //返回元素的大小及其相对于视口的位置。
      const conf = this.dragConf;
      const ele = currentTarget.cloneNode(true);

      Object.assign(this.dragConf, {
        offsetLeft: clientX - left,
        offsetTop: clientY - top,
        clientX: clientX,
        clientY: clientY,
        info: infoFun(),
        ele,
        isDown: true,
      });

      ele.style.position = "fixed";
      ele.style.margin = "0";
      ele.style.top = clientY - conf.offsetTop + "px";
      ele.style.left = clientX - conf.offsetLeft + "px";

      this.$el.appendChild(this.dragConf.ele);
    },
  },
};
</script>

<style lang="less">
.ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-wrap: break-word;
}

.link-base-style-form {
  .el-form-item {
    margin-bottom: 12px;
  }

  padding-bottom: 20px;
  border-bottom: 1px solid #dcdcdc;
}

.super-flow-demo1 {
  margin-top: 20px;
  width: 100%;
  height: 600px;
  background-color: #f5f5f5;
  @list-width: 200px;

  > .node-container {
    width: @list-width;
    float: left;
    height: 100%;
    text-align: center;
    background-color: #ffffff;
  }

  > .flow-container {
    width: calc(100% - @list-width);
    float: left;
    height: 100%;
    overflow: hidden;
  }

  .super-flow__node {
    .flow-node {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      line-height: 40px;
      padding: 0 6px;
      font-size: 12px;
    }
  }
}

.node-item {
  @node-item-height: 30px;

  font-size: 14px;
  display: inline-block;
  height: @node-item-height;
  width: 120px;
  margin-top: 20px;
  background-color: #ffffff;
  line-height: @node-item-height;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  user-select: none;
  text-align: center;
  z-index: 6;

  &:hover {
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.4);
  }
}
</style>