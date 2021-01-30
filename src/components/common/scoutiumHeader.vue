<template>
  <div>
    <header class="header bg-color-night-blue">
      <div class="d-flex justify-content-between align-items-center container">
        <img
          width="132px"
          height="18px"
          :src="require('@/assets/images/Logo.png')"
          alt="Logo"
        />
        <img :src="require('@/assets/images/Avatar.png')" alt="Avatar" />
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "ScoutiumHeader",
};
</script>

<style>
.header {
  padding: 12px 0;
}
</style>