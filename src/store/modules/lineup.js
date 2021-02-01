import axios from 'axios';

const baseURI = 'https://api.scoutium.com/api/clubs/'


const state = {
    allPlayers: {
        name: 'allplayers',
        players: [

        ]
    },
    lineup: {
        name: 'lineup',
        players: [

        ]
    },
    substitutes: {
        name: 'substitutes',
        players: [

        ]
    }
}

const getters = {
    allPlayers: state => state.allPlayers,
    lineup: state => state.lineup,
    substitutes: state => state.substitutes
}

const actions = {
    async fetchAllPlayers({ commit }) {
        const response = await axios.get(`${baseURI}${4029}/players`, {
            params: {
                count: 100
            }
        });

        commit('setAllPlayers', response.data.players)
    },
    addLineupPlayer({ commit }, player) {

        if (state.lineup.players.length < 11) {
            commit('setLineUpPlayer', player)
        }
    },
    removeLineupPlayer({ commit }, player) {


        commit('rmLineUpPlayer', player)
        commit('resetSubstitutionPlayer')

    },

    addSubstitudePlayer({ commit }, player) {
        if (state.substitutes.players.length < 3) {
            let inPlayerConfig = {
                ...player.inPlayer,
                substitutionMinute: player.substitutionMinute
            }
            let outPlayerConfig = {
                ...player.outPlayer,
                substitutionMinute: player.substitutionMinute
            }


            commit('setSubstitudePlayer', inPlayerConfig)
            commit('updateLineUpPlayer', outPlayerConfig)

        }


    }

}

const mutations = {
    setAllPlayers: (state, players) => (state.allPlayers.players = players),
    setLineUpPlayer: (state, player) => state.lineup.players.push(player),
    rmLineUpPlayer: (state, player) => state.lineup.players = state.lineup.players.filter(item => item.id !== player.id),
    updateLineUpPlayer: (state, player) => {
        let playerIndex = state.lineup.players.findIndex(item => item.id === player.id)

        state.lineup.players.splice(playerIndex, 1, player);

    },
    setSubstitudePlayer: (state, player) => state.substitutes.players.push(player),
    resetSubstitutionPlayer: (state) => state.substitutes.players = []
}

export default {
    state,
    getters,
    actions,
    mutations,

}