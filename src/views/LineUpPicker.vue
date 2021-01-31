<template>
  <div class="container d-flex justify-content-center">
    <addSubstitute v-model="modalShow" />
    <div class="all-tables bg-white">
      <div
        v-if="!isPlayerSelectionComplete"
        class="d-flex justify-content-between mb-3"
      >
        <div class="d-flex align-items-center">
          <img width="32px" class="mb-2" :src="clubInfo.image_url" alt="" />
          <h2 class="m-0 color-night-blue">{{ clubInfo.name }}</h2>
        </div>
        <button
          :class="['button-default', { disabled: lineup.players.length < 11 }]"
          @click="complete"
        >
          <loader v-if="loader" />
          <span v-if="!loader"> Confirm</span>
        </button>
      </div>

      <div
        v-else
        class="d-flex justify-content-center align-items-center mb-5 mt-5"
      >
        <img
          class="mr-2"
          width="40px"
          :src="require('@/assets/images/thick.svg')"
        />
        <h2 class="m-0 color-night-blue">Squad saved successfully</h2>
      </div>

      <div class="d-flex justify-content-between">
        <player-table>
          <template v-slot:header>
            <h2 class="text-color-night-blue mb-3">All Players</h2>
          </template>
          <template v-slot:players>
            <div v-if="!isPlayerSelectionComplete && !loader">
              <template v-for="(player, index) in allPlayers.players">
                <player-card
                  :key="index"
                  :player="player"
                  :playerType="allPlayers.name"
                />
              </template>
            </div>
            <div
              class="d-flex flex-column align-items-center justify-content-center h-100"
              v-if="loader"
            >
              <loader />
            </div>

            <div
              v-else-if="isPlayerSelectionComplete"
              class="d-flex flex-column justify-content-center h-100"
            >
              <div class="d-flex flex-column align-items-center">
                <img width="64px" class="mb-2" :src="clubInfo.image_url" />
                <h2 class="m-0 color-night-blue">{{ clubInfo.name }}</h2>
              </div>
            </div>
          </template>
        </player-table>

        <player-table class="mr-2 ml-2">
          <template v-slot:header>
            <h2 class="text-color-night-blue mb-3">Lineup</h2>
          </template>
          <template v-slot:players>
            <div v-if="lineup.players.length !== 0">
              <template v-for="(player, index) in lineup.players">
                <player-card
                  :key="index"
                  :player="player"
                  :playerType="lineup.name"
                />
              </template>
            </div>
            <div v-else class="d-flex flex-column justify-content-center h-100">
              <p class="text-color-slate-blue text-center">
                You haven’t selected any player for lineup yet.
              </p>
            </div>
          </template>
        </player-table>

        <player-table>
          <template v-slot:header>
            <h2 class="text-color-night-blue mb-3">Substitutes</h2>
          </template>
          <template v-slot:players>
            <div v-if="lineup.players.length === 11">
              <template v-for="(player, index) in substitutes.players">
                <player-card
                  :key="index"
                  :player="player"
                  :playerType="substitutes.name"
                />
              </template>
              <a
                class="text-color-aqua-green"
                v-if="
                  substitutes.players.length < 3 && !isPlayerSelectionComplete
                "
                @click="modalToggle"
                >+ Add Substitution</a
              >
            </div>

            <div v-else class="d-flex flex-column justify-content-center h-100">
              <p class="text-color-slate-blue text-center">
                Please pick 11 players for lineup before creating any
                substitutions
              </p>
            </div>
          </template>
        </player-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "LineUpPicker",
  components: {
    playerTable: () => import("@/components/playerTable"),
    playerCard: () => import("@/components/playerCard"),
    addSubstitute: () => import("@/components/addSubstitute"),
    loader: () => import("@/components/common/loader"),
  },
  computed: mapGetters(["allPlayers", "clubInfo", "lineup", "substitutes"]),
  data() {
    return {
      modalShow: false,
      isPlayerSelectionComplete: false,
      loader: false,
    };
  },
  methods: {
    ...mapActions(["fetchAllPlayers", "fetchClubInfo"]),
    modalToggle() {
      this.modalShow = !this.modalShow;
    },
    complete() {
      this.loader = true;
      setTimeout(() => {
        this.loader = false;
        this.isPlayerSelectionComplete = true;
      }, 3000);
    },
  },
  mounted() {
    this.fetchClubInfo(4029);
    this.fetchAllPlayers();
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/base.scss";
h2 {
  font-size: 20px;
}
.all-tables {
  margin-top: 30px;
  width: 100%;
  padding: 18px 20px 20px 20px;
  border-radius: 12px;
}
</style>