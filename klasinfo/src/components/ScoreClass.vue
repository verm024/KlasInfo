<template>
  <div>
    <div class="text-center text-h4 mb-5">
      Nilai Tugas: {{ current_tugas.nama }}
    </div>
    <div class=" text-center d-flex align-center">
      <div>
        Pilih Tugas:
      </div>
      <div class="ml-3">
        <v-select
          style="width: 200px"
          :items="daftar_tugas"
          return-object
          item-text="nama"
          v-model="current_tugas"
          @change="handleChangeTugas"
        ></v-select>
      </div>
    </div>
    <v-data-table
      :headers="headers"
      :items="daftar_nilai"
      :items-per-page="5"
      item-key="index"
      class="elevation-2"
    >
      <template v-slot:item="{ item, index }">
        <tr>
          <td>{{ item.anak.nama }}</td>
          <td>
            <v-text-field
              style="width: 50px"
              type="text"
              v-model="item.nilai"
            />
          </td>
          <td>
            <v-btn class="white--text" color="#3282b8" @click="saveNilai(index)"
              >Simpan</v-btn
            >
          </td>
        </tr>
      </template>

      <template v-slot:no-data>
        Belum ada anggota
      </template>
    </v-data-table>
  </div>
</template>

<script>
import firebase from "@/firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      daftar_member: [],
      daftar_tugas: [],
      daftar_nilai: [],
      current_tugas: ""
    };
  },
  watch: {
    get_daftar_member: {
      immediate: true,
      handler() {
        this.$bind(
          "daftar_member",
          firebase.db
            .collection("join")
            .where(
              "kelas",
              "==",
              firebase.db.collection("kelas").doc(this.$route.params.id)
            )
        ).then(() => {
          this.daftar_member.forEach(async element => {
            try {
              let doc = await firebase.db
                .collection("join")
                .doc(element.id)
                .collection("nilai")
                .doc(this.current_tugas.id)
                .get();
              let dataNilai = "";
              if (doc.exists) {
                let data = doc.data();
                dataNilai = {
                  ...element,
                  id: element.id,
                  nilai: data.nilai
                };
              } else {
                dataNilai = {
                  ...element,
                  id: element.id,
                  nilai: 0
                };
              }
              this.daftar_nilai.push(dataNilai);
            } catch (error) {
              console.error(error);
            }
          });
        });
      }
    },
    get_daftar_tugas: {
      immediate: true,
      handler() {
        this.$bind(
          "daftar_tugas",
          firebase.db
            .collection("kelas")
            .doc(this.$route.params.id)
            .collection("tugas")
            .orderBy("deadline")
        ).then(() => {
          if (this.daftar_tugas.length > 0) {
            this.current_tugas = this.daftar_tugas[0];
          }
        });
      }
    }
  },
  methods: {
    async handleChangeTugas() {
      this.daftar_nilai = [];
      this.daftar_member.forEach(async element => {
        try {
          let doc = await firebase.db
            .collection("join")
            .doc(element.id)
            .collection("nilai")
            .doc(this.current_tugas.id)
            .get();
          let dataNilai = "";
          if (doc.exists) {
            let data = doc.data();
            dataNilai = {
              ...element,
              id: element.id,
              nilai: data.nilai
            };
          } else {
            dataNilai = {
              ...element,
              id: element.id,
              nilai: 0
            };
          }
          this.daftar_nilai.push(dataNilai);
        } catch (error) {
          console.error(error);
        }
      });
    },
    async saveNilai(index) {
      if (this.daftar_nilai[index].nilai == "") {
        this.daftar_nilai[index].nilai = 0;
      }
      let dataNilai = {
        nilai: this.daftar_nilai[index].nilai,
        tugas: firebase.db
          .collection("kelas")
          .doc(this.$route.params.id)
          .collection("tugas")
          .doc(this.current_tugas.id),
        tanggal_nilai: firebase.timestamp
      };
      try {
        await firebase.db
          .collection("join")
          .doc(this.daftar_nilai[index].id)
          .collection("nilai")
          .doc(this.current_tugas.id)
          .set(dataNilai);
        alert("Pembaruan nilai berhasil");
      } catch (error) {
        alert("Gagal memperbarui nilai");
        console.error(error);
      }
    }
  },
  computed: {
    headers() {
      return [
        {
          text: "Nama Anak",
          align: "start",
          sortable: false,
          value: "nama"
        },
        {
          text: "Nilai",
          align: "start",
          sortable: true,
          value: "nilai"
        },
        {
          text: "Opsi",
          align: "start",
          sortable: false,
          value: "simpan"
        }
      ];
    }
  }
};
</script>

<style scoped>
.vuetable th#save {
  width: 20%;
}
</style>
