<template>
  <div class="container mt-12 mb-16">
    <div>
      <div class="page-title">
        {{ data_kelas.nama }}
      </div>
      <div class="text-h7">{{ currentAnak.getAnak().nama }}</div>
    </div>
    <div class="mt-10">
      <v-card color="basil">
        <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
          <v-tab>Jadwal </v-tab>
          <v-tab>Tugas </v-tab>
          <v-tab>Nilai </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item class="pa-10">
            <ScheduleClassOrtu :jadwal="data_kelas.jadwal" />
          </v-tab-item>
          <v-tab-item class="pa-10">
            <AssignmentClassOrtu />
          </v-tab-item>
          <v-tab-item class="pa-10">
            <ScoreClassOrtu />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase";
import store from "@/store";
import { mapState } from "vuex";

import AssignmentClassOrtu from "../components/AssignmentClassOrtu";
import ScoreClassOrtu from "../components/ScoreClassOrtu";
import ScheduleClassOrtu from "../components/ScheduleClassOrtu";

export default {
  data() {
    return {
      data_kelas: [],
      tab: null
    };
  },
  watch: {
    get_data_kelas: {
      immediate: true,
      handler() {
        this.$bind(
          "data_kelas",
          firebase.db.collection("kelas").doc(this.$route.params.id)
        );
      }
    }
  },
  components: {
    AssignmentClassOrtu,
    ScoreClassOrtu,
    ScheduleClassOrtu
  },
  computed: {
    ...mapState(["currentUser", "currentAnak"])
  },
  async beforeRouteEnter(to, from, next) {
    let doc = await firebase.db
      .collection("kelas")
      .doc(to.params.id)
      .get();
    if (doc.exists) {
      let doc2 = await firebase.db
        .collection("join")
        .where("kelas", "==", firebase.db.collection("kelas").doc(to.params.id))
        .where(
          "anak",
          "==",
          firebase.db
            .collection("users")
            .doc(store.state.currentUser.getUid())
            .collection("anak")
            .doc(store.state.currentAnak.getId())
        )
        .get();
      if (doc2.docs.length > 0) {
        next();
      } else {
        next("/ortu");
      }
    } else {
      next("/ortu");
    }
  }
};
</script>

<style></style>
