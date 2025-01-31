<template>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img
              class="h-8 w-8"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <NavLink v-if="!isAdmin" href="/" :active="isActive('/')"
                >Home</NavLink
              >
              <NavLink
                v-if="!isAdmin"
                href="/daftar-novel"
                :active="isActive('/daftar-novel')"
                >Daftar Novel</NavLink
              >
              <NavLink
                v-if="!isAdmin"
                href="/novel-tamat"
                :active="isActive('/novel-tamat')"
                >Novel Tamat</NavLink
              >
              <NavLink
                v-if="!isAdmin"
                :href="isLogin ? '/bookmarks' : '/login'"
                :active="isActive('/bookmarks')"
                >Bookmarks</NavLink
              >
              <NavLink
                v-if="isAdmin"
                href="/dashboarduser"
                :active="isActive('/dashboarduser')"
                >Manajemen User</NavLink
              >
              <NavLink
                v-if="isAdmin"
                href="/dashboard-novel"
                :active="isActive('/dashboard-novel')"
                >Manajemen Novel</NavLink
              >
              <NavLink
                v-if="isAdmin"
                href="/dashboard-detailnovel"
                :active="isActive('/dashboard-detailnovel')"
                >Manajemen Isi Novel</NavLink
              >
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <div class="relative ml-3">
              <button
                @click="toggleDropdown"
                type="button"
                class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User"
                />
              </button>
              <div
                v-if="isOpen"
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <template v-if="isLogin">
                  <!-- jika sudah login -->
                  <RouterLink
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-green-200 no-underline"
                    to="/profil"
                    @click="navProfil"
                    >Your Profile</RouterLink
                  >
                  <RouterLink
                    to="/"
                    @click="logout"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-green-200 no-underline"
                    >Log Out</RouterLink
                  >
                </template>
                <template v-else>
                  <RouterLink to="/login"></RouterLink>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="-mr-2 flex md:hidden">
          <button
            @click="toggleMobileMenu"
            type="button"
            class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <svg
              v-if="!isMobileMenuOpen"
              class="block h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <svg
              v-if="isMobileMenuOpen"
              class="block h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- Mobile menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
        <NavLink v-if="!isAdmin" href="/" :active="isActive('/')">Home</NavLink>
        <NavLink
          v-if="!isAdmin"
          href="/daftar-novel"
          :active="isActive('/daftar-novel')"
          >Daftar Novel</NavLink
        >
        <NavLink
          v-if="!isAdmin"
          href="/novel-tamat"
          :active="isActive('/novel-tamat')"
          >Novel Tamat</NavLink
        >
        <NavLink
          v-if="!isAdmin"
          :href="isLogin ? '/bookmarks' : '/login'"
          :active="isActive('/bookmarks')"
          >Bookmarks</NavLink
        >
        <NavLink
          v-if="isAdmin"
          href="/dashboarduser"
          :active="isActive('/dashboarduser')"
          >Manajemen User</NavLink
        >
        <NavLink
          v-if="isAdmin"
          href="/dashboard-novel"
          :active="isActive('/dashboard-novel')"
          >Manajemen Novel</NavLink
        >
        <NavLink
          v-if="isAdmin"
          href="/dashboard-detailnovel"
          :active="isActive('/dashboard-detailnovel')"
          >Manajemen Isi Novel</NavLink
        >
      </div>
      <div class="border-t border-gray-700 pb-3 pt-4">
        <div class="flex items-center px-5">
          <img
            class="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User"
          />
          <div class="ml-3">
            <template v-if="!isLogin">
              <div
                class="text-base font-medium leading-none text-white no-underline"
              >
                User
              </div>
              <div
                class="text-sm font-medium leading-none text-gray-400 no-underline"
              >
                User@example.com
              </div>
            </template>
            <template v-else>
              <div class="text-base font-medium leading-none text-white">
                {{ namaUser }}
              </div>
              <div class="text-sm font-medium leading-none text-gray-400">
                {{ emailUser }}
              </div>
            </template>
          </div>
        </div>
        <div class="mt-3 space-y-1 px-2">
          <template v-if="isLogin">
            <RouterLink
              to="/profil"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white no-underline"
              >Your Profile</RouterLink
            >
            <RouterLink
              to="/"
              @click="logout"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white no-underline"
              >Sign out</RouterLink
            >
          </template>
          <template v-else>
            <RouterLink
              to="/login"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white no-underline"
              >Login</RouterLink
            >
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import NavLink from "./NavLink.vue";

export default {
  data() {
    return {
      isOpen: false,
      isMobileMenuOpen: false,
      loggedIn: !!localStorage.getItem("token"), //selalu cek status login
      namaUser: "",
      emailUser: "",
    };
  },
  components: {
    NavLink,
  },
  computed: {
    isLogin() {
      return this.loggedIn;
    },
    isAdmin() {
      return this.emailUser === "davidtjong@gmail.com";
    },
  },
  watch: {
    // melihat perubahan localStorage
    $route(to, from) {
      // naviagtion guard
      // cek localStorage setiap kali suatu rute berubah
      this.loggedIn = !!localStorage.getItem("token");
      this.emailUser = localStorage.getItem("email");
      this.namaUser = localStorage.getItem("nama");
    },
  },
  methods: {
    toggleDropdown() {
      if (this.isLogin == false) {
        this.$router.push("/login");
      } else {
        this.isOpen = !this.isOpen;
      }
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    isActive(route) {
      return this.$route.path === route;
    },
    logout() {
      // Bersihkan local storage dan update status login
      console.log("logout");
      this.loggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("nama");
      localStorage.removeItem("loggedIn");
      this.namaUser = "user";
      this.emailUser = "user@example.com";
      this.$router.push({ name: "login" });
      this.isOpen = !this.isOpen;
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    navProfil() {
      this.$router.push({ name: "profil" });
      this.isOpen = !this.isOpen;
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
  },
  mounted() {
    this.emailUser = localStorage.getItem("email");
    this.namaUser = localStorage.getItem("nama");
  },
};
</script>
