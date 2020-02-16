<template>
  <v-card max-width="344" class="mx-auto mt-5">
    <v-list-item>
      <v-list-item-avatar color="grey">
        <img :src="`uploads/${user.image}`" alt="profile" />
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

    <Uploads />
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Uploads from '../components/Uploads';

export default {
  components: {
    Uploads
  },
  computed: mapGetters(['user']),
  methods: {
    ...mapActions(['myProfile'])
  },
  created() {
    this.myProfile();
  }
};
</script>
