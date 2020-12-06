<template>
  <v-container>
    <h3>Daftar Perolehan Nilai</h3>
    <v-data-table
      :headers="headers"
      :items="daftar_nilai"
      item-key="index"
      :search="search"
      :items-per-page="5"
      :custom-filter="filterOnlyLowerCase"
      class="elevation-2"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Cari nama tugas (lower case)"
          class="mx-4"
        ></v-text-field>
      </template>

      // eslint-disable-next-line
      <template v-slot:body.append></template>
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
          sortable: false,
          value: "tugas.nama"
        },
        {
          text: "Nilai",
          sortable: true,
          value: "nilai"
        }
      ];
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
  },
  methods: {
    filterOnlyLowerCase(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value
          .toString()
          .toLocaleLowerCase()
          .indexOf(search) !== -1
      );
    }
  }
};
</script>

<style></style>
