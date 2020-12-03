<template>
  <div class="login container">
    <v-card class="mx-auto px-10 py-5 my-12" max-width="500" min-height="350">
      <v-card-text>
        <div class="title text-center mb-5">LOGIN</div>
        <v-form class="ma-40" ref="form" lazy-validation>
          <v-text-field
            v-model="form_login.email"
            label="E-mail"
            outlined
          ></v-text-field>

          <v-text-field
            v-model="form_login.password"
            label="Password"
            type="password"
            outlined
          ></v-text-field>

          <div class="button text-center">
            <v-btn
              elevation="0"
              class="mb-5 white--text"
              color="#0F4C75"
              @click="login"
            >
              LOGIN
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import firebase from "../../firebase";

export default {
  data() {
    return {
      form_login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      let user;
      try {
        user = await firebase.auth.signInWithEmailAndPassword(
          this.form_login.email,
          this.form_login.password
        );
      } catch (error) {
        console.error(error);
      }
      if (user) {
        user = user.user;
        this.$store.commit("setCurrentUser", user);
        await this.$store.dispatch("fetchUserProfile");
        await this.$store.dispatch("fetchCurrentAnak");
        this.$router.push("/" + this.$store.state.userProfile.role);
      }
    }
  }
};
</script>

<style scoped>
.button {
  text-decoration: none;
}

.button .v-btn {
  text-transform: capitalize;
  letter-spacing: unset;
  font-weight: normal;
}
</style>
