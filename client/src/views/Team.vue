<template>
  <v-container class="mt-5 ">
    <v-row>
      <v-col cols="md-3 lg-4 sm-12" v-for="person in team" :key="person.name">
        <v-card class="text-center pa-4">
          <v-avatar size="100" tile class="my-5">
            <img src="/img/default.jpg" max-width="60px" />
          </v-avatar>

          <p class="mt-4 font-weight-bold">{{ person.name }}</p>
          <p class="caption">{{ person.role }}</p>

          <v-card-actions>
            <v-btn color="primary white--text">
              <v-icon left>mdi-message</v-icon>
              <span>Message Me</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div v-if="isLoading" class="spinner">
      <v-img src="/img/spinner.gif" alt="loader" width="400px"> </v-img>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  computed: mapGetters(['team', 'isLoading']),
  methods: {
    ...mapActions(['allUsers', 'myProfile'])
  },
  created() {
    this.allUsers();
    this.myProfile();
  }
};
</script>

<style scoped>
img {
  width: 100%;
}
</style>
