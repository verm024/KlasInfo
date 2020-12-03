<template>
  <v-card>
    <!-- Form tambah tugas -->
    <div>
      <input type="text" placeholder="Nama Tugas" v-model="tugas_baru.nama" />
      <input
        type="text"
        placeholder="Deskripsi Tugas"
        v-model="tugas_baru.deskripsi"
      />
      <input
        type="date"
        placeholder="Deadline Tugas"
        v-model="tugas_baru.deadline"
      />
      <input type="file" @change="handleChangeFile" />
      <button @click="tambahTugas">Tambah</button>
    </div>

    <!-- Daftar Tugas -->
    Daftar Tugas:
    <div>
      <div v-for="(item, index) in daftar_tugas" :key="index">
        {{ item.nama }}
      </div>
    </div>
  </v-card>
</template>

<script>
import firebase from "@/firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      daftar_tugas: [],
      tugas_baru: {
        nama: "",
        deskripsi: "",
        deadline: ""
      },
      dokumen: ""
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
        );
      }
    }
  },
  methods: {
    async tambahTugas() {
      if (
        this.tugas_baru.nama == "" ||
        this.tugas_baru.deskripsi == "" ||
        this.tugas_baru.deadline == "" ||
        this.dokumen == ""
      ) {
        alert("Form tugas tidak boleh kosong");
      } else {
        let deadline = new Date(this.tugas_baru.deadline);
        deadline.setHours(23, 59, 0, 0);
        let dataTugas = {
          ...this.tugas_baru,
          deadline: deadline,
          tanggal_ditambahkan: firebase.timestamp
        };
        try {
          let doc = await firebase.db
            .collection("kelas")
            .doc(this.$route.params.id)
            .collection("tugas")
            .add(dataTugas);
          if (doc.id) {
            let ref = await firebase.storage
              .ref()
              .child(
                "/tugas/" +
                  this.$route.params.id +
                  "/" +
                  doc.id +
                  "." +
                  this.dokumen.type.split("/")[1]
              );
            let task = await ref.put(this.dokumen);
            let url = await task.ref.getDownloadURL();
            if (url) {
              try {
                await firebase.db
                  .collection("kelas")
                  .doc(this.$route.params.id)
                  .collection("tugas")
                  .doc(doc.id)
                  .update({ dokumen: url });
              } catch (error) {
                console.error(error);
              }
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
    handleChangeFile(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      if (!(files[0].type.includes("image") || files[0].type.includes("pdf"))) {
        this.dokumen = "";
        alert("File harus berupa gambar atau pdf");
      } else {
        this.dokumen = files[0];
      }
    }
  }
};
</script>

<style></style>
