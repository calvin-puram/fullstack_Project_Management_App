<template>
  <v-container>
    <v-row>
      <v-col cols="md-6 mx-auto mt-4">
        <h3 class="subtitle grey--text text-center my-2">
          Login to Your Account
        </h3>
        <v-form ref="form">
          <v-text-field
            label="email"
            v-model="email"
            required
            :rules="emailRules"
            prepend-inner-icon="mdi-email"
          ></v-text-field>
          <v-text-field
            label="password"
            v-model="password"
            :rules="passwordRules"
            prepend-inner-icon="mdi-key"
            required
          ></v-text-field>
          <v-text-field
            label="confirm password"
            v-model="confirmPassword"
            prepend-inner-icon="mdi-key"
            :rules="passwordRules"
          ></v-text-field>
          <div class="d-flex justify-space-between align-center">
            <v-btn class="indigo white--text mt-3" @click="handleLogin">
              <i class="fas fa-spin fa-spinner" v-if="isLoading"></i>
              {{ isLoading ? '' : 'Login' }}
            </v-btn>

            <v-btn text color="indigo" router to="/register"
              >need an account?</v-btn
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
  computed: mapGetters(['isLoggedIn', 'isLoading']),
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'password is required',
        v => v.length >= 8 || 'password length must be greater or equal to 8'
      ]
    };
  },
  methods: {
    ...mapActions(['getLogin']),
    handleLogin() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        };
        this.getLogin(user).then(res => {
          if (res && res.data.success) {
            this.$router.push('/');
            this.$noty.success('You are logged in successfully!');
          } else {
            this.$noty.error('invalid credencials');
          }
        });
      }
    }
  }
};
</script>
