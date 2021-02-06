<template>
  <div class="pagination">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="step"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  data () {
    return {
      pageSize: 0
    };
  },
  props: {
    step: {
      type: Array,
      default: function () {
        return [20, 30, 50, 100];
      }
    },
    size: {
      type: Number,
      default: function () {
        return 20;
      }
    },
    page: {
      type: Number,
      default: function () {
        return 1;
      }
    },
    total: {
      type: Number,
      default: function () {
        return 0;
      }
    }
  },
  methods: {
    // 切换每页展示数量
    handleSizeChange (val) {
      this.pageSize = val;
      this.$emit('handlePage', 1, val);
      this.pageSize = 0;
    },
    // 翻页
    handleCurrentChange (val) {
      this.$emit('handlePage', val, this.pageSize || this.size);
      this.pageSize = 0;
    }
  }
};
</script>