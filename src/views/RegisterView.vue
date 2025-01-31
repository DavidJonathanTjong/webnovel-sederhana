<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="min h-screen flex flex-col items-center justify-center mt-2 px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Register your account
          </h1>
          <!-- {{ regis }} -->
          <form class="space-y-4 md:space-y-6" @submit.prevent="registration">
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
                v-model="regis.email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
              />
              <span v-if="validasi.email" class="text-red-700"
                >Email sudah ada</span
              >
            </div>
            <div>
              <label
                for="username"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your username</label
              >
              <input
                type="text"
                name="username"
                id="username"
                v-model="regis.nama"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="fufufafa"
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
                v-model="regis.password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div>
              <label
                for="confirm-password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Confirm password</label
              >
              <input
                type="confirm-password"
                name="confirm-password"
                id="confirm-password"
                v-model="regis.konfirmasi"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
              <span v-if="validasi.password" class="text-red-700"
                >password tidak sama</span
              >
            </div>
            <button
              type="submit"
              class="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Create an account
            </button>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Already have an account?
              <RouterLink
                to="/login"
                class="font-medium text-blue-400 hover:underline dark:text-primary-500"
              >
                Login here
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
      regis: reactive({
        email: "",
        nama: "",
        password: "",
        konfirmasi: "",
      }),

      validasi: {
        password: false,
        email: false,
      },
    };
  },
  methods: {
    async registration() {
      if (this.regis.password !== this.regis.konfirmasi) {
        this.validasi.password = true;
        return;
      }
      try {
        const responRegis = await axios.post("/api/register", {
          name: this.regis.nama,
          email: this.regis.email,
          password: this.regis.password,
          confirm_password: this.regis.password,
        });
        console.log(responRegis);

        if (responRegis.data.sukses) {
          console.log("Regis SUKSES CUY");
          alert("Registration successful!");
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("token", responRegis.data.data.token);
          localStorage.setItem("email", responRegis.data.data.email); //email
          localStorage.setItem("nama", responRegis.data.data.name); //nama
          this.$router.push({ name: "home" });
        } else {
          console.log("Regis gagal");
          alert("Registration fail!");
          this.validasi.email = true;
        }

        // Lakukan tindakan lain setelah registrasi berhasil, seperti redirect ke halaman login
      } catch (error) {
        console.log("Regis gagal di catch");
        alert("Registration failed: " + error.response.data.messege);
        this.validasi.email = true;
      }
    },
  },
};
</script>
