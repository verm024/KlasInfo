<template>
  <div>
    Ini skor gan
    <div v-for="(item, index) in daftar_nilai" :key="index">
      {{ item.tugas.nama }}: {{ item.nilai }}
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      detail_join: [],
      daftar_nilai: []
    };
  },
  computed: {
    ...mapState(["currentUser", "currentAnak"])
  },
  watch: {
    get_detail_join: {
      immediate: true,
      handler() {
        this.$bind(
          "detail_join",
          firebase.db
            .collection("join")
            .where(
              "kelas",
              "==",
              firebase.db.collection("kelas").doc(this.$route.params.id)
            )
            .where(
              "anak",
              "==",
              firebase.db
                .collection("users")
                .doc(this.currentUser.uid)
                .collection("anak")
                .doc(this.currentAnak.id)
            )
        ).then(() => {
          if (this.detail_join.length > 0) {
            this.$bind(
              "daftar_nilai",
              firebase.db
                .collection("join")
                .doc(this.detail_join[0].id)
                .collection("nilai")
            );
          }
        });
      }
    }
  }
};
</script>

<style></style>
