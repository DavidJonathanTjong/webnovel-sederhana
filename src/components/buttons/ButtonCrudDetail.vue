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
          Update Detail Novel (ID = {{ row.id }})
        </h3>
      </div>

      <form @submit.prevent="updateDetail" name="formupdatedetail">
        <div class="grid gap-4 mb-4 sm:grid-cols-2">
          <div>
            <label for="idn" class="block mb-2">ID Novel</label>
            <input
              type="text"
              id="idn"
              v-model="formDetail.id_novel"
              class="w-full p-2 border"
              placeholder="Enter id"
            />
          </div>
          <div>
            <label for="chapternovel" class="block mb-2">Chapter Novel</label>
            <input
              type="text"
              id="chapternovel"
              v-model="formDetail.chapter_novel"
              class="w-full p-2 border"
              placeholder="Enter chapter"
            />
          </div>
          <div>
            <label for="txtnovel" class="block mb-2">Text novelsdffsd</label>
            <input
              type="text"
              id="txtnovel"
              v-model="formDetail.text_novel"
              class="w-full p-2 border"
              placeholder="Enter text"
            />
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <button type="submit" class="bg-blue-500 text-white p-2 rounded">
            Update Chapter
          </button>
          <button
            type="button"
            @click="closeModal"
            class="bg-red-500 text-white p-2 rounded"
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
      formDetail: reactive({
        id_novel: "",
        chapter_novel: 0,
        text_novel: "",
      }),
    };
  },
  methods: {
    //untuk modal
    openModal() {
      this.formDetail = { ...this.row }; // Memuat data dari yang sebelumnya sudah ditampilkan dari objek row yang sudah menyimpan data
      this.isModalVisible = true; // Tampilkan modal
    },
    closeModal() {
      this.isModalVisible = false; // Sembunyikan modal
    },

    //untuk crud
    // detailnovel/edit/{detailnovel}
    async updateDetail() {
      try {
        const response = await axios.put(
          `/api/detailnovel/edit/${this.row.id}`,
          this.formDetail
        );
        console.log(response);

        if (response.data.messege === "Detail Novel Updated Succesfully") {
          console.log("update sukses");
          alert(`detail novel dengan id ${this.row.id} berhasil update`);
          this.closeModal(); // Tutup modal setelah update
        } else {
          console.log("update gagal");
        }
      } catch (error) {
        console.error("Error di update catch:", error);
      }
    },

    async btnDelete() {
      try {
        if (
          confirm(
            `Apakah yakin ingin menghapus detail novel ini ${this.row.id}?`
          )
        ) {
          await axios.delete(`/api/detailnovel/delete/${this.row.id}`);
          alert(`novel dengan id ${this.row.id} berhasil dihapus`);
        }
      } catch (error) {
        console.error("Error deleting novel:", error);
      }
    },
  },
};
</script>
