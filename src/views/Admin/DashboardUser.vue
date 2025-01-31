<template>
  <section class="bg-gray-50 dark:bg-gray-900 h-[125vh]">
    <div class="container mt-2 border bg-white">
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
  </section>
</template>

<script>
import JlDatatable from "jl-datatable";
import Buttons from "../../components/buttons/ButtonCrudUser.vue";
import { reactive, toRefs, shallowRef } from "vue";
export default {
  name: "App",
  components: {
    JlDatatable,
  },
  setup() {
    const data = reactive({
      url: "http://localhost:8000/api/users",
      columns: [
        {
          label: "ID",
          data: "id",
          searchable: false,
          orderable: false,
        },
        {
          label: "Name",
          data: "name",
          orderable: false,
        },
        {
          label: "Email",
          data: "email",
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
    });

    return { ...toRefs(data) };
  },
};
</script>
