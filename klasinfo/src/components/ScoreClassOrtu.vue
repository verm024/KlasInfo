<template>
  <v-container>
    <h3>
      Ini skor gan
    </h3>
    <!-- <div v-for="(item, index) in daftar_nilai" :key="index">
      <v-card outlined max-width="200px">
        <v-card-title>
          {{ item.tugas.nama }}
        </v-card-title>
        <v-card-subtitle> Nilai: {{ item.nilai }} </v-card-subtitle>
      </v-card>
    </div> -->
    <v-simple-table class="table">
      <thead class="thead-dark">
        <tr>
          <th>Tugas</th>
          <th>Nilai</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in daftar_nilai" :key="index">
          <td>{{ item.tugas.nama }}</td>
          <td>{{ item.nilai }}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-container>
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
                .doc(this.currentUser.getUid())
                .collection("anak")
                .doc(this.currentAnak.getId())
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
