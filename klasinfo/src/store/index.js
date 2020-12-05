import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import firebase from "../firebase";
import { Anak } from "../classes";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    currentAnak: null
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setCurrentAnak(state, val) {
      state.currentAnak = val;
    }
  },
  actions: {
    async fetchUserProfile({ commit, state }) {
      let tempUserProfile = await firebase.db
        .collection("users")
        .doc(state.currentUser.getUid())
        .get();
      let data = tempUserProfile.data();
      state.currentUser.setUserProfile(data);
    },
    async fetchCurrentAnak({ commit, state }) {
      if (state.currentUser.getUserProfile().role == "ortu") {
        let anak
        if (state.currentAnak == null) {
          let doc = await firebase.db
            .collection("users")
            .doc(state.currentUser.getUid())
            .collection("anak")
            .orderBy("tanggal_dibuat")
            .get();
          if (!doc.empty) {
            anak = {
              ...doc.docs[0].data(),
              id: doc.docs[0].id
            };
          }
        }
        else {
          anak = state.currentAnak.anak;
        }
        commit("setCurrentAnak", new Anak(anak));
      }
    }
  },
  modules: {},
  getters: {
    currentUser: state => {
      return state.currentUser;
    }
  },
  plugins: [createPersistedState()]
});
