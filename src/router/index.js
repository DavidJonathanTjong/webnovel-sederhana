import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Pelanggan/HomeView.vue";
import BookmarksView from "../views/Pelanggan/BookmarksView.vue";
import ListNovelView from "../views/Pelanggan/ListNovelView.vue";
import NovelTamatView from "../views/Pelanggan/NovelTamatView.vue";
import DashboardUser from "../views/Admin/DashboardUser.vue";
import DashboardNovel from "../views/Admin/DashboardNovel.vue";
import DashboardDetailNovel from "../views/Admin/DashboardDetailNovel.vue";
import ProfilView from "../views/ProfilView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/daftar-novel",
      name: "daftar-novel",
      component: ListNovelView,
    },
    {
      path: "/novel-tamat",
      name: "novel-tamat",
      component: NovelTamatView,
    },
    {
      path: "/bookmarks",
      name: "bookmarks",
      component: BookmarksView,
    },
    {
      path: "/profil",
      name: "profil",
      component: ProfilView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/dashboarduser",
      name: "dashboarduser",
      component: DashboardUser,
    },
    {
      path: "/dashboard-novel",
      name: "dashboard-novel",
      component: DashboardNovel,
    },
    {
      path: "/dashboard-detailnovel",
      name: "dashboard-detailnovel",
      component: DashboardDetailNovel,
    },
  ],
});

export default router;
