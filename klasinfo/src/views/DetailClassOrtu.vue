<template>
  <div>
    <h2>Detail Kelas buat ortu</h2>

    <AssignmentClassOrtu />
    <ScoreClassOrtu />
  </div>
</template>

<script>
import firebase from "@/firebase";
import store from "@/store";
import { mapState } from "vuex";

import AssignmentClassOrtu from "../components/AssignmentClassOrtu";
import ScoreClassOrtu from "../components/ScoreClassOrtu";

export default {
  data() {
    return {
      data_kelas: [],
    };
  },
  watch: {
    get_data_kelas: {
      immediate: true,
      handler() {
        this.$bind(
          "data_kelas",
          firebase.db.collection("kelas").doc(this.$route.params.id)
        );
      },
    },
  },
  components: {
    AssignmentClassOrtu,
    ScoreClassOrtu,
  },
  computed: {
    ...mapState(["currentUser", "userProfile"]),
  },
  async beforeRouteEnter(to, from, next) {
    let doc = await firebase.db.collection("kelas").doc(to.params.id).get();
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
  },
};
</script>

<style></style>
