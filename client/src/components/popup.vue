<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="600px">
      <template v-slot:activator="{ on }">
        <v-btn class="indigo white--text mb-3" v-on="on">
          <v-icon class="white--text">mdi-grease-pencil</v-icon>
          <span>Add New Project</span>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Add a New Project</v-card-title>
        <v-card-text>
          <v-form class="px-3" ref="form">
            <v-text-field
              label="project title"
              v-model="title"
              :rules="nameRules"
              required
              prepend-inner-icon="mdi-folder"
            ></v-text-field>

            <v-text-field
              label="project description"
              v-model="description"
              :rules="descRules"
              prepend-inner-icon="mdi-grease-pencil"
              required
            >
            </v-text-field>

            <v-menu>
              <template v-slot:activator="{ on }">
                <v-text-field
                  label="Due Date"
                  persistent-hint
                  prepend-inner-icon="mdi-calendar-blank"
                  v-on="on"
                  :rules="dateRules"
                  class="mb-3"
                  :value="date"
                  required
                ></v-text-field>
              </template>
              <v-date-picker v-model="date"></v-date-picker>
            </v-menu>

            <div @click="dialog=false">
              <v-btn class="indigo white--text" @click="handleSubmit">
                Add Project
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import router from '../router/index';

export default {
  computed: mapGetters(['user']),
  data() {
    return {
      title: '',
      description: '',
      dialog: false,
      date: null,
      nameRules: [
        v => !!v || 'Project Title is Required',
        v =>
          (v && v.length >= 3) || 'Project Title must be more than 3 characters'
      ],
      descRules: [
        v => !!v || 'Project Description is Required',
        v =>
          (v && v.length >= 3) ||
          'Project Description must be more than 3 characters'
      ],
      dateRules: [v => !!v || 'Date is Required']
    };
  },
  methods: {
    ...mapActions(['createProjects', 'myProfile']),
    handleSubmit() {
      if (this.$refs.form.validate()) {
        const project = {
          title: this.title,
          description: this.description,
          remark: 'Ongoing',
          due: this.date
        };
        this.createProjects(project);
        // router.push('/projects');
        this.$noty.success('Project added successfully!');
      }
      this.dialog = true;
    }
  },
  created() {
    this.myProfile();
  }
};
</script>
