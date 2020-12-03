<template>
  <div class="home">
    <img class="topImage" alt="KlasInfo" src="../assets/klasinfoArt1.png" />
    <div class="titleDiv">
      <div class="upperTitle">
        <div class="judul">
          <span class="blueBoldTitle">Solusi mudah</span> bagi Anda para orang
          tua. Tak ada lagi <span class="blueTitle">informasi kelas</span> yang
          terlewat.
        </div>
        <div class="judul2">
          Pengawasan kegiatan putra putri Anda di sekolah.
        </div>
      </div>
      <div class="lowerTitle">
        <div class="judulbawah">
          Daftarkan diri Anda dan putra putri Anda sekarang
        </div>
        <router-link to="/login">
          <v-btn large class="mt-5 white--text" color="#0EBEE4">
            MASUK
          </v-btn>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped>
.home {
  margin-top: -50px;
}
.titleDiv {
  float: left;
  margin: 60px 0 0 80px;
  max-width: 500px;
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
  color: #0ebee4;
  font-weight: bold;
}
.blueTitle {
  color: #0ebee4;
}
.lowerTitle {
  margin-top: 150px;
}
.judulbawah {
  font-size: 40px;
  color: #999999;
  line-height: 50px;
}
.topImage {
  float: right;
  max-width: 60%;
  height: auto;
}
</style>
