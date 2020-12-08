<template>
  <v-container>
    <div class="text-center text-h4">Form Pengaturan Kelas</div>
    <div align="center" class="mx-12 mt-5">
      <v-img :src="edit_data_kelas.foto" max-width="200px"
        ><v-overlay absolute opacity="0.2"></v-overlay
      ></v-img>
      <div align="left">
        Ganti gambar:
        <input class="my-7" type="file" @change="handleChangeFile" />
      </div>
      <v-text-field
        v-model="edit_data_kelas.nama"
        label="Nama Kelas"
        outlined
      ></v-text-field>
      <v-textarea
        v-model="edit_data_kelas.deskripsi"
        label="Deskripsi"
        outlined
      ></v-textarea>
    </div>

    <div class="text-center text-h5">Jadwal Kelas</div>
    <div class="mt-5" align="center">
      <v-btn
        outlined
        color="#27496d"
        @click="jadwal.push({ hari: '', jam_mulai: '', jam_selesai: '' })"
      >
        Tambah
      </v-btn>
      <v-simple-table class="mx-12 mt-5" fixed-header height="300px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Hari
              </th>
              <th class="text-left">
                Jam Mulai
              </th>
              <th class="text-left">
                Jam Selesai
              </th>
              <th class="text-left">
                Opsi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in jadwal" :key="index">
              <td>
                <v-text-field type="text" v-model="item.hari" />
              </td>
              <td>
                <v-text-field type="text" v-model="item.jam_mulai" />
              </td>
              <td>
                <v-text-field type="text" v-model="item.jam_selesai" />
              </td>
              <td>
                <v-btn
                  class="white--text"
                  color="red"
                  @click.prevent="deleteRow(index)"
                  >Hapus</v-btn
                >
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-btn class="white--text" color="#3282b8" @click="saveChanges"
        >Simpan</v-btn
      >
    </div>
  </v-container>
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
              guru: firebase.db
                .collection("users")
                .doc(this.currentUser.getUid()),
              jadwal: this.jadwal
            });
        } catch (error) {
          alert("Gagal memperbarui data kelas");
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
      alert("Pembaruan data kelas berhasil");
    }
  }
};
</script>
