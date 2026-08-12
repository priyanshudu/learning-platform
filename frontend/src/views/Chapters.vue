
<template>

  <div class="chapters-page">

    <!-- ==========================================
         Header
    ========================================== -->

    <header class="header">

      <div class="logo">

        <i class="fa-solid fa-graduation-cap"></i>

        <h2>
          Learning Platform
        </h2>

      </div>


      <div class="header-right">

        <span id="studentName">

          {{ studentName }}

        </span>


        <button
          id="dashboardBtn"
          @click="goToDashboard"
        >

          Dashboard

        </button>


        <button
          id="logoutBtn"
          @click="handleLogout"
        >

          Logout

        </button>

      </div>

    </header>


    <!-- ==========================================
         Page Title
    ========================================== -->

    <section class="page-title">

      <h1>

        Computer Science Chapters

      </h1>


      <p>

        Select a chapter to begin your learning journey.

      </p>

    </section>


    <!-- ==========================================
         Search Section
    ========================================== -->

    <section class="search-section">

      <input
        v-model="searchValue"
        type="text"
        id="searchChapter"
        placeholder="Search chapter..."
      />

    </section>


    <!-- ==========================================
         Chapters
    ========================================== -->

    <section class="chapters-section">

      <div
        class="chapters-container"
      >

        <!-- ==========================================
             Chapter Cards
        ========================================== -->

        <div
          v-for="chapter in filteredChapters"
          :key="chapter.chapter_id"
          class="chapter-card"
        >

          <h3>

            {{ chapter.chapter_name }}

          </h3>


          <p>

            {{ chapter.description }}

          </p>


          <div class="chapter-info">

            <span>

              <strong>
                Code:
              </strong>

              {{ chapter.chapter_code }}

            </span>


            <span>

              <strong>
                Lessons:
              </strong>

              {{ chapter.total_lessons }}

            </span>

          </div>


          <button
            class="chapter-btn"
            @click="startLearning(chapter.chapter_id)"
          >

            Start Learning

          </button>

        </div>

      </div>

    </section>


    <!-- ==========================================
         Loading
    ========================================== -->

    <div
      v-if="loading"
      class="loading"
    >

      <i class="fa-solid fa-spinner fa-spin"></i>


      <p>

        Loading Chapters...

      </p>

    </div>


    <!-- ==========================================
         No Chapters
    ========================================== -->

    <div
      v-if="!loading && filteredChapters.length === 0"
      class="no-chapters"
    >

      <i class="fa-solid fa-book-open"></i>


      <h2>

        No Chapters Found

      </h2>


      <p>

        There are no chapters available at the moment.

      </p>

    </div>


    <!-- ==========================================
         Footer
    ========================================== -->

    <footer>

      <p>

        © 2026 Learning Platform. All Rights Reserved.

      </p>

    </footer>

  </div>

</template>


<script setup lang="ts">

import {
  ref,
  computed,
  onMounted
} from "vue";

import {
  useRouter
} from "vue-router";


// ==========================================
// Router
// ==========================================

const router = useRouter();


// ==========================================
// Form / Page Data
// ==========================================

const studentName = ref("Student");

const searchValue = ref("");

const loading = ref(false);


// ==========================================
// Chapter Interface
// ==========================================

interface Chapter {

  chapter_id: number;

  chapter_name: string;

  description: string;

  chapter_code: string;

  total_lessons: number;

}


// ==========================================
// Chapters
// ==========================================

const chapters = ref<Chapter[]>([]);


// ==========================================
// Storage
// ==========================================

const storage = localStorage.getItem("token")
  ? localStorage
  : sessionStorage;


const token = storage.getItem("token");

const studentData =
  storage.getItem("student");


// ==========================================
// Check Login
// ==========================================

if (!token || !studentData) {

  alert("Please login first.");

  router.push("/login");

}


// ==========================================
// Load Student Name
// ==========================================

