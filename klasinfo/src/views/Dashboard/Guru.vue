<template>
  <div class="guru container mt-12 mb-16">
    <div class="d-flex align-center justify-space-between">
      <div class="page-title">
        Dashboard
      </div>
      <v-btn outlined color="#27496d" @click="$router.push('/create-class')"
        >Tambah Kelas</v-btn
      >
    </div>
    <div class="text-center">
      <div
        class="mt-10 d-inline-block"
        v-for="(item, index) in daftar_kelas"
        :key="index"
      >
        <v-card
          class="mr-10 ml-10 text-left"
          @click="$router.push(`/guru/class/${item.id}`)"
          width="300px"
          rounded="xl"
        >
          <v-img :src="item.foto" height="180px"
            ><v-overlay absolute opacity="0.2"></v-overlay
          ></v-img>

          <v-card-title>
            {{ item.nama }}
          </v-card-title>

          <v-card-subtitle> Kode Kelas: {{ item.id }} </v-card-subtitle>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      daftar_kelas: []
    };
  },
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
              firebase.db.collection("users").doc(this.currentUser.getUid())
            )
            .orderBy("nama")
        );
      }
    }
  }
};
</script>

<style scoped></style>
