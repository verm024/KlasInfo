<template>
  <div>
    <v-container>
      <h3>Tugas Belum Selesai</h3>
      <v-simple-table class="elevation-2">
        <thead>
          <tr>
            <th>Nama Tugas</th>
            <th>Deskripsi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filterOngoing" :key="'ongoing-' + index">
            <td>{{ item.nama }}</td>
            <td>{{ item.deskripsi }}</td>
            <v-btn
              class="white--text"
              color="#27496d"
              :href="item.dokumen"
              target="_blank"
            >
              <v-icon left>mdi-file-download</v-icon>
              Berkas
            </v-btn>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>
    <v-spacer></v-spacer>
    <v-container>
      <h3>Tugas Sudah Selesai</h3>
      <v-data-table
        :headers="headers"
        :items="filterSelesai"
        :items-per-page="5"
        item-key="index"
        class="elevation-2"
      >
        // eslint-disable-next-line
        <template v-slot:item.controls="{ item }">
          <v-btn
            class="white--text"
            color="#27496d"
            :href="item.dokumen"
            target="_blank"
          >
            <v-icon left>mdi-file-download</v-icon>
            Berkas
          </v-btn>
        </template>
      </v-data-table>
    </v-container>
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
    },
    headers() {
      return [
        {
          text: "Nama Tugas",
          align: "start",
          sortable: false,
          value: "nama"
        },
        {
          text: "Deskripsi",
          sortable: false,
          value: "deskripsi"
        },
        {
          text: "Aksi",
          sortable: false,
          value: "controls"
        }
      ];
    }
  }
};
</script>

<style></style>
