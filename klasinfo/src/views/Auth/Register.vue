<template>
  <div class="container">
    <v-card class="mx-auto px-10 py-5 my-12" max-width="500" min-height="400">
      <v-card-text>
        <div class="title text-center mb-5">REGISTER</div>
        <v-form class="ma-40" ref="form" lazy-validation>
          <v-text-field
            v-model="form_register.email"
            label="E-mail"
            outlined
          ></v-text-field>

          <v-text-field
            v-model="form_register.password"
            label="Password"
            type="password"
            outlined
          ></v-text-field>

          <v-text-field
            v-model="form_register.nama"
            label="Nama Lengkap"
            type="text"
            outlined
          ></v-text-field>

          <v-text-field
            v-model="form_register.notelp"
            label="Nomor Telepon"
            type="text"
            outlined
          ></v-text-field>

          <v-select
            v-model="form_register.role"
            :items="items"
            item-text="text"
            item-value="value"
            label="Role"
            persistent-hint
            single-line
            outlined
          ></v-select>

          <div class="button text-center">
            <v-btn
              elevation="0"
              class="mb-5 white--text"
              color="#0F4C75"
              @click="register"
            >
              REGISTER
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import firebase from "../../firebase";
import { User } from "../../classes";
import validator from "validator";

export default {
  data() {
    return {
      form_register: {
        email: "",
        password: "",
        nama: "",
        notelp: "",
        role: "ortu"
      },
      items: [
        {
          text: "Orang Tua",
          value: "ortu"
        },
        {
          text: "Guru",
          value: "guru"
        }
      ]
    };
  },
  methods: {
    async register() {
      let registerData;
      if (
        validator.isEmail(this.form_register.email) &&
        this.form_register.password.length >= 6 &&
        this.form_register.password.length <= 20
      ) {
        if (this.form_register.nama == "" || this.form_register.notelp == "") {
          alert("Form Nama dan Nomor Telepon tidak boleh kosong!");
        } else {
          if (this.form_register.role == "guru") {
            registerData = {
              email: this.form_register.email,
              nama: this.form_register.nama,
              notelp: this.form_register.notelp,
              role: this.form_register.role
            };
          } else if (this.form_register.role == "ortu") {
            registerData = {
              email: this.form_register.email,
              nama: this.form_register.nama,
              notelp: this.form_register.notelp,
              role: this.form_register.role
            };
          }
          let user;
          try {
            user = await firebase.auth.createUserWithEmailAndPassword(
              this.form_register.email,
              this.form_register.password
            );
          } catch (error) {
            console.error(error);
            if (error.code.includes("email-already-in-use")) {
              alert("Email sudah pernah dipakai");
            }
            return;
          }
          user = user.user;
          try {
            await firebase.db
              .collection("users")
              .doc(user.uid)
              .set(registerData);
          } catch (error) {
            console.error(error);
          }
          this.$store.commit("setCurrentUser", new User(user));
          await this.$store.dispatch("fetchUserProfile");
          await this.$store.dispatch("fetchCurrentAnak");
          this.$router.push("/" + this.form_register.role);
        }
      } else {
        alert(
          "Format email harus sesuai dengan yang telah ditentukan dan panjang password harus antara 6 hingga 20 karakter"
        );
      }
    }
  }
};
</script>

<style></style>
