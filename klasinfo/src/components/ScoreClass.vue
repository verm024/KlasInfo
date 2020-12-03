<template>
  <v-card>
    Nilai Tugas {{ current_tugas.nama }}
    <div v-for="(item, index) in daftar_nilai" :key="index">
      {{ item.anak.nama }} - {{ item.nilai }}
      <input type="number" v-model="item.nilai" />
      <button @click="saveNilai(index)">Save</button>
    </div>
    <v-select
      :items="daftar_tugas"
      return-object
      item-text="nama"
      v-model="current_tugas"
      @change="handleChangeTugas"
    ></v-select>
  </v-card>
</template>

<script>
import firebase from "@/firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      daftar_member: [],
      daftar_tugas: [],
      daftar_nilai: [],
      current_tugas: ""
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
        ).then(() => {
          this.daftar_member.forEach(async element => {
            try {
              let doc = await firebase.db
                .collection("join")
                .doc(element.id)
                .collection("nilai")
                .doc(this.current_tugas.id)
                .get();
              let dataNilai = "";
              if (doc.exists) {
                let data = doc.data();
                dataNilai = {
                  ...element,
                  id: element.id,
                  nilai: data.nilai
                };
              } else {
                dataNilai = {
                  ...element,
                  id: element.id,
                  nilai: 0
                };
              }
              this.daftar_nilai.push(dataNilai);
            } catch (error) {
              console.error(error);
            }
          });
        });
      }
    },
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
        ).then(() => {
          if (this.daftar_tugas.length > 0) {
            this.current_tugas = this.daftar_tugas[0];
          }
        });
      }
    }
  },
  methods: {
    async handleChangeTugas() {
      this.daftar_nilai = [];
      this.daftar_member.forEach(async element => {
        try {
          let doc = await firebase.db
            .collection("join")
            .doc(element.id)
            .collection("nilai")
            .doc(this.current_tugas.id)
            .get();
          let dataNilai = "";
          if (doc.exists) {
            let data = doc.data();
            dataNilai = {
              ...element,
              id: element.id,
              nilai: data.nilai
            };
          } else {
            dataNilai = {
              ...element,
              id: element.id,
              nilai: 0
            };
          }
          this.daftar_nilai.push(dataNilai);
        } catch (error) {
          console.error(error);
        }
      });
    },
    async saveNilai(index) {
      let dataNilai = {
        nilai: this.daftar_nilai[index].nilai,
        tugas: firebase.db
          .collection("kelas")
          .doc(this.$route.params.id)
          .collection("tugas")
          .doc(this.current_tugas.id),
        tanggal_nilai: firebase.timestamp
      };
      try {
        await firebase.db
          .collection("join")
          .doc(this.daftar_nilai[index].id)
          .collection("nilai")
          .doc(this.current_tugas.id)
          .set(dataNilai);
        alert("Pembaruan nilai berhasil");
      } catch (error) {
        alert("Gagal memperbarui nilai");
        console.error(error);
      }
    }
  }
};
</script>

<style></style>
