<template>
  <div class="detail-class">
    Detail tentang kelas, seperti apa aja yg bisa dilakukan di kelas itu (buat
    guru)
    <br />
    Nama kelas: {{ data_kelas.nama }}
  </div>
</template>

<script>
import firebase from "@/firebase";
import store from "@/store";
import { mapState } from "vuex";

export default {
  data() {
    return {
      data_kelas: []
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
      }
    }
  },
  async beforeRouteEnter(to, from, next) {
    let doc = await firebase.db
      .collection("kelas")
      .doc(to.params.id)
      .get();
    if (doc.exists) {
      let data = doc.data();
      if (data.guru.id == store.state.currentUser.uid) {
        next();
      } else {
        next("/guru");
      }
    } else {
      next("/guru");
    }
  }
};
</script>

<style></style>
