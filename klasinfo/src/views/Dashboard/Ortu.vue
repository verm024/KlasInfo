<template>
  <v-container>
    <div class="ortu container mt-12 mb-16">
      <div class="d-flex align-center justify-space-between">
        <div class="page-title">
          Dashboard
        </div>
        <div class="d-flex align-center">
          <v-select
            @change="handleChangeAnak"
            style="width: 300px"
            return-object
            :items="daftar_anak"
            v-model="current_anak"
            item-text="nama"
            outlined
            color="#27496d"
            dense
            hide-details="auto"
          >
          </v-select>
          <v-btn
            height="40px"
            class="white--text ml-5"
            color="#27496d"
            @click.stop="dialog = true"
            >Gabung Kelas</v-btn
          >
        </div>
      </div>
      <div class="text-center">
        <div
          class="mt-10 d-inline-block"
          v-for="(item, index) in daftar_kelas"
          :key="index"
        >
          <v-card
            class="mr-10 ml-10 text-left"
            @click="$router.push(`/ortu/class/${item.kelas.id}`)"
            width="300px"
            rounded="l"
          >
            <v-img :src="item.kelas.foto" height="180px"
              ><v-overlay absolute opacity="0.2"></v-overlay
            ></v-img>

            <v-card-title>
              {{ item.kelas.nama }}
            </v-card-title>

            <v-card-subtitle> Kode Kelas: {{ item.kelas.id }} </v-card-subtitle>
          </v-card>
        </div>
      </div>
    </div>
    <v-dialog v-model="dialog" max-width="290">
      <v-card class="mx-auto">
        <v-card-text class="py-10 px-10">
          <div class="title text-center mb-5">Gabung Kelas</div>
          <v-text-field
            v-model="code"
            label="Kode Kelas"
            dense
            outlined
          ></v-text-field>

          <div class="button text-center">
            <v-btn
              elevation="0"
              class="mb-5 white--text"
              color="#0F4C75"
              @click="joinClass"
            >
              Gabung
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import firebase from "@/firebase";
import store from "@/store";
import { mapState } from "vuex";
import { Anak } from "@/classes";

export default {
  data() {
    return {
      code: "",
      daftar_kelas: [],
      daftar_anak: [],
      current_anak: "",
      dialog: false
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
    },
    get_daftar_anak: {
      immediate: true,
      handler() {
        this.$bind(
          "daftar_anak",
          firebase.db
            .collection("users")
            .doc(this.currentUser.getUid())
            .collection("anak")
        ).then(() => {
          this.current_anak = this.currentAnak.getAnak();
          this.daftar_anak.push({ nama: "Tambah Anak" });
        });
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
    },
    async handleChangeAnak(val) {
      if (val.nama == "Tambah Anak") {
        this.$router.push("/create-child");
      } else {
        let t = JSON.parse(JSON.stringify(val));
        t.id = val.id;
        this.$store.commit("setCurrentAnak", new Anak(t));
        this.$unbind("daftar_kelas");
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
  }
};
</script>

<style scoped>
#input-kelas {
  margin-top: 100;
  margin-right: 100;
}
</style>
