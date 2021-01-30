import axios from 'axios';

const baseURI = 'https://api.scoutium.com/api/clubs/'


const state = {
    allLineup: []
}

const getters = {
    allLineup: state => state.allLineup
}

const actions = {
    async fetchAllLineup({ commit }) {
        const response = await axios.get(`${baseURI}${4029}/players`, {
            params: {
                count: 100
            }
        });

        commit('setAllLineup', response.data.players)
    },

}

const mutations = {
    setAllLineup: (state, lineup) => (state.allLineup = lineup),

}

export default {
    state,
    getters,
    actions,
    mutations,

}