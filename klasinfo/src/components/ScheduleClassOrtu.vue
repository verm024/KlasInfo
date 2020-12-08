<template>
  <div>
    <v-container>
      <h3 class="mb-5">Jadwal Kelas</h3>
      <v-data-table
        :headers="headers"
        :items="jadwal"
        hide-default-footer
        item-key="index"
        class="elevation-2"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>
              {{ item.hari }}
            </td>
            <td>
              {{ item.jam_mulai }}
            </td>
            <td>
              {{ item.jam_selesai }}
            </td>
          </tr>
        </template>
        <template v-slot:no-data>
          Belum ada jadwal
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["jadwal"],
  data() {
    return {};
  },
  computed: {
    headers() {
      return [
        {
          text: "Hari",
          align: "start",
          sortable: false,
          value: "hari"
        },
        {
          text: "Jam Mulai",
          sortable: false,
          value: "jam_mulai"
        },
        {
          text: "Jam Selesai",
          sortable: false,
          value: "jam_selesai"
        }
      ];
    }
  }
};
</script>

<style></style>
5
