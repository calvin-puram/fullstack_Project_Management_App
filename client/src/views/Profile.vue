<template>
  <v-card max-width="344" class="mx-auto mt-5">
    <v-list-item>
      <v-list-item-avatar color="grey">
        <img src="/img/default.jpg" alt="profile" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{ user.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ user.role }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
      height="194"
    ></v-img>

    <v-card-text> Bio: {{ user.bio }} </v-card-text>

    <template>
      <h5 class="grey--text text-center">Upload profile image</h5>
      <v-file-input label="File input" prepend-icon="mdi-camera"></v-file-input>
    </template>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: mapGetters(['user']),
  methods: {
    ...mapActions(['myProfile'])
  },
  created() {
    this.myProfile();
  }
};
</script>
