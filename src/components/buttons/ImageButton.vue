<template>
  <button
    @click="lihatGambar"
    class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
  >
    Lihat Gambar
  </button>

  <div
    v-if="showImageModal"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-white rounded-lg p-6 max-w-sm w-full">
      <h3 class="text-lg font-semibold mb-4">Foto Sampul</h3>
      <img
        :src="currentImage"
        alt="Foto Sampul"
        class="rounded-md w-full h-auto"
      />
      <button
        @click="closeImageModal"
        class="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Tutup
      </button>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  props: {
    row: Object,
    column: Object,
  },
  data() {
    return {
      showImageModal: false, // Mengontrol modal
      currentImage: null,
      formNovel: reactive({
        nama_novel: "",
        foto_sampul: null,
      }),
    };
  },
  methods: {
    lihatGambar() {
      if (this.row && this.row.foto_sampul) {
        this.currentImage = this.row.foto_sampul; // Set URL gambar
        this.showImageModal = true; // Tampilkan modal
      } else {
        console.error("URL gambar tidak tersedia");
      }
    },
    closeImageModal() {
      this.showImageModal = false; // Menutup modal
      this.currentImage = null; // Reset URL gambar
    },
  },
};
</script>
