<template>
  <div>
    <b-modal
      v-model="value"
      title="Add Substition"
      @show="fetchInOption"
      hide-footer
      centered
    >
      <b-form @submit.prevent="onSubmit(request)">
        <div>
          <p class="text-color-slate-blue label">OUT PLAYER</p>
          <b-form-select class="form-input mb-2" v-model="request.outPlayer">
            <option :value="null">Enter player name</option>
            <option
              v-for="(player, index) in outPlayerOptions"
              :key="index"
              :value="player"
            >
              {{ player.display_name }}
            </option>
          </b-form-select>
        </div>

        <div>
          <p class="text-color-slate-blue label">IN PLAYER</p>
          <b-form-select class="form-input mb-2" v-model="request.inPlayer">
            <option :value="null">Enter player name</option>
            <option
              v-for="(player, index) in inPlayerOptions"
              :key="index"
              :value="player"
            >
              {{ player.display_name }}
            </option>
          </b-form-select>
        </div>

        <div>
          <p class="text-color-slate-blue label">SUBSTITUTION MINUTE</p>
          <b-form-input
            class="form-input mb-2"
            type="number"
            max="90"
            v-model="request.substitutionMinute"
            placeholder="Enter minute of substitution"
          >
          </b-form-input>
        </div>
        <div
          class="button-group d-flex justify-content-end align-items-center mt-3"
        >
          <a class="text-color-faded-red mr-2" @click="cancelModal">Cancel</a>
          <button
            :class="['button-default sm', { disabled: !isFormValid }]"
            type="submit"
          >
            Add
          </button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "AddSubstitute",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["allPlayers", "lineup", "substitutes"]),
    isFormValid() {
      return (
        this.request.inPlayer !== null &&
        this.request.outPlayer !== null &&
        this.request.substitutionMinute !== null &&
        this.request.substitutionMinute <= 90
      );
    },
  },
  data() {
    return {
      request: {
        inPlayer: null,
        outPlayer: null,
        substitutionMinute: null,
      },
      status: false,

      inPlayerOptions: [],
      outPlayerOptions: [],
    };
  },
  watch: {
    value(val) {
      this.status = val;
    },
  },
  methods: {
    ...mapActions(["addSubstitudePlayer"]),
    onSubmit(request) {
      this.addSubstitudePlayer(request);
      this.cancelModal();
    },
    fetchInOption() {
      this.outPlayerOptions = this.lineup.players.filter(
        (player) => !player.substitutionMinute
      );
      this.inPlayerOptions = this.allPlayers.players.filter(
        (player) =>
          !this.lineup.players.some((item) => item.id === player.id) &&
          !this.substitutes.players.some((item) => item.id === player.id)
      );
    },
    cancelModal() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.label {
  font-size: 12px;
}
</style>