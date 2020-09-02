<template>
  <div style="height:100%">
    <el-row>
      <el-col :span='6'>
        <el-input size="mini"
                  v-model='value'
                  placeholder="请输入..."></el-input>
      </el-col>
    </el-row>
    <el-table :data="tableData"
              stripe
              style="width: 100%">
      <el-table-column prop="date"
                       label="日期"
                       width="180">
      </el-table-column>
      <el-table-column prop="name"
                       label="姓名"
                       width="180">
      </el-table-column>
      <el-table-column prop="address"
                       label="地址">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="mini"
                     v-if="scope.row"
                     @click="lookShow(scope.row)"> 查看 </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage4"
                   :page-sizes="[10, 20, 30, 40]"
                   :page-size="pagesize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="tableData.length">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王1虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王2虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王3虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王4虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
        date: '2016-05-02',
        name: '王5虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王6虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王7虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王8虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-02',
        name: '王9虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王10虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王11虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王12虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-02',
        name: '王13虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王14虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }],
      currentPage4: 1,
      pagesize: 10,
      value: ''
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    lookShow (data) {
      this.$router.push({ name: 'detail', query: { mess: JSON.stringify(data) } })
      this.$store.commit('setKeepAlive', ['detail'])
    }

  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'detail') {
      console.log(to, from)
      // if (!from.meta.keepAlive) {
      from.meta.keepAlive = true // 当我们进入到C时开启B的缓存
      // }

      next()
    } else {
      // from.meta.keepAlive = false
      // this.$destroy()
      next()
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name == 'detail') {
      to.meta.isBack = true
    } else {
      to.meta.isBack = false
    }
    next()
  },

  created () {
    console.log('创建')
  },
  mounted () {
    console.log('加载')

    let a = '一号'
    const b = '二号'

    const arr = {
      c: '',
      d: ''
    }
    Object.assign(arr, {
      c: a,
      d: b
    })
    a = '修改数据'
    console.log(arr, '对象', a)
  },
  activated () {
    console.log('缓存---', this.$route.meta)
    if (!this.$route.meta.isBack) {
      this.value = ''
      console.log('重新加载')
    }
    this.$route.meta.isBack = false
  },
  deactivated () {
    console.log('销毁')
  },
  beforeDestroy () {
    console.log('beforeDestroy')
  }

}
</script>

<style lang="scss">
</style>
