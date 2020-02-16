<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="600px">
      <template v-slot:activator="{ on }">
        <v-btn class="indigo white--text mb-3" v-on="on">
          <v-icon class="white--text">mdi-grease-pencil</v-icon>
          <span>Upload Profile Image</span>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Upload An Image</v-card-title>
        <v-card-text>
          <form @submit.prevent="uploadFile" encType="multipart/form-data">
            
            <div class="form-group">
              <input
                type="file"
                class="form-control-file"
                @change="OnfileChange"
              />
            </div>

            <div @click="dialog = false">
              <button class="btn btn-primary btn-block">
                Upload Image
              </button>
            </div>
          </form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import router from '../router/index';

export default {
  name: 'Uploads',
  computed: mapGetters(['getProfilePic', 'geterror']),
  data() {
    return {
      dialog: false,
      file: ''
    };
  },
  methods: {
    ...mapActions(['uploadedimage']),
    OnfileChange(e) {
      this.file = e.target.files[0];
    },
    uploadFile() {
      let formData = new FormData();
      formData.append('file', this.file);
      this.uploadedimage(formData).then(res => {
        if (res && res.data.success) {
          router.push('/');
          this.$noty.success('profile image uploaded successfully!');
        } else {
          this.$noty.error(this.geterror);
        }
      });
    }
  }
};
</script>
