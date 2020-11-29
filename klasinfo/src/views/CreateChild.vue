<template>
  <div>
    <input type="text" placeholder="Nama anak" v-model="form_anak.nama" />
    <input type="text" placeholder="Nomor Induk" v-model="form_anak.nis" />
    <input type="text" placeholder="Asal Sekolah" v-model="form_anak.sekolah" />
    <button @click="createChild">Tambah</button>
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
      try {
        await firebase.db
          .collection("users")
          .doc(this.currentUser.uid)
          .collection("anak")
          .add(this.form_anak);
        await this.$store.dispatch("fetchCurrentAnak");
        this.$router.push("/ortu");
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style></style>
