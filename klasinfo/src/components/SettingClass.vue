<template>
  <v-card>
    Form Setting kelas:
    <input type="text" v-model="edit_data_kelas.nama" />
    <input type="text" v-model="edit_data_kelas.deskripsi" />
    <input type="file" @change="handleChangeFile" />
    <div v-for="(item, index) in jadwal" :key="index">
      <v-form lazy-validation>
        <input type="text" v-model="item.hari" />
        <input type="text" v-model="item.jam_mulai" />
        <input type="text" v-model="item.jam_selesai" />
        <button @click.prevent="deleteRow(index)">Hapus</button>
      </v-form>
    </div>
    <button @click="jadwal.push({ hari: '', jam_mulai: '', jam_selesai: '' })">
      Tambah
    </button>
    <v-btn @click="saveChanges">Save</v-btn>
  </v-card>
</template>

<script>
import firebase from "@/firebase";
import { mapState } from "vuex";

export default {
  props: ["data_kelas"],
  data() {
    return {
      edit_data_kelas: [],
      foto: "",
      jadwal: [
        {
          hari: "Senin",
          jam_mulai: "07:00",
          jam_selesai: "09:00"
        }
      ],
      form_counter: 1
    };
  },
  computed: {
    ...mapState(["currentUser"])
  },
  watch: {
    data_kelas: {
      immediate: true,
      handler() {
        this.edit_data_kelas = JSON.parse(JSON.stringify(this.data_kelas));
        this.jadwal = this.edit_data_kelas.jadwal;
      }
    }
  },
  methods: {
    deleteRow(index) {
      this.jadwal.splice(index, 1);
    },
    handleChangeFile(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      if (!files[0].type.includes("image")) {
        this.foto = "";
        alert("File harus berupa gambar berformat JPG, JPEG, atau PNG!");
      } else {
        this.foto = files[0];
      }
    },
    async saveChanges() {
      if (
        this.edit_data_kelas.nama == "" ||
        this.edit_data_kelas.deskripsi == ""
      ) {
        alert("Input nama dan deskripsi tidak boleh kosong!");
        return;
      } else {
        try {
          await firebase.db
            .collection("kelas")
            .doc(this.$route.params.id)
            .update({
              ...this.edit_data_kelas,
              guru: firebase.db.collection("users").doc(this.currentUser.uid),
              jadwal: this.jadwal
            });
        } catch (error) {
          console.error(error);
        }
      }
      if (this.foto != "") {
        let ref = await firebase.storage
          .ref()
          .child(
            "/kelas/" +
              this.$route.params.id +
              "." +
              this.foto.type.split("/")[1]
          );
        let task = await ref.put(this.foto);
        let url = await task.ref.getDownloadURL();
        if (url) {
          try {
            await firebase.db
              .collection("kelas")
              .doc(this.$route.params.id)
              .update({ foto: url });
          } catch (error) {
            alert("Some error happened, please try again!");
            console.error(error);
          }
        }
      }
    }
  }
};
</script>
