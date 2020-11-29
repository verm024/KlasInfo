<template>
  <div class="ortu">
    Dashboard ortu
    <input type="text" v-model="code" />
    <button @click="joinClass">Join class</button>
  </div>
</template>

<script>
import firebase from "@/firebase";
import store from "@/store";
import { mapState } from "vuex";

export default {
  data() {
    return {
      code: ""
    };
  },
  computed: {
    ...mapState(["currentAnak", "currentUser"])
  },
  methods: {
    async joinClass() {
      try {
        let doc = await firebase.db
          .collection("kelas")
          .doc(this.code)
          .get();
        console.log(doc);
        if (doc.exists) {
          let infoJoin = {
            anak: firebase.db
              .collection("users")
              .doc(this.currentUser.uid)
              .collection("anak")
              .doc(this.currentAnak.id),
            kelas: firebase.db.collection("kelas").doc(this.code),
            tanggal_join: firebase.timestamp
          };
          await firebase.db.collection("join").add(infoJoin);
        } else {
          alert("Kode kelas tidak ditemukan!");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style></style>
