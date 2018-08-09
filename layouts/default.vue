<template>
  <div>
    <nav class="navbar header has-shadow is-success" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="~assets/logo.png" alt="logo" height="28">
        </a>
        <div class="navbar-burger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      
      <div class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item">
            NUXT GEO DEMO
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <a @click="toSignUp" v-if="!islogin">Sign Up</a>
          </div>
          <div class="navbar-item has-dropdown is-hoverable" v-if="islogin">
            <a class="navbar-link">Welcome {{ user.email }}</a>
            <div class="navbar-dropdown">
              <a @click="logout" class="navbar-item">Logout</a>
            </div>
          </div>

          <div class="navbar-item" v-if="!islogin">
            <a @click="toLogIn">LogIn</a>
          </div>
        </div>
      </div>
      
    </nav>
    <section class="main-content columns">
      <!-- Side bar Navigation -->
      <aside class="column is-2 section">
        <p class="menu-label is-hidden-touch">navigation</p>
        <ul class="menu-list">
          <li v-for="(item, key) of items" :key="key">
            <nuxt-link :to="item.to">
              {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
      </aside>


      <!-- main view -->
      <div class="container column is-10">
        <nuxt />
      </div>
      
    </section>

    <div class="spacer"></div>
    <!-- footer -->
    <footer class="footer has-background-dark">
      <div class="content has-text-centered has-text-light">
        <p>
          Geo Chat App built by Emrick, powered by nuxt.js & buefy
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      items: [
        { title: "Home", icon: "home", to: { name: "index" } },
        { title: "About", icon: "lightbulb", to: { name: "about" } }
      ],
      user: null
    };
  },
  computed: {
    islogin() {
      return this.$store.state.islogin;
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.$store.commit("loggedin");
      } else {
        this.user = null;
        this.$store.commit("loggedout");
      }
    });
  },
  methods: {
    async logout() {
      await firebase.auth().signOut();
      this.$store.commit("toLogIn");
      this.$router.push({ name: "inspire" });
    },
    toSignUp() {
      this.$store.commit("toSignUp");
      this.$router.push({ name: "inspire" });
    },
    toLogIn() {
      this.$store.commit("toLogIn");
      this.$router.push({ name: "inspire" });
    }
  }
};
</script>

<style>
.spacer {
  min-height: 65vh;
}
</style>
