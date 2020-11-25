<template>
  <div class="create-class">
    Tambah kelas baru
    <input type="text" placeholder="Nama Kelas" v-model="form_kelas.nama" />
    <input
      type="text"
      placeholder="Deskripsi kelas"
      v-model="form_kelas.deskripsi"
    />
    <input type="file" @change="handleChangeFile" />
    <button @click="tambahKelas">Tambah Kelas</button>
  </div>
</template>

<script>
import firebase from "@/firebase";
import { mapState } from "vuex";
import randomstring from "randomstring";

export default {
  data() {
    return {
      form_kelas: {
        nama: "",
        deskripsi: "",
        foto: ""
      }
    };
  },
  methods: {
    async tambahKelas() {
      if (this.form_kelas.nama == "" || this.form_kelas.deskripsi == "") {
        alert("Input nama dan deskripsi tidak boleh kosong!");
      } else {
        let dataKelas = {
          guru: firebase.db.collection("users").doc(this.currentUser.uid),
          nama: this.form_kelas.nama,
          deskripsi: this.form_kelas.deskripsi
        };
        try {
          let code = randomstring.generate({
            length: 8,
            charset: "alphabetic"
          });
          let found = false;
          while (!found) {
            let doc = await firebase.db
              .collection("kelas")
              .doc(code)
              .get();
            if (doc.exists) {
              code = randomstring.generate({
                length: 8,
                charset: "alphabetic"
              });
            } else {
              found = true;
            }
          }
          await firebase.db
            .collection("kelas")
            .doc(code)
            .set(dataKelas);
          let url;
          if (this.form_kelas.foto != "") {
            let ref = await firebase.storage
              .ref()
              .child(
                "/kelas/" + code + "." + this.form_kelas.foto.type.split("/")[1]
              );
            let task = await ref.put(this.form_kelas.foto);
            url = await task.ref.getDownloadURL();
          } else {
            url =
              "https://meenta.net/wp-content/uploads/2019/02/ruang-kelas-e1550401328334.jpg";
          }
          if (url) {
            try {
              await firebase.db
                .collection("kelas")
                .doc(code)
                .update({ foto: url });
            } catch (error) {
              alert("Some error happened, please try again!");
              console.error(error);
            }
            this.$router.push("/guru");
          }
        } catch (error) {
          alert("Some error happened, please try again!");
          console.error(error);
        }
      }
    },
    handleChangeFile(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      if (!files[0].type.includes("image")) {
        this.form_kelas.foto = "";
        alert("File harus berupa gambar berformat JPG, JPEG, atau PNG!");
      } else {
        this.form_kelas.foto = files[0];
      }
    }
  },
  computed: {
    ...mapState(["currentUser"])
  }
};
</script>

<style></style>