if (studentData) {

  try {

    const student =
      JSON.parse(studentData);

    studentName.value =
      student.full_name;

  }

  catch (error) {

    console.error(
      "Unable to read student data.",
      error
    );

  }

}


// ==========================================
// Filter Chapters
// ==========================================

const filteredChapters = computed(() => {

  const value =
    searchValue.value
      .toLowerCase()
      .trim();


  if (value === "") {

    return chapters.value;

  }


  return chapters.value.filter(
    (chapter) =>
      chapter.chapter_name
        .toLowerCase()
        .includes(value)
  );

});


// ==========================================
// Load Chapters
// ==========================================

const loadChapters = async () => {

  if (!token) {

    return;

  }


  loading.value = true;


  try {

    // ==========================================
    // Chapters API
    // ==========================================

    const response = await fetch(

      "http://localhost:3000/api/chapters",

      {

        method: "GET",

        headers: {

          Authorization:
            `Bearer ${token}`

        }

      }

    );


    const data =
      await response.json();


    // ==========================================
    // Validate Response
    // ==========================================

    if (!data.success) {

      alert(data.message);

      return;

    }


    // ==========================================
    // Load Chapters
    // ==========================================

    chapters.value =
      data.chapters;

  }

  catch (error) {

    console.error(error);

    alert(
      "Unable to load chapters."
    );

  }

  finally {

    loading.value = false;

  }

};


// ==========================================
// Dashboard
// ==========================================

const goToDashboard = () => {

  router.push("/dashboard");

};


// ==========================================
// Start Learning
// ==========================================

const startLearning = (
  chapterId: number
) => {

  router.push(
    `/subchapters/${chapterId}`
  );

};


// ==========================================
// Logout
// ==========================================

const handleLogout = () => {

  const confirmLogout =
    confirm(
      "Are you sure you want to logout?"
    );


  if (!confirmLogout) {

    return;

  }


  // ==========================================
  // Remove Login Session
  // ==========================================

  localStorage.removeItem("token");

  localStorage.removeItem("student");

  sessionStorage.removeItem("token");

  sessionStorage.removeItem("student");


  // ==========================================
  // Success Message
  // ==========================================

  alert(
    "Logged out successfully."
  );


  // ==========================================
  // Go To Login
  // ==========================================

  router.push("/login");

};


// ==========================================
// Load Chapters On Page Load
// ==========================================

onMounted(() => {

  loadChapters();

});

</script>


<style scoped>

/* ==========================================
   Google Font & Reset
========================================== */

* {

  margin: 0;

  padding: 0;

  box-sizing: border-box;

  font-family: "Poppins", sans-serif;

}


.chapters-page {

  min-height: 100vh;

  background: #f5f7fb;

  color: #333;

}


/* ==========================================
   Header
========================================== */

.header {

  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: 18px 8%;

  background: #ffffff;

  box-shadow:
    0 2px 10px rgba(0,0,0,0.08);

  position: sticky;

  top: 0;

  z-index: 100;

}


.logo {

  display: flex;

  align-items: center;

  gap: 12px;

}


.logo i {

  font-size: 30px;

  color: #2563eb;

}


.logo h2 {

  color: #2563eb;

  font-size: 24px;

}


.header-right {

  display: flex;

  align-items: center;

  gap: 15px;

}


#studentName {

  font-weight: 600;

  color: #444;

}


.header-right button {

  border: none;

  padding: 10px 20px;

  border-radius: 8px;

  cursor: pointer;

  font-size: 15px;

  transition: 0.3s;

}


#dashboardBtn {

  background: #2563eb;

  color: white;

}


#dashboardBtn:hover {

  background: #1d4ed8;

}


#logoutBtn {

  background: #ef4444;

  color: white;

}


#logoutBtn:hover {

  background: #dc2626;

}


/* ==========================================
   Page Title
========================================== */

.page-title {

  text-align: center;

  padding: 60px 20px 30px;

}


