<template>
  <div class="ortu">
    Dashboard ortu
  </div>
</template>

<script>
import firebase from "@/firebase";
import store from "@/store";

export default {
  data() {
    return {};
  },
  async beforeRouteEnter(to, from, next) {
    try {
      let doc = await firebase.db
        .collection("users")
        .doc(store.state.currentUser.uid)
        .collection("anak")
        .get();
      if (doc.empty) {
        next("/create-child");
      } else {
        next();
      }
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<style></style>
