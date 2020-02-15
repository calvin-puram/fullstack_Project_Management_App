import Vue from 'vue';
import Vuex from 'vuex';
import Auth from './modules/auth';
import Projects from './modules/projects';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Auth,
    Projects
  }
});
