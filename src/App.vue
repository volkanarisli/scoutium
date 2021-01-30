<template>
  <div id="app">
    <scoutium-header />
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    ScoutiumHeader: () => import("@/components/common/scoutiumHeader"),
  },
};
</script>

<style lang="scss">
@import "~@/styles/base.scss";
</style>
