import axios from 'axios';

const state = {
  token: JSON.parse(localStorage.getItem('token')) || '',
  user: {},
  loading: false,
  team: [],
  error: null
};
const getters = {
  token: () => state.token,
  user: () => state.user,
  isLoggedIn: () => !!state.token,
  error: () => state.error,
  isLoading: () => state.loading,
  team: () => state.team
};
const actions = {
  async getLogin({ commit }, user) {
    try {
      commit('login_reg');
      const res = await axios.post(
        'http://localhost:5000/api/v1/auth/login',
        user
      );
      if (res.data.success) {
        const token = res.data.token;
        localStorage.setItem('token', JSON.stringify(token));
        axios.defaults.headers.common['Authorization'] = token;
        commit('login_res', token);
      }
      return res;
    } catch (err) {
      console.log(err.response.error);
      commit('login_error', err.response.error);
    }
  },
  // REGISTER
  async register({ commit }, user) {
    try {
      commit('login_reg');
      const res = await axios.post(
        'http://localhost:5000/api/v1/auth/register',
        user
      );
      if (res.data.success) {
        const token = res.data.token;
        localStorage.setItem('token', JSON.stringify(token));
        axios.defaults.headers.common['Authorization'] = token;
        commit('login_res', token);
      }
      return res;
    } catch (err) {
      console.log(err.response);
      commit('login_error', err.response);
    }
  },
  //LOGOUT
  logout({ commit }) {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    commit('logout_reg');
    return;
  },
  //PROFILE
  async myProfile({ commit }) {
    try {
      commit('login_reg');
      const res = await axios('http://localhost:5000/api/v1/auth/profile');
      if (res.data.success) {
        commit('profile_res', res.data.data);
      }
      return res;
    } catch (err) {
      commit('login_error', err.response);
    }
  },
  //PROFILE
  async allUsers({ commit }) {
    try {
      commit('login_reg');
      const res = await axios('http://localhost:5000/api/v1/users');
      if (res.data.success) {
        commit('allUsers_res', res.data.data);
      }
      return res;
    } catch (err) {
      commit('login_error', err.response);
    }
  }
};
const mutations = {
  login_reg(state) {
    state.loading = true;
    state.error = null;
  },
  login_error(state, err) {
    state.error = err;
    state.loading = false;
  },
  login_res(state, token) {
    state.token = token;
    state.loading = false;
    state.error = null;
  },
  logout_reg(state) {
    state.token = '';
    state.loading = false;
    state.error = null;
    state.user = {};
  },
  profile_res(state, user) {
    state.user = user;
    state.loading = false;
  },
  allUsers_res(state, data) {
    state.loading = false;
    state.team = data;
    state.error = null;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
