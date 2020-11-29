import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import firebase from "../firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: null,
    currentAnak: null
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setCurrentAnak(state, val) {
      state.currentAnak = val;
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
    },
    async fetchCurrentAnak({ commit, state }) {
      if (state.userProfile.role == "ortu") {
        if (state.currentAnak == null) {
          let doc = await firebase.db
            .collection("users")
            .doc(state.currentUser.uid)
            .collection("anak")
            .orderBy("tanggal_dibuat")
            .get();
          if (!doc.empty) {
            let anak = {
              ...doc.docs[0].data(),
              id: doc.docs[0].id
            };
            commit("setCurrentAnak", anak);
          }
        }
      }
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
