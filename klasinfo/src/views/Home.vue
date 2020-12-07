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
        <v-col cols="12" md="6">
          <div>
            <div class="upperTitle">
              <div class="judul" cols="12" sm="4">
                <span class="blueBoldTitle">Solusi mudah</span> bagi Anda para
                orang tua. Tak ada lagi
                <span class="blueTitle">informasi kelas</span> yang terlewat.
              </div>
              <div class="judul2">
                Pengawasan kegiatan putra putri Anda di sekolah.
              </div>
            </div>
            <div
              v-if="!(currentUser && currentUser.getUserProfile())"
              class="lowerTitle"
            >
              <div class="judulbawah">
                Daftarkan diri Anda dan putra putri Anda sekarang
              </div>
              <router-link to="/login">
                <v-btn large class="mt-5 white--text" color="#27496d">
                  MASUK
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
  margin: 50px 50px;
}
.judul {
  line-height: 60px;
  font-size: 50px;
}
.judul2 {
  color: #999999;
  font-size: 20px;
}
.blueBoldTitle {
  color: #3282b8;
  font-weight: bold;
}
.blueTitle {
  color: #3282b8;
}
.lowerTitle {
  margin-top: 100px;
}
.judulbawah {
  font-size: 40px;
  color: #999999;
  line-height: 50px;
}
</style>
