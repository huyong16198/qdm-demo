<template>
  <div id="app">
      <router-view v-if="showRouter"></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reloadPage
    };
  },
  data () {
    return {
      showRouter: true
    };
  },
  methods: {
    reloadPage () {
      this.showRouter = false;
      this.$nextTick(() => (this.showRouter = true));
    }
  }
};
</script>
<style>
body {
  margin: 0;
  padding: 0;
  font-size: 12px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
