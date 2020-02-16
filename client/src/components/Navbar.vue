<template>
  <nav>
    <v-app-bar flat app>
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        v-if="isLoggedIn"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase text--grey">
        <v-img
          class="d-none d-sm-block"
          src="/img/project_logo.png"
          width="220px"
          height="40px"
          alt="logo"
        ></v-img>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <div class="text-center">
        <v-menu open-on-hover bottom offset-y flat v-if="isLoggedIn">
          <template v-slot:activator="{ on }">
            <v-btn text class="mr-3" color="indigo" v-on="on">
              <v-icon color="indigo" left>mdi-menu-down</v-icon>
              <span>Menu</span>
            </v-btn>
          </template>
          <v-list class="py-0">
            <v-list-item
              v-for="links in items"
              :key="links.text"
              router
              :to="links.route"
              exact
              dense
              flat
            >
              <v-list-item-title>{{ links.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-btn
        text
        color="indigo"
        class="mr-3"
        router
        to="/register"
        v-if="!isLoggedIn"
      >
        <span>Register</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>

      <v-btn text color="indigo" router to="/login" v-if="!isLoggedIn">
        <span>Login</span>
        <v-icon right>mdi-account</v-icon>
      </v-btn>

      <v-btn text color="indigo" @click="handleLogout" v-if="isLoggedIn">
        Logout
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app color="primary" v-model="drawer" v-if="isLoggedIn">
      <div class="d-flex flex-column align-center mt-5">
        <v-avatar>
          <img :src="`uploads/${user.image}`" alt="profile" />
        </v-avatar>
        <p class="subheading white--text mt-1">{{ user.name }}</p>
        
      </div>
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.text"
          router
          exact
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              item.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
  computed: mapGetters(['isLoggedIn', 'user']),
  data() {
    return {
      ...mapActions(['logout', 'myProfile']),
      drawer: false,
      items: [
        { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/' },
        { icon: 'mdi-folder', text: 'My-Projects', route: '/projects' },
        { icon: 'mdi-book', text: 'Team', route: '/team' },
        { icon: 'mdi-account', text: 'Profile', route: '/profile' }
      ]
    };
  },
  methods: {
    handleLogout() {
      this.logout().then(() => {
        this.$router.push('/login');
        this.$noty.success('You are logged out successfully!');
      });
    }
  },
  created() {
    this.myProfile();
  }
};
</script>


