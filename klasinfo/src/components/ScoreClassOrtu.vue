<template>
  <div>
    Ini skor gan  
  </div>  
</template>

<script>
import firebase from "@/firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      daftar_nilai: []
    }
  },
  computed: {
    ...mapState(["currentUser", "currentAnak"])
  },
  async created() {
    
  },
  watch: {
    get_daftar_nilai: {
      immediate: true,
      handler () {
        
        this.$bind("daftar_nilai", firebase.db
            .collection("join")
            .where(
              "kelas",
              "==",
              firebase.db.collection("kelas").doc(this.code)
            )
            .where(
              "anak",
              "==",
              firebase.db
                .collection("users")
                .doc(this.currentUser.uid)
                .collection("anak")
                .doc(this.currentAnak.id)
            ).then(() => {
              if (this.daftar_nilai.length > 0) {

              }
            }))
      }
    }
  }
}
</script>

<style>

</style>