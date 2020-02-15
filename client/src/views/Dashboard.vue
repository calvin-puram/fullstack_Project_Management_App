<template>
  <div class="home">
    <h1 class="subtitle grey--text text-center mt-4 ">Project Dashboard</h1>
    <v-container class="  my-2">
      <v-row>
        <v-col cols="md-9 xs-12">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                text
                small
                color="grey"
                class="mb-3"
                @click="sortby('title')"
                v-on="on"
              >
                <v-icon small left>mdi-folder</v-icon>
                <span class="caption font-weight-bold grey--text"
                  >Order By Title</span
                >
              </v-btn>
            </template>
            <span>Sort Project By Title</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                text
                small
                color="grey"
                class="ml-md-5 mb-3"
                @click="sortby('due')"
                v-on="on"
              >
                <v-icon small left>mdi-heart</v-icon>
                <span class="caption font-weight-bold grey--text"
                  >Order By Due Date</span
                >
              </v-btn>
            </template>
            <span>Sort Projects By Due Date</span>
          </v-tooltip>
        </v-col>
        <v-col cols="md-3 xs-12">
          <popup />
        </v-col>
      </v-row>
      <div >
        <v-card
          :class="`pa-4 my-3 project ${item.remark}`"
          v-for="item in getProjects"
          :key="item.title"
        >
          <v-row wrap>
            <v-col cols="md-6 xs-12">
              <div class="caption grey--text">Project Title</div>
              <div>{{ item.title }}</div>
            </v-col>

            <v-col cols="md-2 sm-4 xs-6">
              <div class="grey--text caption">Person</div>
              <div>{{ item.user.name }}</div>
            </v-col>

            <v-col cols="md-2 sm-4 xs-6">
              <div class="caption grey--text">Due By</div>
              <div>{{ new Date(item.due).toDateString() }}</div>
            </v-col>

            <v-col cols="md-2 sm-4 xs-6">
              <div class="right">
                <v-chip :class="`ma-3 white--text ${item.remark}`">
                  {{ item.remark }}
                  <span v-if="item.remark === 'complete'">
                    <v-icon class="white--text" right
                      >mdi-checkbox-marked-circle</v-icon
                    >
                  </span>
                  <span v-else-if="item.remark === 'Ongoing'">
                    <v-icon class="white--text" right>mdi-star</v-icon>
                  </span>
                  <span v-else>
                    <v-icon class="white--text" right>mdi-close-circle</v-icon>
                  </span>
                </v-chip>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </div>
      <div v-if="isProjectLoading" class="spinner">
         <v-img src="/img/spinner.gif" alt="loader" width='400px' >
           
         </v-img>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import popup from '../components/popup';

export default {
  components: {
    popup
  },
  computed: mapGetters(['getProjects', 'user', 'isProjectLoading']),
  methods: {
    ...mapActions(['projects', 'myProfile']),
    sortby(prop) {
      this.getProjects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    }
  },
  created() {
    this.projects();
    this.myProfile();
  }
};
</script>

<style>
.project.complete {
  border-left: 4px solid green;
}
.project.Ongoing {
  border-left: 4px solid rgb(45, 34, 94);
}
.project.Over-due {
  border-left: 4px solid red;
}
.theme--light.v-chip:not(.v-chip--active).complete {
  background: green;
}
.theme--light.v-chip:not(.v-chip--active).Ongoing {
  background: rgb(45, 34, 94);
}
.theme--light.v-chip:not(.v-chip--active).Over-due {
  background-color: red;
}

.spinner{
  width: 40%;
  margin: auto;
}
</style>
