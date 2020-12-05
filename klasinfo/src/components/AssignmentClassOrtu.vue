<template>
  <div>
    <v-card>
      <v-container>
        Tugas selesai
        <div v-for="(item, index) in filterSelesai" :key="'selesai-' + index">
          Nama: {{ item.nama }}
        </div>
      </v-container>
    </v-card>
    <v-spacer></v-spacer>
    <v-card>
      <v-container>
        Tugas Belum selesai
        <div v-for="(item, index) in filterOngoing" :key="'ongoing-' + index">
          Nama: {{ item.nama }}
        </div>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import firebase from "@/firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      daftar_tugas: []
    };
  },
  watch: {
    get_daftar_tugas: {
      immediate: true,
      handler() {
        this.$bind(
          "daftar_tugas",
          firebase.db
            .collection("kelas")
            .doc(this.$route.params.id)
            .collection("tugas")
            .orderBy("deadline")
        ).then(() => {});
      }
    }
  },
  computed: {
    filterSelesai() {
      return this.daftar_tugas.filter(element => {
        return element.deadline <= firebase.timestamp;
      });
    },
    filterOngoing() {
      return this.daftar_tugas.filter(element => {
        return element.deadline > firebase.timestamp;
      });
    }
  }
};
</script>

<style></style>
