<template>
  <div class="container">
    <v-card class="mx-auto px-10 py-5 my-12" max-width="500" min-height="350">
      <v-card-text>
        <div class="title text-center mb-5">Tambah Anak</div>
        <v-form class="ma-40" ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="form_anak.nama"
            label="Nama Anak"
            type="text"
            outlined
          ></v-text-field>

          <v-text-field
            v-model="form_anak.nis"
            label="Nomor Induk"
            type="text"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="form_anak.sekolah"
            label="Asal Sekolah"
            type="text"
            outlined
          ></v-text-field>

          <div class="button text-center">
            <v-btn
              elevation="0"
              class="mb-5 white--text"
              color="#0F4C75"
              @click="createChild"
            >
              TAMBAH
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

export default {
  data() {
    return {
      form_anak: {
        nama: "",
        nis: "",
        sekolah: ""
      }
    };
  },
  computed: {
    ...mapState(["currentUser"])
  },
  methods: {
    async createChild() {
      if (
        this.form_anak.nama == "" ||
        this.form_anak.nis == "" ||
        this.form_anak.sekolah == ""
      ) {
        alert("Form nama, nis, dan sekolah tidak boleh kosong!");
      } else {
        try {
          await firebase.db
            .collection("users")
            .doc(this.currentUser.getUid())
            .collection("anak")
            .add({ ...this.form_anak, tanggal_dibuat: firebase.timestamp });
          await this.$store.dispatch("fetchCurrentAnak");
          this.$router.push("/ortu");
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
};
</script>

<style></style>
