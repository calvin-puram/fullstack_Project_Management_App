<template>
  <div class="project">
    <h1 class="subtitle grey--text text-center mt-4" v-if="user !== null">
      {{ user.name.split(' ')[0] }}'s Projects
    </h1>
    <v-container class="my-2">
      <div
        v-if="userProject.length === 0 && !isProjectLoading"
        class="text-center mt-5"
      >
        <h3 class="grey--text">No Projects Yet</h3>
      </div>
      <v-expansion-panels hover>
        <v-expansion-panel
          v-for="person in userProject"
          :key="person.title"
          class="my-4"
        >
          <v-expansion-panel-header class="font-weight-bold px-3">{{
            person.title
          }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="mb-3 font-weight-bold">
              Due On: {{ new Date(person.due).toDateString() }}
            </div>
            <div>{{ person.description }}</div>
          </v-expansion-panel-content>
          <v-btn text color="indigo" @click="deleteProject(person._id)"
            >Delete Project</v-btn
          >
        </v-expansion-panel>
      </v-expansion-panels>
      <div v-if="isProjectLoading" class="spinner">
        <v-img src="/img/spinner.gif" alt="loader" width="400px"> </v-img>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: mapGetters([
    'userProject',
    'user',
    'isLoading',
    'isProjectLoading'
  ]),
  methods: {
    ...mapActions(['myProjects', 'myProfile', 'deleteProjects']),
    deleteProject(id) {
      this.deleteProjects(id);
      this.$router.push('/');
      this.$noty.success('Project deleted successfully!');
    }
  },
  created() {
    this.myProjects();
    this.myProfile();
  }
};
</script>
