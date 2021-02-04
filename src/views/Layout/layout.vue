<template>
  <el-container class="layout">
    <el-aside>
      <h4>left</h4>
    </el-aside>
    <el-container>
      <h3>header</h3>
      <el-main id="main" class="mApp-router">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <transition name="fade" mode="out-in">
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: 'layout',
  data () {
    return {};
  },
  created () {},
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>

</style>

