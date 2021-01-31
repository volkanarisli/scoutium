<template>
  <div class="table">
    <slot name="header"></slot>
    <slot name="players"></slot>
  </div>
</template>

<script>
export default {
  name: "PlayerTable",
  components: {},
};
</script>

<style lang="scss" scoped>
@import "@/styles/base.scss";
.table {
  max-height: 550px;
  overflow: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: $white;
  h2 {
    font-size: 20px;
  }
}
</style>