<template>
  <v-container>
    <v-row>
      <v-col cols="md-6 mx-auto mt-4">
        <h3 class="subtitle grey--text text-center my-2">
          Create an Account
        </h3>
        <v-form ref="form">
          <v-text-field
            label="name"
            v-model="name"
            required
            :rules="nameRules"
          ></v-text-field>
          <v-text-field
            label="role"
            v-model="role"
            hint="e.g Software Developer, Graphic Designer"
            :rules="nameRules"
            required
          ></v-text-field>
          <v-text-field
            label="experience"
            v-model="experience"
            hint="only expert, newbie, or intermediate"
            :rules="nameRules"
          ></v-text-field>
          <v-text-field
            label="email"
            v-model="email"
            :rules="emailRules"
          ></v-text-field>
          <v-text-field
            label="password"
            v-model="password"
            :rules="passwordRules"
          ></v-text-field>
          <v-text-field
            label="confirm password"
            v-model="confirmPassword"
            :rules="passwordRules"
          ></v-text-field>
          <v-textarea
            label="bio"
            required
            :rules="nameRules"
            v-model="bio"
          ></v-textarea>
          <div class="d-flex justify-space-between align-center">
            <v-btn class="indigo white--text mt-3" @click="handleRegister">
              <i class="fas fa-spin fa-spinner" v-if="isLoading"></i>
              {{ isLoading ? '' : 'Register' }}
            </v-btn>

            <v-btn text color="indigo" router to="/login"
              >Already have an account?</v-btn
            >
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  computed: mapGetters(['isLoading']),
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      role: '',
      bio: '',
      experience: '',

      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'password is required',
        v => v.length >= 8 || 'password length must be greater or equal to 8'
      ],
      nameRules: [v => !!v || 'password is required']
    };
  },
  methods: {
    ...mapActions(['register']),
    handleRegister() {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          email: this.email,
          role: this.role,
          bio: this.bio,
          experience: this.experience,
          password: this.password,
          confirmPassword: this.confirmPassword
        };
        this.register(user).then(res => {
          if (res && res.data.success) {
            this.$router.push('/');
            this.$noty.success('Your registered successfully!');
          } else {
            this.$noty.error('invalid credentials!');
          }
        });
      }
    }
  }
};
</script>
