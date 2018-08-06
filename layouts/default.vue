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
          <div  v-for="(item, idx) in menuItems" :key="idx" class="navbar-item">
            {{item}}
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
            <nuxt-link :to="item.to" exact-active-class="is-active">
              <b-icon :icon="item.icon"/> {{ item.title }}
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
export default {
  data() {
    return {
      items: [
        { title: "Home", icon: "home", to: { name: "index" } },
        { title: "Inspire", icon: "lightbulb", to: { name: "inspire" } }
      ],
      menuItems: ["Sign Up", "LogIn", "About"]
    };
  }
};
</script>

<style>
.spacer {
  min-height: 65vh;
}
</style>
