<template>
  <RouterLink
    :to="href"
    :class="linkClasses"
    class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
  >
    <slot></slot>
  </RouterLink>
</template>

<script>
export default {
  props: {
    href: String,
    active: Boolean,
  },
  computed: {
    linkClasses() {
      return this.active
        ? "block rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white no-underline"
        : "block rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white no-underline";
    },
    isActive() {
      return this.$route.path === this.href; // Menentukan lokasi rute saat ini sesuai dengan href aktif
    },
  },
  watch: {
    $route() {
      this.isActive;
    },
  },
};
</script>
