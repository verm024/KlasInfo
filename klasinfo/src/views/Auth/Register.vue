<template>
  <div class="register">
    <input v-model="form_register.email" type="text" placeholder="email" />
    <input
      v-model="form_register.password"
      type="password"
      placeholder="password"
    />
    <select v-model="form_register.role">
      <option value="guru">Guru</option>
      <option value="ortu">Ortu</option>
    </select>
    <button @click="register">Register</button>
  </div>
</template>

<script>
import firebase from "../../firebase";

export default {
  data() {
    return {
      form_register: {
        email: "",
        password: "",
        role: "ortu"
      }
    };
  },
  methods: {
    async register() {
      let registerData;
      if (this.form_register.role == "guru") {
        registerData = {
          email: this.form_register.email,
          role: this.form_register.role
        };
      } else if (this.form_register.role == "ortu") {
        registerData = {
          email: this.form_register.email,
          role: this.form_register.role
        };
      }
      let user;
      try {
        user = await firebase.auth.createUserWithEmailAndPassword(
          this.form_register.email,
          this.form_register.password
        );
      } catch (error) {
        console.error(error);
      }
      user = user.user;
      try {
        await firebase.db
          .collection("users")
          .doc(user.uid)
          .set(registerData);
      } catch (error) {
        console.error(error);
      }
      this.$store.commit("setCurrentUser", user);
      await this.$store.dispatch("fetchUserProfile");
      await this.$store.dispatch("fetchCurrentAnak");
      this.$router.push("/" + this.form_register.role);
    }
  }
};
</script>

<style></style>
