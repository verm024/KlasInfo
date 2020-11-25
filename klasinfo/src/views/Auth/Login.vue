<template>
  <div class="login">
    <input type="text" placeholder="email" v-model="form_login.email" />
    <input
      type="password"
      placeholder="password"
      v-model="form_login.password"
    />
    <button @click="login">Login</button>
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
        this.$router.push("/" + this.$store.state.userProfile.role);
      }
    }
  }
};
</script>

<style></style>
