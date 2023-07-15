<template>
  <div class="row login">
    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 login--container">
      <h2 class="login--title">Signup</h2>
      <form id="form" class="row g-3 needs-validation" @submit.prevent="signUp" novalidate>
        <div class="col-md-6">
          <label for="validationCustom01" class="form-label fw-bold">First name</label>
          <input
            type="text"
            v-model="userDetails.firstName"
            class="form-control"
            id="validationCustom01"
            placeholder="Enter your firstname"
            required />
            <div class="invalid-feedback">
              Please enter a firstname.
            </div>
        </div>
        <div class="col-md-6">
          <label for="validationCustom02" class="form-label fw-bold">Last name</label>
          <input
            type="text"
            v-model="userDetails.lastName"
            class="form-control"
            id="validationCustom02"
            placeholder="Enter your lastname"
            required />
            <div class="invalid-feedback">
              Please enter a lastname.
            </div>
        </div>
        <div class="col-md-12">
          <label for="validationCustom03" class="form-label fw-bold">Email</label>
          <input
            type="text"
            v-model="userDetails.email"
            class="form-control"
            id="validationCustom03"
            placeholder="Enter your email"
            required />
            <div class="invalid-feedback">
              Please enter a email.
            </div>
        </div>
        <div class="col-md-6">
          <label for="validationCustomUsername" class="form-label fw-bold">Username</label>
          <div class="input-group has-validation">
            <input
              type="text"
              class="form-control"
              v-model="userDetails.username"
              id="validationCustomUsername"
              aria-describedby="inputGroupPrepend"
              placeholder="Enter your username"
              required />
              <div class="invalid-feedback">
              Please enter a username.
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <label for="validationCustom04" class="form-label fw-bold">Date of Birth</label>
          <input
            type="date"
            v-model="userDetails.dateOfBirth"
            class="form-control"
            id="validationCustom04"
            required />
            <div class="invalid-feedback">
              Please enter a date of birth.
            </div>
        </div>
        <div class="col-12">
          <label for="validationCustom05" class="form-label fw-bold">Gender</label>
          <div class="row">
            <div class="form-check col-3  ms-3 d-flex align-items-center">
              <input type="radio" v-model="userDetails.gender" class="form-check-input me-3" value="male" id="validationFormCheck5" name="radio-stacked-male" required>
              <label class="form-check-label" for="validationFormCheck5">Male</label>
            </div>
            <div class="form-check col-4 d-flex align-items-center">
              <input type="radio" v-model="userDetails.gender" class="form-check-input me-3" value="female" id="validationFormCheck5" name="radio-stacked-male" required>
              <label class="form-check-label" for="validationFormCheck5">Female</label>
            </div>
          </div>
          <div class="invalid-feedback">
              Please enter a gender.
          </div>
        </div>
        <div class="col-md-6">
          <label for="validationCustom06" class="form-label fw-bold">Password</label>
          <input
            type="password"
            v-model="userDetails.password"
            class="form-control"
            id="validationCustom06"
            placeholder="Enter your password"
            required />
            <div class="invalid-feedback">
              Please enter a password.
            </div>
        </div>
        <div class="col-md-6">
          <label for="validationCustom07" class="form-label fw-bold">Confirm Password</label>
          <input
            type="password"
            v-model="confirmPassword"
            class="form-control"
            id="validationCustom07"
            placeholder="Enter confirm password"
            required />
            <div v-if="userDetails.password !== confirmPassword" class="text-danger" style="font-size: 12px;">
              password and confirm password doesn't match
            </div>
        </div>
        <div class="col-12">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="invalidCheck"
              required />
            <label class="form-check-label" for="invalidCheck">
              Agree to terms and conditions
            </label>
            <div class="invalid-feedback">
              You must agree before submitting.
            </div>
          </div>
        </div>
        <div class="col-12">
          <button type="submit" class="mb-3 login--button">SignUp</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/auth.service";
import { ref } from "vue";
import { notify } from "@kyvg/vue3-notification";
import { useRouter } from "vue-router";
const authService = new AuthService();

export default {
  name: "SignUpPage",

  setup() {
    const router = new useRouter();
    const userDetails = ref({
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      dateOfBirth: "",
      password: "",
    });
    const confirmPassword = ref('');

    const signUp = async () => {
      const form = document.getElementById("form");
      form.classList.add("was-validated");
      if (form.checkValidity()) {
        try {
          const response = await authService.signUp({...userDetails.value});
          if (response) {
            notify({
              title: "Authorization",
              text: "User Register successfully",
              type: "success",
            });
            router.push({ name: "Login" });
          }
        } catch (error) {
          notify({
            title: "Authorization",
            text: error.response.data.message,
            type: "error",
          });
        }
      } else {
        notify({
          title: "Authorization",
          text: "Please enter user details",
          type: "error",
        });
      }
    };

    return {
      userDetails,
      signUp,
      confirmPassword,
    };
  },
};
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
    padding: 50px 30px 30px 30px;
    border-radius: 5px;
    box-shadow: 0px 0px 20px -2px gray;
  }
  .login--title {
    text-align: center;
    background: linear-gradient(to right, rgb(188, 12, 241), rgb(212, 4, 4));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 2.5rem;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
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
