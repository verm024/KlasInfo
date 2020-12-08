<template>
  <div class="container mt-5 mb-10">
    <div>
      <div class="page-title">
        {{ data_kelas.nama }}
      </div>
      <div class="text-h7">Kode kelas: {{ data_kelas.id }}</div>
    </div>
    <div class="mt-10">
      <v-card color="basil">
        <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
          <v-tab>Pengaturan Kelas </v-tab>
          <v-tab>Anggota Kelas </v-tab>
          <v-tab>Pengumuman </v-tab>
          <v-tab>Tugas </v-tab>
          <v-tab>Nilai </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item class="pa-10">
            <SettingClass :data_kelas="data_kelas" />
          </v-tab-item>
          <v-tab-item class="pa-10">
            <MemberClass />
          </v-tab-item>
          <v-tab-item class="pa-10">
            <AnnouncementClass />
          </v-tab-item>
          <v-tab-item class="pa-10">
            <AssignmentClass />
          </v-tab-item>
          <v-tab-item class="pa-10">
            <ScoreClass />
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
import SettingClass from "@/components/SettingClass";
import MemberClass from "@/components/MemberClass";
import AssignmentClass from "@/components/AssignmentClass";
import AnnouncementClass from "@/components/AnnouncementClass";
import ScoreClass from "@/components/ScoreClass";

export default {
  data() {
    return {
      data_kelas: [],
      tab: null,
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
      },
    },
  },
  components: {
    SettingClass,
    MemberClass,
    AnnouncementClass,
    AssignmentClass,
    ScoreClass,
  },
  async beforeRouteEnter(to, from, next) {
    let doc = await firebase.db
      .collection("kelas")
      .doc(to.params.id)
      .get();
    if (doc.exists) {
      let data = doc.data();
      if (data.guru.id == store.state.currentUser.getUid()) {
        next();
      } else {
        next("/guru");
      }
    } else {
      next("/guru");
    }
  },
};
</script>

<style></style>
