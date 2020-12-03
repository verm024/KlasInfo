<template>
  <div class="guru">
    <!-- <Navbar /> -->

    Dashboard Guru
    <div v-for="(item, index) in daftar_kelas" :key="index">
      {{ item.nama }}
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase";
import { mapState } from "vuex";
// import Navbar from "@/components/Navbar";

export default {
  data() {
    return {
      daftar_kelas: []
    };
  },
  // components: {
  //   Navbar
  // },
  computed: {
    ...mapState(["currentUser"])
  },
  watch: {
    get_daftar_kelas: {
      immediate: true,
      handler() {
        this.$bind(
          "daftar_kelas",
          firebase.db
            .collection("kelas")
            .where(
              "guru",
              "==",
              firebase.db.collection("users").doc(this.currentUser.uid)
            )
            .orderBy("nama")
        );
      }
    }
  }
};
</script>

<style></style>
