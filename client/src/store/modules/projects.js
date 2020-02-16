import axios from 'axios';

const state = {
  projects: [],
  error: null,
  loading: false,
  userProject: []
};
const getters = {
  getProjects: () => state.projects,
  isProjectLoading: () => state.loading,
  userProject: () => state.userProject
};
const actions = {
  async projects({ commit }) {
    try {
      commit('projects_req');
      const res = await axios('http://localhost:5000/api/v1/projects');
      if (res.data.success) {
        commit('projects_res', res.data.data);
      }
      return res;
    } catch (err) {
      console.log(err.response);
      commit('projects_error', err.response);
    }
  },
  /////////
  async myProjects({ commit }) {
    try {
      commit('projects_req');
      const res = await axios('http://localhost:5000/api/v1/projects/me');
      if (res.data.success) {
        commit('personProjects_res', res.data.data);
      }
      return res;
    } catch (err) {
      console.log(err.response.data.error);
      commit('projects_error', err.response.data.error);
    }
  },
  //// CREATE PROJECTS
  async createProjects({ commit }, data) {
    try {
      commit('projects_req');
      const res = await axios.post(
        'http://localhost:5000/api/v1/projects',
        data
      );
      if (res.data.success) {
        commit('newprojects_res', res.data.data);
      }
      return res;
    } catch (err) {
      console.log(err.response);
      commit('projects_error', err.response);
    }
  },
  //// DElETE PROJECTS
  async deleteProjects({ commit }, id) {
    try {
      commit('projects_req');
      const res = await axios.delete(
        `http://localhost:5000/api/v1/projects/${id}`
      );
      if (res.data.success) {
        commit('deleted_res', id);
      }
      return res;
    } catch (err) {
      console.log(err.response);
      commit('projects_error', err.response);
    }
  }
};
const mutations = {
  projects_req(state) {
    state.error = null;
    state.loading = true;
  },
  projects_error(state, err) {
    state.error = err;
    state.loading = false;
  },
  projects_res(state, data) {
    state.error = null;
    state.loading = false;
    state.projects = data;
  },
  personProjects_res(state, data) {
    state.error = null;
    state.loading = false;
    state.userProject = data;
  },
  newprojects_res(state, data) {
    state.error = null;
    state.loading = false;
    state.projects.unshift(data);
  },
  deleted_res(state, id) {
    state.error = null;
    state.loading = false;
    state.projects = state.projects.filter(el => el._id !== id);
    state.userProject = state.userProject.filter(el => el._id !== id);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
