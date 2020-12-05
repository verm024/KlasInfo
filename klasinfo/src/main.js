import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { firestorePlugin } from "vuefire";
import firebase from "./firebase";
import { User } from "./classes";

Vue.config.productionTip = false;
Vue.use(firestorePlugin);

let app;
firebase.auth.onState;

firebase.auth.onAuthStateChanged(async user => {
  if (user) {
    store.commit("setCurrentUser", new User(user));
    await store.dispatch("fetchUserProfile");
    await store.dispatch("fetchCurrentAnak");
  } else {
    store.commit("setCurrentUser", null);
    store.commit("setCurrentAnak", null);
  }
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});
