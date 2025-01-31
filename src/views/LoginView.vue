<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img
          class="w-8 h-8 mr-2"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAADMUlEQVR4nO2cTW9NURSGH0qihmgnIlTNOkKIRKKJ0BAx9VFfQ0n7CxgxIhExQarpTPUfYEiCVlCNCq3PmKrrK0JU6ZadrJNIQ+O29+y9uvd6kje5uffm7LPenLvvOmuvs8EwDMMwDMMwDMOYEWuATqAPeAi8B36IKvKe/6wDaJ7ZEPmyADgA9AOuSt0B2oG62EFoZwfwfAYGT9Uo0BY7GI0sBnpqYPBUdQP1sYPTQiMwWILJhe4DDWROo/zMyzL5z6mkIefpYjCAyX9e2YvIkJ6AJhfqIjPaIphcaCcZ5cnPIxo9kkuefTCiyYX2kQEDCoy+TQa1C6dAk0ATCdOpwORCR0mYPgUGF+olYYYUGFzoAQlTUWBwoTESZlyBwYW+kzBOmZLFKVOyOGVKlnEF5mYxR1cUGJxF1jGkwOAs8ugrCgwudJmE6VBgcBa1jmapnMU22Z/DKhKnX4HRt8iAdgVG7yED6gL1cvxLT3JZM/Rsj2j0VjKjO4LJF8mQeukeCmXy3Vw7lZB+uNFAvRzLyJwG4F7JV3K2DY5/m0a6SpqTs50upmOb/MxrkcJll11Ui89x90s3UTW365Nyx7cXmF/1qJnTJMWfXumlrsjigdc7KXX2yneSr10YhmEYhmEYhmEYxuxYAbSUaGKLjJElG4HTwLAUhPyOMsdqXAzyxzoux/ZjPAJOARtInGbgJPBimgrcDWB9Dcbyx7g5zTj+yd0TwGoSwV9Vu4HrwK8qSp7XgC1VXuH+u60y1v+O48/pKrBrrpZW/fPeR4Bnsyzgv5Uy6CFgraz7LRT51+uAw9I8OTbLsUbkWP7c1TNPNp56XcKylAukV7Lw4GNRySZZCHWJaEDbH+ciySB+KjDH1Vh+Dr8ku+VEzyQeKzDElazhmBsYtip7JsWVrIpkQkHxc9cXBcG7wPoKbA5l8tIapFJuDsvHviSE0WcVBOsi60wIo2NuPOWU6GkIo78pCNRFlv9/Kp03CgJ1kfUyhNHnFQTqIutcCKOXAx8UBOsi6VPIhQT/sM9nBUG7wPoYox3Yd3pekCxkQoEJriRNSIx+ylwZ2mTDMAzDMAzDMAzDMAwU8hvlWkaYT9zfLQAAAABJRU5ErkJggg=="
          alt="logo"
        />
        WebNovelDavid
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Login to your account
          </h1>

          <!-- {{ form }} -->
          <form class="space-y-4 md:space-y-6" @submit.prevent="login">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your email</label
              >
              <input
                type="email"
                name="email"
                id="email"
                v-model="form.email"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="user@gmail.com"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                type="password"
                name="password"
                id="password"
                v-model="form.password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
              <span v-if="validasi.password" class="text-red-700"
                >wrong password</span
              >
            </div>
            <button
              type="submit"
              class="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Login
            </button>
            <p class="text-sm font-medium text-primary-600">
              Don’t have an account yet?
              <RouterLink
                to="/register"
                class="font-medium text-blue-400 hover:underline dark:text-primary-500"
              >
                Create a new account
              </RouterLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";

export default {
  data() {
    return {
      form: reactive({
        email: "",
        password: "",
      }),
      //cek status
      loggedIn: localStorage.getItem("loggedIn"),
      //set token
      token: localStorage.getItem("token"),
      //set user sekarang
      user: [],
      //validasi
      validasi: {
        password: false,
      },
      //login fail
      loginFailed: null,
    };
  },
  methods: {
    async login() {
      if (this.form.email && this.form.password) {
        try {
          //mengambil cookie
          await axios.get("/sanctum/csrf-cookie");
          //mengambil credential
          const responLogin = await axios.post("/api/login", {
            email: this.form.email,
            password: this.form.password,
          });
          console.log(responLogin);
          //cek login
          if (responLogin.data.messege === "Login Sukses") {
            console.log("LOGIN SUKSES CUY");
            // Set localStorage items
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("token", responLogin.data.data.token);
            localStorage.setItem("email", responLogin.data.data.email); //email
            localStorage.setItem("nama", responLogin.data.data.name); //nama

            // ubah status
            this.loggedIn = true;
            this.token = responLogin.data.token;

            //redirect ke user manajemen jika admin
            if (localStorage.getItem("email") === "davidtjong@gmail.com") {
              this.$router.push({ name: "dashboarduser" });
            } else {
              //redirect ke bookmark jika user
              this.$router.push({ name: "bookmarks" });
            }
          } else {
            //login gagal
            this.loginFailed = true;
            console.log(
              "Login failed:",
              responLogin.data.message || "Unknown error"
            );
          }
        } catch (error) {
          //unauthorize
          this.validasi.password = true;
          console.log("ada eror awal trycatch: ", error);
        }
      }
    },
  },
};
</script>
