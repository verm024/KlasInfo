import firebase from "@/firebase";

// OOP Implementation

export class User {
  constructor(user) {
    this.user = user;
    this.userProfile = null;
  }

  getUid() {
    return this.user.uid;
  }

  getUserProfile() {
    return this.userProfile;
  }

  setUserProfile(data) {
    this.userProfile = data;
  }
}

export class Anak {
  constructor(anak) {
    this.anak = anak;
  }

  getId() {
    return this.anak.id;
  }

  getAnak() {
    return this.anak;
  }

  setAnak(anak) {
    this.anak = anak;
  }
}
