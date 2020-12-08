<template>
  <div>
    <v-container>
      <h3 class="mb-5">Tugas Belum Selesai</h3>
      <v-data-table
        :headers="headers"
        :items="filterOngoing"
        :items-per-page="5"
        item-key="index"
        class="elevation-2"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>
              {{ item.nama }}
            </td>
            <td>
              {{ item.deskripsi }}
            </td>
            <td>
              {{ formatDate(item.deadline.seconds) }}
            </td>
            <td>
              <v-btn
                class="white--text"
                color="#27496d"
                :href="item.dokumen"
                target="_blank"
                small
              >
                <v-icon left>mdi-file-download</v-icon>
                Unduh
              </v-btn>
            </td>
          </tr>
        </template>

        <template v-slot:no-data>
          Belum ada tugas
        </template>
      </v-data-table>
    </v-container>
    <v-container class="mt-4">
      <h3 class="mb-5">Tugas Sudah Selesai</h3>
      <v-data-table
        :headers="headers"
        :items="filterSelesai"
        :items-per-page="5"
        item-key="index"
        class="elevation-2"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>
              {{ item.nama }}
            </td>
            <td>
              {{ item.deskripsi }}
            </td>
            <td>
              {{ formatDate(item.deadline.seconds) }}
            </td>
            <td>
              <v-btn
                class="white--text"
                color="#27496d"
                :href="item.dokumen"
                target="_blank"
                small
              >
                <v-icon left>mdi-file-download</v-icon>
                Unduh
              </v-btn>
            </td>
          </tr>
        </template>

        <template v-slot:no-data>
          Belum ada tugas
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
          text: "Batas Waktu",
          sortable: true,
          value: "deadline"
        },
        {
          text: "Berkas",
          sortable: false,
          value: "controls"
        }
      ];
    }
  }
};
</script>

<style></style>
