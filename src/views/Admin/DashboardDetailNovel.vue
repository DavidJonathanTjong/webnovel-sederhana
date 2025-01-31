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
        />
      </div>
    </div>

    <div
      v-if="showInsertForm"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-[90vw] max-w-4xl">
        <h3 class="text-lg font-semibold mb-4">Insert Novel</h3>
        <form @submit.prevent="submitInsert">
          <div class="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label class="block mb-2">ID Novel:</label>
              <input
                v-model="formDetailNovel.id_novel"
                type="number"
                min="0"
                required
                class="border border-gray-300 rounded-md p-2 w-full mb-4"
              />
            </div>

            <div>
              <label class="block mb-2">Chapter Novel:</label>
              <input
                v-model="formDetailNovel.chapter_novel"
                type="number"
                min="0"
                placeholder="masukan angka"
                required
                class="border border-gray-300 rounded-md p-2 w-full mb-4"
              />
            </div>
          </div>
          <div>
            <label class="block mb-2">Text novel:</label>
            <section
              class="buttons flex items-center flex-wrap gap-x-4 p-4 border border-gray-300 border-b-0"
              v-if="editor"
            >
              <button
                @click="editor.chain().focus().toggleBold().run()"
                :disabled="!editor.can().chain().focus().toggleBold().run()"
                :class="{ 'bg-gray-200': editor.isActive('bold') }"
                class="p-1"
              >
                Bold
              </button>
              <button
                @click="editor.chain().focus().toggleItalic().run()"
                :disabled="!editor.can().chain().focus().toggleItalic().run()"
                :class="{ 'bg-gray-200': editor.isActive('italic') }"
                class="p-1"
              >
                Italic
              </button>
              <button
                @click="editor.chain().focus().toggleStrike().run()"
                :disabled="!editor.can().chain().focus().toggleStrike().run()"
                :class="{ 'bg-gray-200': editor.isActive('strike') }"
                class="p-1"
              >
                Strike
              </button>
              <button
                @click="editor.chain().focus().toggleCode().run()"
                :disabled="!editor.can().chain().focus().toggleCode().run()"
                :class="{ 'bg-gray-200': editor.isActive('code') }"
                class="p-1"
              >
                Code
              </button>
              <button
                @click="editor.chain().focus().unsetAllMarks().run()"
                class="p-1"
              >
                Clear marks
              </button>
              <button
                @click="editor.chain().focus().clearNodes().run()"
                class="p-1"
              >
                Clear nodes
              </button>
              <button
                @click="editor.chain().focus().setParagraph().run()"
                :class="{ 'bg-gray-200': editor.isActive('paragraph') }"
                class="p-1"
              >
                Paragraph
              </button>
              <button
                @click="
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                "
                :class="{
                  'bg-gray-200': editor.isActive('heading', { level: 1 }),
                }"
                class="p-1"
              >
                H1
              </button>
              <button
                @click="
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                "
                :class="{
                  'bg-gray-200': editor.isActive('heading', { level: 2 }),
                }"
                class="p-1"
              >
                H2
              </button>
              <button
                @click="
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                "
                :class="{
                  'bg-gray-200': editor.isActive('heading', { level: 3 }),
                }"
                class="p-1"
              >
                H3
              </button>
              <button
                @click="
                  editor.chain().focus().toggleHeading({ level: 4 }).run()
                "
                :class="{
                  'bg-gray-200': editor.isActive('heading', { level: 4 }),
                }"
                class="p-1"
              >
                H4
              </button>
              <button
                @click="
                  editor.chain().focus().toggleHeading({ level: 5 }).run()
                "
                :class="{
                  'bg-gray-200': editor.isActive('heading', { level: 5 }),
                }"
                class="p-1"
              >
                H5
              </button>
              <button
                @click="
                  editor.chain().focus().toggleHeading({ level: 6 }).run()
                "
                :class="{
                  'bg-gray-200': editor.isActive('heading', { level: 6 }),
                }"
                class="p-1"
              >
                H6
              </button>
              <button
                @click="editor.chain().focus().toggleBulletList().run()"
                :class="{ 'bg-gray-200': editor.isActive('bulletList') }"
                class="p-1"
              >
                Bullet list
              </button>
              <button
                @click="editor.chain().focus().toggleOrderedList().run()"
                :class="{ 'bg-gray-200': editor.isActive('orderedList') }"
                class="p-1"
              >
                Ordered list
              </button>
            </section>
            <editor-content :editor="editor" />
          </div>

          <div class="flex justify-between mt-4">
            <button
              type="submit"
              class="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
            >
              Submit
            </button>
            <button
              type="button"
              class="bg-gray-300 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-400"
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
import Buttons from "../../components/buttons/ButtonCrudDetail.vue";
import { reactive, toRefs, shallowRef } from "vue";
import axios from "axios";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

export default {
  name: "App",
  components: {
    JlDatatable,
    EditorContent,
  },
  setup() {
    const data = reactive({
      url: "http://localhost:8000/api/listdetailnovel",
      columns: [
        {
          label: "ID",
          data: "id",
          searchable: false,
          orderable: false,
        },
        {
          label: "ID novel",
          data: "id_novel",
          orderable: false,
        },
        {
          label: "Chapter",
          data: "chapter_novel",
          searchable: false,
          orderable: false,
        },
        {
          label: "Text",
          data: "text_novel",
          orderable: false,
        },
        {
          label: "Updated at",
          data: "updated_at",
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
      formDetailNovel: {
        id_novel: 0,
        chapter_novel: 0,
        text_novel: "",
      },
    });

    const btnInsert = () => {
      data.showInsertForm = true;
      console.log("btnInsert executed, showInsertForm:", data.showInsertForm);
    };

    const submitInsert = async () => {
      try {
        const response = await axios.post(
          "/api/detailnovel",
          data.formDetailNovel
        );
        console.log(response);
        if (response.data.messege === "Detail Novel Created Succesfully") {
          data.showInsertForm = false;
          console.log("Sukses insert");
          // Reset form
          data.formDetailNovel.id_novel = 0;
          data.formDetailNovel.chapter_novel = 0;
          data.formDetailNovel.text_novel = "";
        } else {
          console.log("Gagal insert");
        }
      } catch (error) {
        console.log("Error di catch saat mencoba insert detail novel", error);
      }
    };

    const editor = useEditor({
      content: "<p>I'm running Tiptap with Vue.js. 🎉</p>",
      extensions: [StarterKit],
      editorProps: {
        attributes: {
          class:
            "border border-gray-300 p-2 w-full min-h-[10rem] max-h-[14rem] outline-none overflow-y-auto",
        },
        transformPastedText(text) {
          return text.toUpperCase();
        },
      },
    });

    return { ...toRefs(data), btnInsert, submitInsert, editor };
  },
};
</script>
