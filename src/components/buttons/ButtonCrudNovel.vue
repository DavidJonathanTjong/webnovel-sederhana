<template>
  <div class="btn-group">
    <div class="col-md-6">
      <button type="button" class="btn btn-primary w-16" @click="openModal">
        Edit
      </button>
    </div>
    <div class="col-md-6">
      <button type="button" class="btn btn-danger" @click="btnDelete">
        Delete
      </button>
    </div>
  </div>

  <div
    v-if="isModalVisible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50"
  >
    <div class="bg-white p-4 w-full max-w-2xl h-full md:h-auto">
      <div
        class="flex justify-between items-center pb-4 mb-4 rounded-t border-b"
      >
        <h3 class="text-lg font-semibold text-gray-900">
          Update Novel (ID = {{ row.id }})
        </h3>
      </div>

      <form @submit.prevent="updateNovels">
        <div class="grid gap-4 mb-4 sm:grid-cols-2">
          <div>
            <label for="nama" class="block mb-2">Nama Novel:</label>
            <input
              type="text"
              id="nama"
              v-model="formNovel.nama_novel"
              required
              class="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label for="deskripsi" class="block mb-2">Deskripsi:</label>
            <textarea
              id="deskripsi"
              v-model="formNovel.deskripsi"
              required
              class="w-full p-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>

          <div>
            <label for="rating" class="block mb-2">Rating:</label>
            <input
              type="number"
              id="rating"
              v-model="formNovel.rating_novel"
              min="0"
              max="5"
              step="0.1"
              required
              class="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label for="imgnovel" class="block mb-2">Foto:</label>
            <input
              type="file"
              id="imgnovel"
              @change="handleOnChange"
              required
              class="w-full p-2 border border-gray-300 rounded-md"
            />
            <div class="mt-2">
              <img
                v-if="formNovel.foto_sampul"
                :src="formNovel.foto_sampul"
                alt="Gambar Novel"
                class="w-full h-32 object-contain"
              />
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <button type="submit" class="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
          <button
            type="button"
            @click="closeModal"
            class="bg-gray-300 text-gray-700 p-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";

export default {
  name: "buttons",
  props: {
    row: Object,
    column: Object,
  },
  data() {
    return {
      isModalVisible: false, // Kontrol visibilitas modal
      formNovel: reactive({
        nama_novel: "",
        foto_sampul: null,
        deskripsi: "",
        rating_novel: 0,
        foto_preview: "",
      }),
    };
  },
  methods: {
    //untuk modal
    openModal() {
      this.formNovel = { ...this.row }; // Memuat data dari yang sebelumnya sudah ditampilkan dari objek row yang sudah menyimpan data
      this.isModalVisible = true; // Tampilkan modal
      this.formNovel.foto_preview = this.row.foto_sampul;
    },
    closeModal() {
      this.isModalVisible = false; // Sembunyikan modal
    },

    handleOnChange(event) {
      const file = event.target.files[0]; //dapatin image saat ini
      if (file) {
        this.formNovel.foto_sampul = file;
        this.formNovel.foto_sampul_preview = URL.createObjectURL(file); // Menampilkan preview gambar
      }
    },

    //untuk crud
    async updateNovels() {
      try {
        const response = await axios.put(
          `/api/novels/edit/${this.row.id}`,
          this.formNovel
        );
        console.log(response);

        if (response.data.messege === "Novel Updated Succesfully") {
          console.log("update sukses");
          alert(`id ${this.row.id} berhasil update`);
          this.closeModal(); // Tutup modal setelah update
          location.reload();
        } else {
          console.log("update gagal");
        }
      } catch (error) {
        console.error("Error di update catch:", error);
      }
    },

    async btnDelete() {
      try {
        if (confirm(`Apakah yakin ingin menghapus user ${this.row.id}?`)) {
          await axios.delete(`/api/novels/delete/${this.row.id}`);
          alert(`novel dengan id ${this.row.id} berhasil dihapus`);
          location.reload();
        }
      } catch (error) {
        console.error("Error deleting novel:", error);
      }
    },
  },
};
</script>
