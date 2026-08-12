
<template>

  <div class="subchapter-page">

    <!-- ==========================================
         Header
    ========================================== -->

    <header class="header">

      <div class="logo">

        <i class="fa-solid fa-graduation-cap"></i>

        <h2>Learning Platform</h2>

      </div>

      <div class="student-area">

        <span>
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
          @click="logout"
        >
          Logout
        </button>

      </div>

    </header>


    <!-- ==========================================
         Page Banner
    ========================================== -->

    <section class="banner">

      <h1>
        {{ chapterTitle }}
      </h1>

      <p>
        Select a sub chapter to continue learning.
      </p>

    </section>


    <!-- ==========================================
         Search
    ========================================== -->

    <section class="search-section">

      <input
        v-model="searchKeyword"
        type="text"
        placeholder="Search Sub Chapter..."
      >

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
        Loading Sub Chapters...
      </p>

    </div>


    <!-- ==========================================
         No Data
    ========================================== -->

    <div
      v-if="!loading && filteredSubChapters.length === 0"
      class="no-data"
    >

      <i class="fa-solid fa-book-open"></i>

      <h2>
        No Sub Chapters Available
      </h2>

      <p>
        There are no sub chapters available for this chapter.
      </p>

    </div>


    <!-- ==========================================
         Sub Chapter Container
    ========================================== -->

    <section
      v-if="!loading && filteredSubChapters.length > 0"
      class="subchapter-container"
    >

      <div
        v-for="subchapter in filteredSubChapters"
        :key="subchapter.subchapter_id"
        class="subchapter-card"
      >

        <h3>

          {{ subchapter.subchapter_number }}.
          {{ subchapter.subchapter_name }}

        </h3>


        <p>

          Learn this topic carefully before
          attempting the quiz.

        </p>


        <!-- ==========================================
             Sub Chapter Information
        ========================================== -->

        <div class="subchapter-info">

          <span>

            Estimated Time :
            {{ subchapter.estimated_time || 0 }}
            mins

          </span>


          <span
            class="status"
            :class="{
              locked: !subchapter.unlocked,
              completed:
                subchapter.unlocked &&
                subchapter.lesson_completed,
              unlocked:
                subchapter.unlocked &&
                !subchapter.lesson_completed
            }"
          >

            {{
              subchapter.lesson_completed
                ? "Completed"
                : !subchapter.unlocked
                  ? "Locked"
                  : "Ready"
            }}

          </span>

        </div>


        <!-- ==========================================
             Start Button
        ========================================== -->

        <button
          class="start-btn"
          :disabled="!subchapter.unlocked"
          @click="startLearning(subchapter)"
        >

          {{
            !subchapter.unlocked
              ? "Locked"
              : subchapter.lesson_completed
                ? "Review"
                : "Start Learning"
          }}

        </button>

      </div>

    </section>


    <!-- ==========================================
         Bottom Actions
    ========================================== -->

    <section class="bottom-actions">

      <button
        class="back-btn"
        @click="goBack"
      >

        <i class="fa-solid fa-arrow-left"></i>

        Back to Chapters

      </button>

    </section>

  </div>

</template>


<script setup lang="ts">

import {
  ref,
  computed,
  onMounted
} from "vue";

import {
  useRoute,
  useRouter
} from "vue-router";


// ==========================================
// Router
// ==========================================

const router = useRouter();

const route = useRoute();


// ==========================================
// Interfaces
// ==========================================

interface Student {

  full_name: string;

}


interface SubChapter {

  subchapter_id: number;

  subchapter_number: number;

  subchapter_name: string;

  estimated_time?: number;

  unlocked: boolean;

  lesson_completed: boolean;

}


// ==========================================
// Router Parameters
// ==========================================

const chapterId =
  route.params.chapter_id as string;


// ==========================================
// Student Data
// ==========================================

const studentName = ref("Student");


// ==========================================
// Chapter Data
// ==========================================

const chapterTitle = ref("Loading...");

const subChapters = ref<SubChapter[]>([]);


// ==========================================
// Search
// ==========================================

const searchKeyword = ref("");


// ==========================================
// Loading
// ==========================================

const loading = ref(false);


// ==========================================
// Get Storage
// ==========================================

const storage = localStorage.getItem("token")
  ? localStorage
  : sessionStorage;


// ==========================================
// Token
// ==========================================

const token =
  storage.getItem("token");


