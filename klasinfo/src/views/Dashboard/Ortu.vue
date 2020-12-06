<template>
  <v-container>
    <div class="ortu">
      <div>
        <h1>Dashboard ortu</h1>
      </div>
      <v-row>
        <v-col cols="auto">
          <v-sheet>
            <v-form class="mt-20" ref="form" lazy-validation>
              <v-text-field
                style="min-width: 170px max-width: 300px"
                v-model="code"
                label="Kode Kelas"
                type="text"
                outlined
              ></v-text-field>
              <v-btn
                class="white--text block"
                color="#27496d"
                @click="joinClass"
              >
                Join class
              </v-btn>
            </v-form>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet>
            <!-- <div style="max-width: fit-content"> -->
            <div
              class="d-inline-block"
              v-for="(item, index) in daftar_kelas"
              :key="index"
            >
              <v-card
                class="mr-10 mb-10"
                @click="$router.push(`/ortu/class/${item.kelas.id}`)"
                max-width="300px"
              >
                <v-img :src="item.kelas.foto" height="200px"></v-img>

                <v-card-title>
                  {{ item.kelas.nama }}
                </v-card-title>

                <v-card-subtitle>
                  Kode Kelas: {{ item.kelas.id }}
                </v-card-subtitle>
              </v-card>
            </div>
            <!-- </div> -->
          </v-sheet>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import firebase from "@/firebase";
import store from "@/store";
import { mapState } from "vuex";

export default {
  data() {
    return {
      code: "",
      daftar_kelas: []
    };
  },
  computed: {
    ...mapState(["currentAnak", "currentUser"])
  },
  watch: {
    get_daftar_kelas: {
      immediate: true,
      handler() {
        this.$bind(
          "daftar_kelas",
          firebase.db.collection("join").where(
            "anak",
            "==",
            firebase.db
              .collection("users")
              .doc(this.currentUser.getUid())
              .collection("anak")
              .doc(store.state.currentAnak.getId())
          )
        );
      }
    }
  },
  methods: {
    async joinClass() {
      try {
        let doc = await firebase.db
          .collection("kelas")
          .doc(this.code)
          .get();
        if (doc.exists) {
          let doc2 = await firebase.db
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
                .doc(this.currentUser.getUid())
                .collection("anak")
                .doc(this.currentAnak.getId())
            )
            .get();
          if (doc2.docs.length > 0) {
            alert("Anda sudah pernah join kelas tersebut");
          } else {
            let infoJoin = {
              anak: firebase.db
                .collection("users")
                .doc(this.currentUser.getUid())
                .collection("anak")
                .doc(this.currentAnak.getId()),
              kelas: firebase.db.collection("kelas").doc(this.code),
              tanggal_join: firebase.timestamp
            };
            await firebase.db.collection("join").add(infoJoin);
            alert("Berhasil masuk kelas");
            this.$router.push("/ortu/class/" + this.code);
          }
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

<style scoped>
#input-kelas {
  margin-top: 100;
  margin-right: 100;
}
</style>
