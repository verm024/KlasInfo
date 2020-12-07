<template>
  <div class="create-class container">
    <v-card class="mx-auto px-10 py-5 my-12" max-width="500" min-height="350">
      <v-card-text>
        <div class="title text-center mb-5">Buat Kelas</div>
        <v-form class="ma-40" ref="form" lazy-validation>
          <v-text-field
            v-model="form_kelas.nama"
            label="Nama Kelas"
            outlined
          ></v-text-field>
          <v-textarea
            v-model="form_kelas.deskripsi"
            label="Deskripsi"
            outlined
          ></v-textarea>
          <div class="form-sub">
            Foto Kelas
          </div>
          <input type="file" @change="handleChangeFile" />
          <div class="button text-center">
            <v-btn
              elevation="0"
              class="mb-5 white--text"
              color="#0F4C75"
              @click="tambahKelas"
            >
              Tambah
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
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
        alert("Kelas berhasil dibuat!");
        let dataKelas = {
          guru: firebase.db.collection("users").doc(this.currentUser.getUid()),
          nama: this.form_kelas.nama,
          deskripsi: this.form_kelas.deskripsi,
          tanggal_dibuat: firebase.timestamp,
          jadwal: []
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

<style scoped>
.form-sub {
  color: black;
  margin-bottom: 10px;
}

.create-class .button {
  margin-top: 35px;
}
</style>
