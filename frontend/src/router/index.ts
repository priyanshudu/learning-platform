import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import Chapters from "../views/Chapters.vue";
import SubChapters from "../views/SubChapter.vue";
import Lesson from "../views/Lesson.vue";
import Questions from "../views/Questions.vue";
import Contact from "../views/Contact.vue";
const router = createRouter({

  history: createWebHistory(),

  routes: [

    {
      path: "/",
      component: Home
    },

    {
      path: "/login",
      component: Login
    },

    {
      path: "/register",
      component: Register
    },

    {
      path: "/dashboard",
      component: Dashboard
    },

    {
      path: "/chapters",
      component: Chapters
    },

    {
      path: "/subchapters/:chapter_id",
      component: SubChapters
    },

    {
      path: "/lesson",
      component: Lesson
    },

{
  path: "/questions",
  component: Questions
},
{
  path: "/contact",
  component: Contact
}

  ]

});

export default router;