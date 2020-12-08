<template>
  <v-container>
    <h3 class="mb-5">Daftar Perolehan Nilai</h3>
    <v-data-table
      :headers="headers"
      :items="daftar_nilai"
      item-key="index"
      :search="search"
      :items-per-page="5"
      class="elevation-2"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Cari Tugas"
          class="mx-4 px-5 pt-7"
        ></v-text-field>
      </template>
      <template v-slot:item="{ item }">
        <tr v-if="item.tugas.deadline">
          <td>
            {{ item.tugas.nama }}
          </td>
          <td>
            {{ formatDate(item.tugas.deadline.seconds) }}
          </td>
          <td>
            {{ item.nilai }}
          </td>
        </tr>
      </template>
      <template v-slot:no-data>
        Belum ada nilai
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import firebase from "@/firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      search: "",
      detail_join: [],
      daftar_nilai: []
    };
  },
  computed: {
    ...mapState(["currentUser", "currentAnak"]),
    headers() {
      return [
        {
          text: "Nama Tugas",
          align: "start",
          sortable: true,
          value: "tugas.nama"
        },
        {
          text: "Batas Waktu",
          align: "start",
          sortable: true,
          value: "tugas.deadline"
        },
        {
          text: "Nilai",
          sortable: true,
          value: "nilai"
        }
      ];
    }
  },
  methods: {
    formatDate(timestamp) {
      let date = new Date(timestamp * 1000);
      let month = date.getMonth();
      let year = date.getFullYear();
      let months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
      ];
      date = date.getDate();
      if (date < 10) {
        date = "0" + date;
      }
      return date + " " + months[month] + " " + year;
    }
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
