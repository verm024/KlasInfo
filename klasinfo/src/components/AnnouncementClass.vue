<template>
  <v-container>
    <div class="text-center text-h4 mb-5">Daftar Pengumuman</div>
    <!-- Form tambah tugas -->
    <h3 class="mb-2">Buat Pengumuman Baru</h3>
    <v-card>
      <v-form class="pa-5 mb-3">
        <v-text-field
          v-model="pengumuman_baru.nama"
          label="Judul Pengumuman"
          outlined
        ></v-text-field>
        <v-textarea
          v-model="pengumuman_baru.deskripsi"
          label="Deskripsi Pengumuman"
          outlined
        ></v-textarea>
        <div align="center">
          <v-btn class="white--text" color="#3282b8" @click="tambahPengumuman"
            >Tambah</v-btn
          >
        </div>
      </v-form>
    </v-card>

    <!-- Daftar Tugas -->
    <h3 class="mt-8 mb-3">Daftar Pengumuman Lama</h3>
    <div>
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
          Belum ada pengumuman
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<script>
import firebase from "@/firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      rules: [
        (value) =>
          !value ||
          value.size < 5000000 ||
          "Ukuran file tidak boleh melebihi 5 MB!",
      ],
      daftar_pengumuman: [],
      pengumuman_baru: {
        nama: "",
        deskripsi: "",
      },
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
        );
      },
    },
  },
  methods: {
    async tambahPengumuman() {
      if (
        this.pengumuman_baru.nama == "" ||
        this.pengumuman_baru.deskripsi == ""
      ) {
        alert("Form pengumuman tidak boleh kosong");
      } else {
        let dataPengumuman = {
          ...this.pengumuman_baru,
          tanggal_ditambahkan: firebase.timestamp,
        };
        try {
          let doc = await firebase.db
            .collection("kelas")
            .doc(this.$route.params.id)
            .collection("pengumuman")
            .add(dataPengumuman);
          alert("Berhasil menambahkan pengumuman!");
        } catch (error) {
          console.error(error);
        }
      }
    },
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
        "Desember",
      ];
      return (
        hours + ":" + minutes + " - " + date + " " + months[month] + " " + year
      );
    },
  },
  computed: {
    headers() {
      return [
        {
          text: "Nama Pengumuman",
          align: "start",
          sortable: false,
          value: "nama",
        },
        {
          text: "Deskripsi",
          sortable: false,
          value: "deskripsi",
        },
        {
          text: "Tanggal Dibuat",
          sortable: true,
          value: "tanggal_ditambahkan",
        },
      ];
    },
  },
};
</script>

<style></style>
