<template>
  <v-card color="basil">
    <div class="detail-class">
      Detail tentang kelas, seperti apa aja yg bisa dilakukan di kelas itu (buat
      guru)
      <br />
      Nama kelas: {{ data_kelas.nama }}
    </div>

    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab>Pengaturan Kelas </v-tab>
      <v-tab>Anggota Kelas </v-tab>
      <v-tab>Tugas </v-tab>
      <v-tab>Nilai </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <SettingClass :data_kelas="data_kelas" />
      </v-tab-item>

      <v-tab-item>
        <MemberClass />
      </v-tab-item>
      <v-tab-item>
        <AssignmentClass />
      </v-tab-item>
      <v-tab-item>
        <ScoreClass />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import firebase from "@/firebase";
import store from "@/store";
import { mapState } from "vuex";
import SettingClass from "@/components/SettingClass";
import MemberClass from "@/components/MemberClass";
import AssignmentClass from "@/components/AssignmentClass";
import ScoreClass from "@/components/ScoreClass";

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
    SettingClass,
    MemberClass,
    AssignmentClass,
    ScoreClass
  },
  async beforeRouteEnter(to, from, next) {
    let doc = await firebase.db
      .collection("kelas")
      .doc(to.params.id)
      .get();
    if (doc.exists) {
      let data = doc.data();
      if (data.guru.id == store.state.currentUser.uid) {
        next();
      } else {
        next("/guru");
      }
    } else {
      next("/guru");
    }
  }
};
</script>

<style></style>
