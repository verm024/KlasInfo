import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Guru from "../views/Dashboard/Guru";
import CreateClass from "../views/CreateClass";
import DetailClass from "../views/DetailClass";
import Ortu from "../views/Dashboard/Ortu";
import CreateChild from "../views/CreateChild";
import Login from "../views/Auth/Login";
import Register from "../views/Auth/Register";
import firebase from "../firebase";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "BaliStay"
    }
  },
  {
    path: "/guru",
    name: "Dashboard Guru",
    component: Guru,
    meta: {
      requiresLogin: true,
      allowedRole: "guru",
      title: "Dashboard"
    }
  },
  {
    path: "/create-class",
    name: "Create Class",
    component: CreateClass,
    meta: {
      requiresLogin: true,
      allowedRole: "guru",
      title: "Create New Class"
    }
  },
  {
    path: "/class/:id",
    name: "Detail Class",
    component: DetailClass,
    meta: {
      requiresLogin: true,
      allowedRole: "guru",
      title: "Detail Class"
    }
  },
  {
    path: "/ortu",
    name: "Dashboard Ortu",
    component: Ortu,
    meta: {
      requiresLogin: true,
      allowedRole: "ortu",
      title: "Dashboard"
    }
  },
  {
    path: "/create-child",
    name: "Create Child",
    component: CreateChild,
    meta: {
      requiresLogin: true,
      allowedRole: "ortu",
      title: "Create New Child"
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login"
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register"
    }
  },
  {
    path: "*",
    name: "Unavailable"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  let currentUser = firebase.auth.currentUser;
  let requiresLogin = to.matched.some(x => x.meta.requiresLogin);
  if (to.name == "Unavailable") {
    if (currentUser) {
      next("/" + store.state.userProfile.role);
    } else {
      next("/");
    }
  } else {
    if (currentUser) {
      if (requiresLogin) {
        if (to.meta.allowedRole.includes(store.state.userProfile.role)) {
          if (
            store.state.userProfile.role == "ortu" &&
            to.name != "Create Child"
          ) {
            try {
              let doc = await firebase.db
                .collection("users")
                .doc(store.state.currentUser.uid)
                .collection("anak")
                .orderBy("tanggal_dibuat")
                .get();
              if (doc.empty) {
                next("/create-child");
              } else {
                next();
              }
            } catch (error) {
              console.error(error);
              next("/" + store.state.userProfile.role);
            }
          } else {
            next();
          }
        } else {
          next("/" + store.state.userProfile.role); //To user dashboard
        }
      } else {
        if (to.name == "Register" || to.name == "Login") {
          next("/" + store.state.userProfile.role); //To user dashboard
        } else {
          next();
        }
      }
    } else {
      if (requiresLogin) {
        next("/login");
      } else {
        next();
      }
    }
  }
});

export default router;
