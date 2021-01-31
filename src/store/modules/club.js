import axios from 'axios';

const baseURI = 'https://api.scoutium.com/api/clubs/'


const state = {
    clubInfo: {}
}

const getters = {
    clubInfo: state => state.clubInfo
}

const actions = {
    async fetchClubInfo({ commit }, id) {
        const response = await axios.get(`${baseURI}${id}`);

        commit('setClubInfo', response.data.club)
    },

}

const mutations = {
    setClubInfo: (state, info) => (state.clubInfo = info),

}

export default {
    state,
    getters,
    actions,
    mutations,

}