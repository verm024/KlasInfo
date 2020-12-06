<template>
  <v-app>
    <v-app-bar app color="#27496d" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
      <v-list class="hidden-sm-and-down" color="#27496d">
        <router-link to="/">
          <v-btn text> Home </v-btn>
        </router-link>
        <router-link
          v-if="currentUser && currentUser.getUserProfile()"
          :to="'/' + currentUser.getUserProfile().role"
        >
          <v-btn text> Dashboard </v-btn>
        </router-link>
        <v-btn v-if="!currentUser" @click="$router.push('/login')" text>
          <span class="mr-2">Login</span>
        </v-btn>
        <v-btn v-if="!currentUser" @click="$router.push('/register')" text>
          <span class="mr-2">Register</span>
        </v-btn>
        <v-btn v-if="currentUser" @click="logout" text>
          <span class="mr-2">Logout</span>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </v-list>
      <v-menu class="hidden-md-and-up" bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="hidden-md-and-up" dark icon v-bind="attrs" v-on="on">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>

        <v-list>
          <router-link to="/">
            <v-btn text> Home </v-btn>
          </router-link>
          <router-link
            v-if="currentUser && currentUser.getUserProfile()"
            :to="'/' + currentUser.getUserProfile().role"
          >
            <v-btn text> Dashboard </v-btn>
          </router-link>
          <v-btn v-if="!currentUser" @click="$router.push('/login')" text>
            <span class="mr-2">Login</span>
          </v-btn>
          <v-btn v-if="!currentUser" @click="$router.push('/register')" text>
            <span class="mr-2">Register</span>
          </v-btn>
          <v-btn v-if="currentUser" @click="logout" text>
            <span class="mr-2">Logout</span>
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "./firebase";
import { mapState } from "vuex";

export default {
  name: "App",

  data() {
    return {};
  },
  methods: {
    async logout() {
      try {
        await firebase.auth.signOut();
      } catch (error) {
        console.error(error);
      }
      this.$store.commit("setCurrentUser", null);
      this.$store.commit("setCurrentAnak", null);
      this.$router.push("/login");
    }
  },
  computed: {
    ...mapState(["currentUser"])
  }
};
</script>
