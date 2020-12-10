<template>
  <div>
    <v-container>
      <h3 class="mb-5">Daftar Pengumuman</h3>
      <v-data-table
        :headers="headers"
        :items="daftar_pengumuman"
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
              {{ formatDate(item.tanggal_ditambahkan.seconds) }}
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
      daftar_pengumuman: []
    };
  },
  watch: {
    get_daftar_pengumuman: {
      immediate: true,
      handler() {
        this.$bind(
          "daftar_pengumuman",
          firebase.db
            .collection("kelas")
            .doc(this.$route.params.id)
            .collection("pengumuman")
            .orderBy("tanggal_ditambahkan", "desc")
        ).then(() => {});
      }
    }
  },
  methods: {
    formatDate(timestamp) {
      let date = new Date(timestamp * 1000);
      let month = date.getMonth();
      let year = date.getFullYear();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      if (hours < 10) {
        hours = 0 + hours.toString();
      }
      if (minutes < 10) {
        minutes = 0 + minutes.toString();
      }
      date = date.getDate();
      if (date < 10) {
        date = "0" + date;
      }
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
      return (
        hours + ":" + minutes + " - " + date + " " + months[month] + " " + year
      );
    }
  },
  computed: {
    headers() {
      return [
        {
          text: "Nama Pengumuman",
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
          text: "Tanggal Dibuat",
          sortable: true,
          value: "tanggal_ditambahkan"
        }
      ];
    }
  }
};
</script>

<style></style>
