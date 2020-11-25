import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import firebase from "../firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: null
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    }
  },
  actions: {
    async fetchUserProfile({ commit, state }) {
      let tempUserProfile = await firebase.db
        .collection("users")
        .doc(state.currentUser.uid)
        .get();
      let data = tempUserProfile.data();
      commit("setUserProfile", data);
    }
  },
  modules: {},
  getters: {
    currentUser: state => {
      return state.currentUser;
    },
    userProfile: state => {
      return state.userProfile;
    }
  },
  plugins: [createPersistedState()]
});