.page-title h1 {

  font-size: 38px;

  color: #1e3a8a;

  margin-bottom: 15px;

}


.page-title p {

  color: #666;

  font-size: 17px;

}


/* ==========================================
   Search Section
========================================== */

.search-section {

  width: 90%;

  max-width: 1200px;

  margin: 0 auto 40px;

  display: flex;

  justify-content: center;

}


#searchChapter {

  width: 100%;

  max-width: 500px;

  padding: 14px 20px;

  border: 1px solid #d1d5db;

  border-radius: 10px;

  outline: none;

  font-size: 16px;

  transition: 0.3s;

}


#searchChapter:focus {

  border-color: #2563eb;

  box-shadow:
    0 0 8px
    rgba(37, 99, 235, 0.25);

}


/* ==========================================
   Chapters Section
========================================== */

.chapters-section {

  width: 90%;

  max-width: 1200px;

  margin: auto;

  padding-bottom: 60px;

}


.chapters-container {

  display: grid;

  grid-template-columns:
    repeat(
      auto-fit,
      minmax(300px, 1fr)
    );

  gap: 25px;

}


/* ==========================================
   Chapter Card
========================================== */

.chapter-card {

  background: #ffffff;

  border-radius: 12px;

  padding: 25px;

  box-shadow:
    0 5px 15px
    rgba(0, 0, 0, 0.08);

  transition: 0.3s;

}


.chapter-card:hover {

  transform:
    translateY(-6px);

  box-shadow:
    0 10px 25px
    rgba(0, 0, 0, 0.15);

}


.chapter-card h3 {

  color: #1e3a8a;

  margin-bottom: 15px;

  font-size: 22px;

}


.chapter-card p {

  color: #555;

  line-height: 1.7;

  margin-bottom: 12px;

}


.chapter-info {

  margin-top: 15px;

}


.chapter-info span {

  display: block;

  margin-bottom: 8px;

  color: #666;

  font-size: 15px;

}


/* ==========================================
   Chapter Button
========================================== */

.chapter-btn {

  width: 100%;

  margin-top: 20px;

  padding: 12px;

  border: none;

  border-radius: 8px;

  background: #2563eb;

  color: #ffffff;

  font-size: 15px;

  font-weight: 600;

  cursor: pointer;

  transition: 0.3s;

}


.chapter-btn:hover {

  background: #1d4ed8;

}


/* ==========================================
   Loading
========================================== */

.loading {

  text-align: center;

  padding: 60px 20px;

  color: #2563eb;

}


.loading i {

  font-size: 40px;

  margin-bottom: 15px;

}


.loading p {

  font-size: 18px;

  font-weight: 500;

}


/* ==========================================
   No Chapters
========================================== */

.no-chapters {

  text-align: center;

  padding: 60px 20px;

  color: #666;

}


.no-chapters i {

  font-size: 60px;

  color: #2563eb;

  margin-bottom: 20px;

}


.no-chapters h2 {

  margin-bottom: 10px;

  color: #1e3a8a;

}


.no-chapters p {

  font-size: 16px;

}


/* ==========================================
   Footer
========================================== */

footer {

  background: #1e3a8a;

  color: white;

  text-align: center;

  padding: 20px;

  margin-top: 50px;

}


/* ==========================================
   Responsive Design
========================================== */

@media (max-width: 768px) {

  .header {

    flex-direction: column;

    gap: 20px;

    padding: 20px;

  }


  .header-right {

    flex-wrap: wrap;

    justify-content: center;

  }


  .page-title h1 {

    font-size: 30px;

  }


  .chapters-container {

    grid-template-columns: 1fr;

  }

}


@media (max-width: 480px) {

  .page-title h1 {

    font-size: 26px;

  }


  #searchChapter {

    font-size: 14px;

  }


  .chapter-card {

    padding: 20px;

  }


  .chapter-card h3 {

    font-size: 20px;

  }

}

</style>
