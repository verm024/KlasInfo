<template>
  <v-container>
    <div class="text-center text-h4 mb-5">Daftar Anggota Kelas</div>
    <v-data-table
      :headers="headers"
      :items="daftar_member"
      :items-per-page="5"
      item-key="index"
      class="elevation-2"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>
            {{ item.anak.nama }}
          </td>
          <td>
            {{ item.anak.nis }}
          </td>
        </tr>
      </template>

      <template v-slot:no-data>
        Belum ada anggota
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
      daftar_member: [],
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
      },
    },
  },
  computed: {
    // filterSelesai() {
    //   return this.daftar_member.filter(element => {
    //     return element.deadline <= firebase.timestamp;
    //   });
    // },
    // filterOngoing() {
    //   return this.daftar_member.filter(element => {
    //     return element.deadline > firebase.timestamp;
    //   });
    // },
    headers() {
      return [
        {
          text: "Nama Anak",
          align: "start",
          sortable: false,
          value: "nama",
        },
        {
          text: "Nomor Induk Sekolah",
          align: "start",
          sortable: false,
          value: "nis",
        },
      ];
    },
  },
};
</script>

<style></style>
