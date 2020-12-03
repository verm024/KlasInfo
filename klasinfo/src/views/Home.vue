<template>
  <div class="home">
    <img class="topImage" alt="KlasInfo" src="../assets/klasinfoArt1.png" />
    <div class="titleDiv">
      <div class="upperTitle">
        <div class="judul">
          
          <span class="blueBoldTitle">Simple, Cheap</span> place to stay. Take
          your time to <span class="blueTitle">explore & hang out</span>
        </div>
        <div class="judul2">we can deliver even the most unusual ideas!</div>
      </div>
      <div class="lowerTitle">
        <div class="judulbawah">Discover best Homestay at Bali, Indonesia</div>
        <router-link to="/search">
          <v-btn large class="mt-5 white--text" color="#0EBEE4">
            Find Homestay
          </v-btn>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
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
  width: 50px;
  height: 50px
}
</style>
