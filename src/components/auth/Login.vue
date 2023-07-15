<template>
  <div class="row login">
    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 login--container">
      <h2 class="login--title">Login</h2>
      <form id="form" @submit.prevent="login" class="needs-validation" novalidate>
    <div class="mb-3">
      <label for="usernameInput" class="form-label fw-bold"><i class="fas fa-user me-2"></i>Username:</label>
      <input type="text" v-model="username" class="form-control" placeholder="Enter your username" id="usernameInput" required>
      <div class="invalid-feedback">
        Please enter a username.
      </div>
    </div>
    <div class="mb-3">
      <label for="passwordInput" class="form-label fw-bold"><i class="fas fa-lock me-2"></i>Password:</label>
      <input type="password" v-model="password" class="form-control" placeholder="Enter your password" id="passwordInput" required>
      <div class="invalid-feedback">
        Please enter a password.
      </div>
    </div>
    <button type="submit" class="mb-3 login--button">Login</button>
    <label class="login--forget-password" @click="goToForgetPassword">Forgot Password?</label>
    <label for="redirectToSignUpPage" class="login--redirect-signup">Don't have an account? <a href="#" @click="goToSignUp">Sign up</a></label>
  </form>

    </div>
  </div>
</template>

<script>
import AuthService from '@/services/auth.service';
import { ref } from 'vue';
import { notify } from "@kyvg/vue3-notification";
import { setDetailsInLocalStorage } from '@/utils/helper';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const authService = new AuthService();

export default {
  name: 'LoginPage',

  setup() {
    const store = new useStore();
    const router = new useRouter();
    const username = ref('');
    const password = ref('');

    const goToSignUp = () => {
      router.push({ name: 'SignUp' })
    }

    const goToForgetPassword = () => {
      router.push({ name: 'ForgetPassword' })
    }

    const login = async () => {
      const form = document.getElementById('form');
      form.classList.add('was-validated');
      if (form.checkValidity()) {
        try {
          const response = await authService.login({ username: username.value, password: password.value });
          if (response) {
            const userDetails = {
              id: response?.data?.id || NaN,
              username: response?.data?.username || 'NA',
              email: response?.data?.email || 'NA',
              firstName: response?.data?.firstName || 'NA',
              lastName: response?.data?.lastName || 'NA',
              gender: response?.data?.gender || 'NA',
              profileImage: response?.data?.image || 'NA',
            };

            setDetailsInLocalStorage('access-token', response?.data?.token || '');
            store.commit('SET_USER_DETAILS', userDetails);
            notify({
              title: "Authorization",
              text: "Logged in successfully",
              type: 'success'
            });
            router.push({ name: 'Products' });
          }
        } catch (error) {
          notify({
            title: "Authorization",
            text: error.response.data.message,
            type: 'error'
          });
        }
      } else {
        notify({
          title: "Authorization",
          text: "Please enter user details",
          type: 'error'
        });
      }
    }

    return {
      username,
      password,
      login,
      goToSignUp,
      goToForgetPassword,
    }
  }
 }
</script>
<style lang="scss" scoped>
.login {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;

  .login--container {
    border: 1px solid white;
    padding: 50px 30px 75px 30px;
    border-radius: 5px;
    box-shadow: 0px 0px 20px -2px gray;
  }
  .login--title {
    text-align: center;
    background: linear-gradient(to right, rgb(188, 12, 241), rgb(212, 4, 4));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 2.5rem;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }
  .login--button {
    width: 100%;
    border-radius: 5px;
    background: linear-gradient(to right, rgb(188, 12, 241), rgb(212, 4, 4));
    color: white;
    padding: 8px 0px;
    border: unset;
    font-size: 16px;
    font-weight: bold;
  }

  .login--forget-password {
    width: 100%;
    margin-top: 5px;
    text-align: center;
    color: rgb(0, 0, 0, 0.8);

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .login--redirect-signup {
    text-align: center;
    width: 100%;
    margin-top: 10px;
  }
}
</style>
