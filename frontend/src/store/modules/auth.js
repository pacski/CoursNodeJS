import axios from "axios";

const state = {
  userId: null,
  token: null
};

const getters = {
  isAuthenticated: (state) => !!state.userId && !!state.token,
  StateUser: function (state) {
    return {
      userId: state.userId,
      token: state.token,
    }
  }
};

const actions = {
  async Register({dispatch}, form) {
    await axios.post('/user/signup', form)
    await dispatch('LogIn', form)
  },
  async LogIn({ commit }, user) {
    let res = await axios.post("/user/login", user);
    if (res.status === 200) {
      commit("setUser", res.data)
    }
  },

  async LogOut({ commit }) {
    commit("logout");
  },
};

const mutations = {
  setUser(state, data) {
    state.token = data.token;
    state.userId = data.userId;
  },


  logout(state) {
    state.userId = null;
    state.token = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};