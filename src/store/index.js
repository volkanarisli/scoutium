import Vuex from 'vuex';
import Vue from 'vue';
import lineup from './modules/lineup'
import club from './modules/club'

//Load Vuex
Vue.use(Vuex);

//Create Store
export default new Vuex.Store({
    modules: {
        lineup,
        club
    }
})