// ==========================================
// Student
// ==========================================

const studentData =
  storage.getItem("student");

const student: Student | null =
  studentData
    ? JSON.parse(studentData)
    : null;


// ==========================================
// Validate Login
// ==========================================

if (!token || !student) {

  alert("Please login first.");

  router.push("/login");

}


// ==========================================
// Show Student Name
// ==========================================

if (student) {

  studentName.value =
    student.full_name;

}


// ==========================================
// Validate Chapter
// ==========================================

if (!chapterId) {

  alert("Invalid Chapter.");

  router.push("/chapters");

}


// ==========================================
// Filtered Sub Chapters
// ==========================================

const filteredSubChapters = computed(() => {

  const keyword =
    searchKeyword.value
      .toLowerCase()
      .trim();

  if (!keyword) {

    return subChapters.value;

  }

  return subChapters.value.filter(
    (subchapter) =>
      subchapter.subchapter_name
        .toLowerCase()
        .includes(keyword)
  );

});


// ==========================================
// Load Sub Chapters
// ==========================================

const loadSubChapters = async () => {

  if (!token || !chapterId) {

    return;

  }


  try {

    loading.value = true;


    // ==========================================
    // Sub Chapter API
    // ==========================================

    const response =
      await fetch(

        `http://localhost:3000/api/subchapters/chapter/${chapterId}`,

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
    // API Error
    // ==========================================

    if (!data.success) {

      alert(data.message);

      return;

    }


    // ==========================================
    // Chapter Title
    // ==========================================

    chapterTitle.value =
      data.chapter.chapter_name;


    // ==========================================
    // Sub Chapters
    // ==========================================

    subChapters.value =
      data.subchapters;

  }

  catch (error) {

    console.error(error);

    alert(
      "Unable to load sub chapters."
    );

  }

  finally {

    loading.value = false;

  }

};


// ==========================================
// Start Learning
// ==========================================

const startLearning = (
  subchapter: SubChapter
) => {

  // ==========================================
  // Check Locked
  // ==========================================

  if (!subchapter.unlocked) {

    return;

  }


  // ==========================================
  // Navigate To Lesson
  // ==========================================

  router.push({

    path: "/lesson",

    query: {

      subchapter_id:
        subchapter.subchapter_id

    }

  });

};


// ==========================================
// Dashboard
// ==========================================

const goToDashboard = () => {

  router.push("/dashboard");

};


// ==========================================
// Back To Chapters
// ==========================================

const goBack = () => {

  router.push("/chapters");

};


// ==========================================
// Logout
// ==========================================

const logout = () => {

  const confirmLogout =
    confirm(
      "Are you sure you want to logout?"
    );


  if (!confirmLogout) {

    return;

  }


  // ==========================================
  // Remove Local Storage
  // ==========================================

  localStorage.removeItem("token");

  localStorage.removeItem("student");


  // ==========================================
  // Remove Session Storage
  // ==========================================

  sessionStorage.removeItem("token");

  sessionStorage.removeItem("student");


  // ==========================================
  // Redirect
  // ==========================================

  router.push("/login");

};


// ==========================================
// Initial Load
// ==========================================

onMounted(() => {

  loadSubChapters();

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


.subchapter-page {

  min-height: 100vh;

  background: #f4f7fb;

  color: #222;

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
    0 2px 10px rgba(0,0,0,.08);

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

  font-size: 24px;

  color: #1e3a8a;

}


.student-area {

  display: flex;

  align-items: center;

  gap: 15px;

}


.student-area span {

  font-weight: 600;

  color: #1e293b;

}


.student-area button {

  border: none;

  padding: 10px 18px;

  border-radius: 8px;

  cursor: pointer;

  transition: .3s;

  font-size: 14px;

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
   Banner
========================================== */

.banner {

  width: 84%;

  margin: 35px auto;

  background:
    linear-gradient(
      135deg,
      #2563eb,
      #1d4ed8
    );

  color: white;

  padding: 35px;

  border-radius: 18px;

}


.banner h1 {

  font-size: 34px;

  margin-bottom: 10px;

}


.banner p {

  opacity: .9;

  font-size: 16px;

}


/* ==========================================
   Search
========================================== */

.search-section {

  width: 84%;

  margin: 25px auto;

}


.search-section input {

  width: 100%;

  padding: 14px 18px;

  border: 1px solid #d1d5db;

  border-radius: 10px;

  font-size: 15px;

  outline: none;

}


.search-section input:focus {

  border-color: #2563eb;

}


/* ==========================================
   Loading
========================================== */

.loading {

  width: 84%;

  margin: 40px auto;

  text-align: center;

  font-size: 18px;

  font-weight: 600;

  color: #2563eb;

}


.loading i {

  font-size: 35px;

  margin-bottom: 15px;

}


/* ==========================================
   No Data
========================================== */

.no-data {

  width: 84%;

  margin: 40px auto;

  text-align: center;

  padding: 40px;

  background: #ffffff;

  border-radius: 15px;

  box-shadow:
    0 5px 20px rgba(0,0,0,.08);

}


.no-data i {

  font-size: 55px;

  color: #2563eb;

  margin-bottom: 20px;

}


.no-data h2 {

  color: #64748b;

  margin-bottom: 10px;

}


.no-data p {

  color: #64748b;

}


/* ==========================================
   Sub Chapter Container
========================================== */

.subchapter-container {

  width: 84%;

  margin: 35px auto;

  display: grid;

  grid-template-columns:
    repeat(
      auto-fill,
      minmax(320px,1fr)
    );

  gap: 25px;

}


/* ==========================================
   Sub Chapter Card
========================================== */

.subchapter-card {

  background: #ffffff;

  border-radius: 18px;

  padding: 25px;

  box-shadow:
    0 8px 25px rgba(0,0,0,.08);

  transition: .3s;

  display: flex;

  flex-direction: column;

  gap: 18px;

}


.subchapter-card:hover {

  transform:
    translateY(-6px);

  box-shadow:
    0 12px 30px
    rgba(37,99,235,.18);

}


.subchapter-card h3 {

  font-size: 22px;

  color: #1e3a8a;

}


.subchapter-card p {

  color: #64748b;

  line-height: 1.6;

  font-size: 15px;

}


/* ==========================================
   Sub Chapter Info
========================================== */

.subchapter-info {

  display: flex;

  justify-content: space-between;

  align-items: center;

  padding-top: 10px;

  border-top:
    1px solid #e5e7eb;

}


.subchapter-info span {

  font-size: 14px;

  color: #475569;

}


.status {

  font-weight: 600;

}


.status.locked {

  color: #ef4444;

}


.status.unlocked {

  color: #16a34a;

}


.status.completed {

  color: #2563eb;

}


/* ==========================================
   Action Button
========================================== */

.start-btn {

  width: 100%;

  padding: 14px;

  border: none;

  border-radius: 10px;

  background: #2563eb;

  color: #ffffff;

  font-size: 15px;

  font-weight: 600;

  cursor: pointer;

  transition: .3s;

}


.start-btn:hover {

  background: #1d4ed8;

}


.start-btn:disabled {

  background: #cbd5e1;

  cursor: not-allowed;

}


/* ==========================================
   Bottom Actions
========================================== */

.bottom-actions {

  width: 84%;

  margin: 40px auto;

  display: flex;

  justify-content: flex-start;

}


.back-btn {

  padding: 12px 24px;

  border: none;

  border-radius: 10px;

  background: #334155;

  color: #ffffff;

  font-size: 15px;

  cursor: pointer;

  transition: .3s;

}


.back-btn:hover {

  background: #1e293b;

}


/* ==========================================
   Responsive Design
========================================== */

@media (max-width: 992px) {

  .header {

    flex-direction: column;

    gap: 18px;

    text-align: center;

  }


  .student-area {

    flex-wrap: wrap;

    justify-content: center;

  }


  .banner,
  .search-section,
  .subchapter-container,
  .bottom-actions,
  .loading,
  .no-data {

    width: 92%;

  }

}


@media (max-width: 768px) {

  .banner h1 {

    font-size: 28px;

  }


  .banner p {

    font-size: 14px;

  }


  .subchapter-container {

    grid-template-columns: 1fr;

  }


  .subchapter-card {

    padding: 20px;

  }

}


@media (max-width: 480px) {

  .logo h2 {

    font-size: 20px;

  }


  .student-area {

    flex-direction: column;

    width: 100%;

  }


  .student-area button {

    width: 100%;

  }


  .banner {

    padding: 25px;

  }


  .banner h1 {

    font-size: 24px;

  }


  .search-section input {

    font-size: 14px;

  }


  .back-btn,
  .start-btn {

    width: 100%;

  }

}

</style>
