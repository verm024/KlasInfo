<template>
  <v-app>
    <v-app-bar app color="#27496d" dark>
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="./assets/KlasInfoWhite.png"
            transition="scale-transition"
            width="180"
          />
        </router-link>
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
        <router-link to="/login">
          <v-btn v-if="!currentUser" text>
            <span class="mr-2">Login</span>
          </v-btn>
        </router-link>
        <router-link to="/register">
          <v-btn v-if="!currentUser" text>
            <span class="mr-2">Register</span>
          </v-btn>
        </router-link>
        <v-btn v-if="currentUser" @click="logout" text>
          <span class="mr-2">Logout</span>
          <v-icon>mdi-logout</v-icon>
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
          <router-link to="/login">
            <v-btn v-if="!currentUser" text>
              <span class="mr-2">Login</span>
            </v-btn>
          </router-link>
          <router-link to="/register">
            <v-btn v-if="!currentUser" text>
              <span class="mr-2">Register</span>
            </v-btn>
          </router-link>
          <v-btn v-if="currentUser" @click="logout" text>
            <span class="mr-2">Logout</span>
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-list>
      </v-menu>
    </v-app-bar>
    <!-- <Navbar /> -->

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "./firebase";
import { mapState } from "vuex";
// import Navbar from "@/components/Navbar";

export default {
  name: "App",

  data() {
    return {};
  },
  // components: {
  //   Navbar
  // },
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

<style>
a {
  text-decoration: none;
}

.page-title {
  font-size: 30px !important;
  font-weight: bold;
}

.empty {
  opacity: 0.7;
}
</style>
