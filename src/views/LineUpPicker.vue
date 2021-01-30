<template>
  <div>
    <!-- <h1 v-for="(player, index) in allLineup" :key="index">
      {{ player.display_name }}
    </h1> -->
    <h1>Oyuncular</h1>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "LineUpPicker",
  computed: mapGetters(["allLineup"]),
  methods: {
    ...mapActions(["fetchAllLineup"]),
  },

  mounted() {
    this.fetchAllLineup();
  },
};
</script>

<style lang="scss">
</style>