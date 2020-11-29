<template>
  <v-card>
    <div v-for="(item, index) in daftar_member" :key="index">
      {{ item.anak.nama }}
    </div>
  </v-card>
</template>

<script>
import firebase from "@/firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      daftar_member: []
    };
  },
  watch: {
    get_daftar_member: {
      immediate: true,
      handler() {
        this.$bind(
          "daftar_member",
          firebase.db
            .collection("join")
            .where(
              "kelas",
              "==",
              firebase.db.collection("kelas").doc(this.$route.params.id)
            )
        );
      }
    }
  }
};
</script>

<style></style>
