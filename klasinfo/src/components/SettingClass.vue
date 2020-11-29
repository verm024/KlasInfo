<template>
  <v-card>
    <input type="text" v-model="edit_data_kelas.nama" />
    <input type="text" v-model="edit_data_kelas.deskripsi" />
    <input type="file" @change="handleChangeFile" />
    <button @click="saveChanges">Save</button>
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
      foto: ""
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
      }
    }
  },
  methods: {
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
              guru: firebase.db.collection("users").doc(this.currentUser.uid)
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
