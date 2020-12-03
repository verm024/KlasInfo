<template>
  <div class="guru container">
    <!-- <Navbar /> -->
    <div>
      Dashboard Guru
    </div>
    <v-btn
      class="white--text"
      color="#27496d"
      @click="$router.push('/create-class')"
      >Tambah Kelas</v-btn
    >
    <div style="max-width: fit-content">
      <div class="mt-10 d-inline-block" v-for="(item, index) in daftar_kelas" :key="index">
        <v-card
          class="mr-10"
            @click="$router.push(`/guru/class/${item.id}`)"
            max-width="300px"
          >
            <v-img :src="item.foto" height="200px"></v-img>

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
import Navbar from "@/components/Navbar";

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
