import "./assets/style.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
// import JlDatatable from "jl-datatable";

const app = createApp(App);

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.withCredentials = true;

app.use(router);
// app.component("jl-datatable", JlDatatable);
app.mount("#app");
