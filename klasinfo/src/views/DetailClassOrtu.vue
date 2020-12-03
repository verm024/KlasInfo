<template>
  <div>
    Detail Kelas buat ortu
  </div>
</template>

<script>
import firebase from "@/firebase";
import store from "@/store";
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  async beforeRouteEnter(to, from, next) {
    let doc = await firebase.db
      .collection("kelas")
      .doc(to.params.id)
      .get();
    if (doc.exists) {
      let doc2 = await firebase.db
        .collection("join")
        .where("kelas", "==", firebase.db.collection("kelas").doc(to.params.id))
        .where(
          "anak",
          "==",
          firebase.db
            .collection("users")
            .doc(store.state.currentUser.uid)
            .collection("anak")
            .doc(store.state.currentAnak.id)
        )
        .get();
      if (doc2.docs.length > 0) {
        next();
      } else {
        next("/ortu");
      }
    } else {
      next("/ortu");
    }
  }
};
</script>

<style></style>
