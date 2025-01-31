<template>
  <section class="bg-gray-50 dark:bg-gray-900 h-[135vh]">
    <div class="container mt-2 border bg-white">
      <div>
        <button
          type="button"
          class="btn btn-primary w-18 mt-2"
          @click="btnInsert"
        >
          INSERT
        </button>
      </div>

      <div class="mt-2">
        <jl-datatable
          :url="url"
          :columns="columns"
          :order="order"
          :lengthMenu="lengthMenu"
          :pageLength="pageLength"
          @lihat-gambar="showImageModal"
        />
      </div>
    </div>

    <div
      v-if="showInsertForm"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div
        class="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl mx-4 md:mx-auto"
      >
        <h3 class="text-lg font-semibold mb-4 text-center">Insert Novel</h3>
        <form @submit.prevent="submitInsert">
          <label class="block mb-2">Nama Novel:</label>
          <input
            v-model="formInsertNovel.nama_novel"
            type="text"
            required
            class="border border-gray-300 rounded-md p-2 w-full mb-4"
          />

          <label class="block mb-2">Deskripsi:</label>
          <textarea
            v-model="formInsertNovel.deskripsi"
            required
            class="border border-gray-300 rounded-md p-2 w-full mb-4"
          ></textarea>

          <label class="block mb-2">Rating:</label>
          <input
            v-model="formInsertNovel.rating_novel"
            type="number"
            min="0"
            max="5"
            step="0.1"
            required
            class="border border-gray-300 rounded-md p-2 w-full mb-4"
          />

          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="file_input"
            >Upload file gambar</label
          >
          <input
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            @change="handleOnChange"
          />
          <p
            class="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            PNG, JPG or GIF (MAX. 800x400px)
          </p>

          <div class="flex justify-between mt-4">
            <button
              type="submit"
              class="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 w-full md:w-auto"
            >
              Submit
            </button>
            <button
              type="button"
              class="bg-gray-300 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-400 w-full md:w-auto mt-2 md:mt-0"
              @click="showInsertForm = false"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
import JlDatatable from "jl-datatable";
import Buttons from "../../components/buttons/ButtonCrudNovel.vue";
import { reactive, toRefs, shallowRef } from "vue";
import axios from "axios";
import ImageButton from "../../components/buttons/ImageButton.vue";

export default {
  name: "App",
  components: {
    JlDatatable,
  },
  setup() {
    const data = reactive({
      url: "http://localhost:8000/api/listnovel",
      columns: [
        {
          label: "ID",
          data: "id",
          searchable: false,
          orderable: false,
        },
        {
          label: "Nama Novel",
          data: "nama_novel",
          orderable: false,
        },
        {
          label: "Foto",
          data: "foto_sampul_preview",
          orderable: false,
          searchable: false,
          component: shallowRef(ImageButton),
        },
        {
          label: "Deskripsi",
          data: "deskripsi",
          orderable: false,
          searchable: false,
        },
        {
          label: "Rating",
          data: "rating_novel",
          searchable: false,
          orderable: false,
        },
        {
          label: "Updated at",
          data: "updated_at",
          searchable: false,
          orderable: false,
        },
        {
          label: "Actions",
          data: "actions",
          orderable: false,
          searchable: false,
          component: shallowRef(Buttons),
        },
      ],
      order: {
        column: 2,
        dir: "DESC",
      },
      lengthMenu: [10, 20, 40, 80, 160],
      pageLength: 10,
      showInsertForm: false,
      showImageModal: false,
      currentImage: "",
      formInsertNovel: {
        nama_novel: "",
        deskripsi: "",
        rating_novel: 5,
        foto_sampul: "",
      },
    });

    const btnInsert = () => {
      data.showInsertForm = true;
      console.log("btnInsert executed, showInsertForm:", data.showInsertForm);
    };

    const handleOnChange = (event) => {
      data.formInsertNovel.foto_sampul = event.target.files[0];
      console.log("File = ", data.formInsertNovel.foto_sampul);
    };

    const submitInsert = async () => {
      try {
        const formData = new FormData();
        formData.append("nama_novel", data.formInsertNovel.nama_novel);
        formData.append("deskripsi", data.formInsertNovel.deskripsi);
        formData.append("rating_novel", data.formInsertNovel.rating_novel);
        formData.append("foto_sampul", data.formInsertNovel.foto_sampul);
        console.log("Sending form data:", formData.get("foto_sampul"));

        const response = await axios.post("/api/novels", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);
        if (response.data.messege === "Novel Created Succesfully") {
          data.showInsertForm = false;
          console.log("Sukses insert");
          // Reset form
          data.formInsertNovel.nama_novel = "";
          data.formInsertNovel.deskripsi = "";
          data.formInsertNovel.rating_novel = 5;
          data.formInsertNovel.foto_sampul = "";
        } else {
          console.log("Gagal insert");
        }
      } catch (error) {
        console.log("Error di catch saat mencoba insert novel", error);
      }
    };

    return {
      ...toRefs(data),
      btnInsert,
      submitInsert,
      handleOnChange,
    };
  },
};
</script>
