<template>
  <div class="row login">
    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 login--container">
      <h2 class="login--title">Forget Password</h2>
      <form id="form" @submit.prevent="login" class="needs-validation" novalidate>
    <div class="mb-3">
      <label for="usernameInput" class="form-label fw-bold"><i :class="`${forgetPasswordDetails[index].iconName} me-2`"></i>{{ forgetPasswordDetails[index].name }}</label>
      <input :type="forgetPasswordDetails[index].type" v-model="forgetPasswordDetails[index].value" class="form-control" :placeholder="forgetPasswordDetails[index].placeholder" id="usernameInput" required>
      <div class="invalid-feedback">
        {{ forgetPasswordDetails[index].invalidMessage }}
      </div>
    </div>
    <div v-if="index >= 2" class="mb-3">
      <label for="passwordInput" class="form-label fw-bold"><i class="fas fa-lock me-2"></i>{{ forgetPasswordDetails[3].name }}</label>
      <input type="password" v-model="forgetPasswordDetails[3].value" class="form-control" placeholder="Enter your password" id="passwordInput" required>
      <div v-if="forgetPasswordDetails[2].value !== forgetPasswordDetails[3].value" class="text-danger" style="font-size: 12px;">
        Password and confirm password doesn't match
      </div>
    </div>
    <button type="submit" class="mb-3 login--button">{{ forgetPasswordDetails[index].buttonMessage }}</button>
  </form>

    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { notify } from "@kyvg/vue3-notification";
import { useRouter } from 'vue-router';
import {forgetPasswordDetailsJSON} from '@/utils/helper';

export default {
  name: 'ForgetPasswordPage',

  setup() {
    const router = new useRouter();
    const forgetPasswordDetails = ref(forgetPasswordDetailsJSON)
    const index = ref(0);
    const buttonName = ref('Sent an Email');
    const message = ref('');

    const goToSignUp = () => {
      router.push({ name: 'SignUp' })
    }
    

    const login = async () => {
      const form = document.getElementById('form');
      form.classList.add('was-validated');
      if (index.value === 2 && forgetPasswordDetails?.value[index.value].value !== forgetPasswordDetails?.value[index.value + 1].value) {
        notify({
          title: "Authorization",
          text: "Password and Confirm Password doesn't match",
          type: 'error'
        });
        return;
      }
      if (form.checkValidity()) {
        notify({
          title: forgetPasswordDetails?.value.length && forgetPasswordDetails.value[index.value]?.name,
          text: forgetPasswordDetails?.value.length && forgetPasswordDetails.value[index.value]?.successMessage,
          type: 'success'
        });
        if (index.value === 2) {
          router.push({ name: 'Login' });
        }
        index.value = index.value + 1;
        form.classList.remove('was-validated');
      } else {
        notify({
          title: "Authorization",
          text: "Please fill all required fields",
          type: 'error'
        });
      }
    }

    return {
      forgetPasswordDetails,
      index,
      login,
      goToSignUp,
      buttonName,
      message,
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
