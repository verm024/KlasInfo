<template>
  <div class="home container">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-img
            contain
            max-width="800"
            alt="BaliStay"
            src="../assets/klasinfoArt1.png"
          />
        </v-col>
        <v-col class="d-flex align-center" cols="12" md="6">
          <div>
            <div class="upperTitle">
              <div class="judul" cols="12" sm="4">
                <span class="blueBoldTitle">Klasinfo</span>
              </div>
              <div class="judul2">
                Solusi mudah bagi anda para orang tua, tak akan ada lagi
                informasi kelas yang terlewat.
              </div>
            </div>
            <div
              v-if="!(currentUser && currentUser.getUserProfile())"
              class="lowerTitle"
            >
              <router-link to="/register">
                <v-btn large class="mt-5 white--text" color="#3282b8">
                  Daftar Sekarang
                </v-btn>
              </router-link>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapState(["currentUser"])
  }
};
</script>

<style scoped>
.home {
  margin-top: 50px;
  margin-bottom: 50px;
}
.judul {
  line-height: 60px;
  font-size: 50px;
  margin-bottom: 10px;
}
.judul2 {
  color: #999999;
  font-size: 20px;
  margin-bottom: 20px;
}
.blueBoldTitle {
  color: #27496d;
  font-weight: bold;
}
.blueTitle {
  color: #3282b8;
}
.judulbawah {
  font-size: 40px;
  color: #999999;
  line-height: 50px;
}
</style>
