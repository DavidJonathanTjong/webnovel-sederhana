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
          Update User (ID = {{ row.id }})
        </h3>
      </div>

      <form @submit.prevent="updateUser" name="formupdateuser">
        <div class="grid gap-4 mb-4 sm:grid-cols-2">
          <div>
            <label for="name" class="block mb-2">Nama User</label>
            <input
              type="text"
              id="name"
              v-model="formUser.name"
              class="w-full p-2 border"
              placeholder="nama user"
            />
          </div>
          <div>
            <label for="email" class="block mb-2">Email User</label>
            <input
              type="text"
              id="email"
              v-model="formUser.email"
              class="w-full p-2 border"
              placeholder="Enter mail"
            />
            <span v-if="validasi.email" class="text-red-700"
              >Email Sudah Ada</span
            >
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <button type="submit" class="bg-blue-500 text-white p-2 rounded">
            Update User
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
      formUser: reactive({
        name: "",
        email: "",
      }),
      validasi: {
        email: false,
      },
    };
  },
  methods: {
    //untuk modal
    openModal() {
      this.formUser = { ...this.row }; // Memuat data dari yang sebelumnya sudah ditampilkan dari objek row yang sudah menyimpan data
      this.isModalVisible = true; // Tampilkan modal
      this.validasi.email = false;
    },
    closeModal() {
      this.isModalVisible = false; // Sembunyikan modal
    },

    //untuk crud
    async updateUser() {
      // alert(`Edit ${this.row.id} dengan nama ${this.formUser.name}`);
      try {
        const response = await axios.put(
          `/api/users/edit/${this.row.id}`,
          this.formUser
        );
        console.log(response);

        if (response.data.messege === "User Updated Succesfully") {
          console.log("update sukses");
          this.closeModal(); // Tutup modal setelah update
        } else {
          console.log("update gagal");
          this.validasi.email = true;
        }
      } catch (error) {
        if (error.response && error.response.data.email) {
          this.validasi.email = true;
        }
        console.error("Error di update catch:", error);
      }
    },
    async btnDelete() {
      try {
        if (confirm(`Apakah yakin ingin menghapus user ${this.row.id}?`)) {
          await axios.delete(`/api/users/delete/${this.row.id}`);
          alert(`${this.row.id} berhasil dihapus`);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },
  },
};
</script>
