<template>
  <div class="player-card d-flex justify-content-between align-items-center">
    <div class="info d-flex align-items-center">
      <img width="34px" height="34px" :src="player.image_url" class="mr-2" />
      <div class="d-flex flex-column">
        <p class="text-color-night-blue">{{ player.display_name }}</p>
        <span class="text-color-slate-blue" v-if="player.position">{{
          player.position.name
        }}</span>
      </div>
    </div>
    <div class="buttons" v-if="playerType === 'allplayers'">
      <a
        class="text-color-light-royal-blue"
        v-if="!isSelected"
        @click="addLineupPlayer(player)"
        >PICK</a
      >
      <a class="text-color-faded-red" v-else @click="removeLineupPlayer(player)"
        >UNPICK</a
      >
    </div>
    <div v-if="player.substitutionMinute">
      <div class="buttons" v-if="playerType === 'lineup'">
        <p class="m-0">
          <span class="text-color-faded-red">↓</span
          >{{ player.substitutionMinute }}’
        </p>
      </div>

      <div class="buttons" v-if="playerType === 'substitutes'">
        <p class="m-0">
          <span class="text-color-aqua-green">↑</span>
          {{ player.substitutionMinute }}’
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PlayerCard",
  props: {
    player: {
      type: Object,
      required: true,
    },
    playerType: {
      type: String,
      required: true,
    },
  },
  computed: mapGetters(["lineup"]),
  methods: {
    ...mapActions([
      "addLineupPlayer",
      "removeLineupPlayer",
      "resetSubstitudePlayer",
    ]),
  },
  data() {
    return {
      isSelected: false,
    };
  },
  mounted() {},
  watch: {
    "lineup.players"(newVal) {
      this.isSelected = newVal.some((item) => item.id === this.player.id)
        ? true
        : false;
    },
  },
};
</script>

<style lang="scss">
.info {
  p {
    margin: 0;
    font-size: 16px;
  }
  span {
    font-size: 14px;
  }
  h2 {
    font-size: 20px;
  }
}
</style>