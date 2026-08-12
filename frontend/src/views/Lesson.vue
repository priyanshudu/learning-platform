<template>

  <div class="lesson-page">

    <!-- ==========================================
         Mobile Menu
    ========================================== -->

    <button
      class="menu-btn"
      @click="toggleMenu"
    >
      <i class="fa-solid fa-bars"></i>
    </button>


    <div
      v-if="menuOpen"
      class="overlay"
      @click="closeMenu"
    ></div>


    <!-- ==========================================
         Sidebar
    ========================================== -->

    <aside
      class="sidebar"
      :class="{ active: menuOpen }"
    >

      <div class="logo">

        <i class="fa-solid fa-graduation-cap"></i>

        <h2>
          Learning Platform
        </h2>

      </div>


      <ul class="menu">

        <li>

          <a
            href="#"
            @click.prevent="goToDashboard"
          >

            <i class="fa-solid fa-house"></i>

            Dashboard

          </a>

        </li>


        <li>

          <a
            href="#"
            @click.prevent="goToChapters"
          >

            <i class="fa-solid fa-book"></i>

            Chapters

          </a>

        </li>


        <li>

          <a
            href="#"
            @click.prevent="goBack"
          >

            <i class="fa-solid fa-book-open"></i>

            Sub Chapters

          </a>

        </li>


        <li class="active">

          <a href="#">

            <i class="fa-solid fa-video"></i>

            Lesson

          </a>

        </li>


        <li>

          <a href="#">

            <i class="fa-solid fa-user"></i>

            Profile

          </a>

        </li>


        <li>

          <a href="#">

            <i class="fa-solid fa-envelope"></i>

            Contact

          </a>

        </li>

      </ul>


      <!-- Logout -->

      <button
        class="logout-btn"
        @click="logout"
      >

        <i class="fa-solid fa-right-from-bracket"></i>

        Logout

      </button>

    </aside>


    <!-- ==========================================
         Main Content
    ========================================== -->

    <main class="main">


      <!-- ==========================================
           Lesson Header
      ========================================== -->

      <div class="lesson-header">

        <div>

          <h1>

            {{ lessonTitle }}

          </h1>


          <p>

            {{ chapterInfo }}

          </p>

        </div>


        <div class="lesson-time">

          <i class="fa-regular fa-clock"></i>

          <span>

            {{ estimatedTime }} Minutes

          </span>

        </div>

      </div>


      <!-- ==========================================
           Loading
      ========================================== -->

      <div
        v-if="loading"
        class="loading"
      >

        <i class="fa-solid fa-spinner fa-spin"></i>

        <p>
          Loading lesson...
        </p>

      </div>


      <!-- ==========================================
           Lesson Content
      ========================================== -->

      <div
        v-if="!loading"
        class="lesson-card"
      >

        <h2>
          Lesson Content
        </h2>


        <div
          id="lessonContent"
          v-html="lessonContent"
        ></div>

      </div>


      <!-- ==========================================
           Video
      ========================================== -->

      <div
        v-if="!loading && videoPath"
        class="lesson-card"
      >

        <h2>
          Lesson Video
        </h2>


        <video
          controls
          width="100%"
        >

          <source
            :src="videoPath"
            type="video/mp4"
          >

          Your browser does not support
          the video tag.

        </video>

      </div>


      <!-- ==========================================
           Audio
      ========================================== -->

      <div
        v-if="!loading && audioPath"
        class="lesson-card"
      >

        <h2>
          Lesson Audio
        </h2>


        <audio
          controls
        >

          <source
            :src="audioPath"
            type="audio/mpeg"
          >

          Your browser does not support
          the audio element.

        </audio>

      </div>


      <!-- ==========================================
           PDF
      ========================================== -->

      <div
        v-if="!loading && pdfPath"
        class="lesson-card"
      >

        <h2>
          PDF Notes
        </h2>


        <a
          :href="pdfPath"
          target="_blank"
          class="download-btn"
        >

          <i class="fa-solid fa-file-pdf"></i>

          Download PDF

        </a>

      </div>


      <!-- ==========================================
           Navigation
      ========================================== -->

      <div class="lesson-navigation">

        <button
          class="secondary-btn"
          @click="goBack"
        >

          <i class="fa-solid fa-arrow-left"></i>

          Previous

        </button>


        <button
          class="primary-btn"
          @click="goToQuiz"
        >

          Next

          <i class="fa-solid fa-arrow-right"></i>

        </button>

      </div>


      <!-- ==========================================
           Start Quiz
      ========================================== -->

      <div class="finish-section">

        <button
          class="quiz-btn"
          @click="goToQuiz"
        >

          <i class="fa-solid fa-circle-question"></i>

          Start Quiz

        </button>

      </div>


    </main>

  </div>

</template>


<script setup lang="ts">

import {
  ref,
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
// Router Parameter
// ==========================================

const subchapterId =
  route.query.subchapter_id as string;


// ==========================================
// Lesson Data
// ==========================================

const lessonTitle =
  ref("Lesson Title");

const chapterInfo =
  ref("Chapter → Sub Chapter");

const estimatedTime =
  ref(0);

const lessonContent =
  ref("<p>Loading lesson...</p>");

const videoPath =
  ref("");

const audioPath =
  ref("");

const pdfPath =
  ref("");

const loading =
  ref(false);


// ==========================================
// Mobile Menu
// ==========================================

const menuOpen =
  ref(false);


const toggleMenu = () => {

  menuOpen.value =
    !menuOpen.value;

};


const closeMenu = () => {

  menuOpen.value =
    false;

};


// ==========================================
// Storage
// ==========================================

const storage =
  localStorage.getItem("token")
    ? localStorage
    : sessionStorage;


const token =
  storage.getItem("token");


const studentData =
  storage.getItem("student");


// ==========================================
// Authentication
// ==========================================

if (!token || !studentData) {

  alert("Please login first.");

  router.push("/login");

}


// ==========================================
// Validate Sub Chapter
// ==========================================

if (!subchapterId) {

  alert("Invalid Sub Chapter.");

  router.push("/chapters");

}


// ==========================================
// Load Lesson
// ==========================================

const loadLesson = async () => {

  if (!token || !subchapterId) {

    return;

  }


  loading.value = true;


  try {

    //console.log(
      //"Loading lesson for subchapter:",
      //subchapterId
    //);


    const response =
      await fetch(

        `http://localhost:3000/api/subchapters/${subchapterId}`,

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


    //console.log(
      //"Lesson API response:",
      //data
    //);


    if (!data.success) {

      alert(data.message);

      return;

    }


    // ==========================================
    // Get Sub Chapter
    // ==========================================

    const subChapter =
      data.subChapter;


    // ==========================================
    // Lesson Title
    // ==========================================

    lessonTitle.value =
      subChapter.subchapter_name;


    // ==========================================
    // Chapter Information
    // ==========================================

    chapterInfo.value =
      `Chapter ${subChapter.chapter_id} → ${subChapter.subchapter_name}`;


    // ==========================================
    // Estimated Time
    // ==========================================

    estimatedTime.value =
      subChapter.estimated_time || 0;


    // ==========================================
    // Lesson Content
    // ==========================================

    lessonContent.value =
      subChapter.content ||

      "<p>No lesson content available.</p>";


    // ==========================================
    // Video
    // ==========================================

    videoPath.value =
      subChapter.video_path || "";


    //console.log(
      //"Video:",
      //videoPath.value
    //);


    // ==========================================
    // Audio
    // ==========================================

    audioPath.value =
      subChapter.audio_path || "";


    //console.log(
      //"Audio:",
      //audioPath.value
    //);


    // ==========================================
    // PDF
    // ==========================================

    pdfPath.value =
      subChapter.pdf_path || "";


    //console.log(
      //"PDF:",
      //pdfPath.value
    //);

  }

  catch (error) {

    console.error(
      "Lesson loading error:",
      error
    );


    alert(
      "Unable to load lesson."
    );

  }

  finally {

    loading.value =
      false;

  }

};


// ==========================================
// Dashboard
// ==========================================

const goToDashboard = () => {

  closeMenu();

  router.push("/dashboard");

};


// ==========================================
// Chapters
// ==========================================

const goToChapters = () => {

  closeMenu();

  router.push("/chapters");

};


// ==========================================
// Back To Sub Chapters
// ==========================================

const goBack = () => {

  router.back();

};


// ==========================================
// Quiz
// ==========================================

const goToQuiz = () => {

  router.push({

    path: "/questions",

    query: {

      subchapter_id:
        subchapterId

    }

  });

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


  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "student"
  );


  sessionStorage.removeItem(
    "token"
  );

  sessionStorage.removeItem(
    "student"
  );


  router.push("/login");

};


// ==========================================
// Initial Load
// ==========================================

onMounted(() => {

  loadLesson();

});

</script>


<style scoped>

/* ==========================================
   Reset
========================================== */

* {

  margin: 0;

  padding: 0;

  box-sizing: border-box;

  font-family:
    "Poppins",
    sans-serif;

}


body {

  margin: 0;

}


/* ==========================================
   Page
========================================== */

.lesson-page {

  min-height: 100vh;

  background: #f4f7fb;

  color: #333;

}


/* ==========================================
   Sidebar
========================================== */

.sidebar {

  width: 260px;

  background: #1e293b;

  color: #fff;

  position: fixed;

  top: 0;

  left: 0;

  bottom: 0;

  display: flex;

  flex-direction: column;

  padding: 25px 20px;

  overflow-y: auto;

  z-index: 1000;

}


.logo {

  display: flex;

  align-items: center;

  gap: 12px;

  margin-bottom: 35px;

}


.logo i {

  font-size: 30px;

  color: #38bdf8;

}


.logo h2 {

  font-size: 22px;

  font-weight: 600;

}


.menu {

  list-style: none;

  flex: 1;

  padding: 0;

}


.menu li {

  margin-bottom: 12px;

}


.menu a {

  display: flex;

  align-items: center;

  gap: 12px;

  text-decoration: none;

  color: #cbd5e1;

  padding: 12px 15px;

  border-radius: 10px;

  transition: .3s;

}


.menu a:hover,
.menu .active a {

  background: #38bdf8;

  color: #fff;

}


.logout-btn {

  border: none;

  padding: 13px;

  border-radius: 10px;

  background: #ef4444;

  color: #fff;

  cursor: pointer;

  font-size: 15px;

}


.logout-btn:hover {

  background: #dc2626;

}


/* ==========================================
   Main
========================================== */

.main {

  margin-left: 260px;

  padding: 35px;

  min-height: 100vh;

}


/* ==========================================
   Header
========================================== */

.lesson-header {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 30px;

}


.lesson-header h1 {

  font-size: 32px;

  margin-bottom: 8px;

}


.lesson-header p {

  color: #64748b;

}


.lesson-time {

  display: flex;

  align-items: center;

  gap: 10px;

  background: #fff;

  padding: 14px 20px;

  border-radius: 10px;

  font-weight: 500;

  box-shadow:
    0 5px 12px
    rgba(0,0,0,.08);

}


/* ==========================================
   Loading
========================================== */

.loading {

  text-align: center;

  padding: 60px;

  font-size: 18px;

  color: #2563eb;

}


.loading i {

  font-size: 35px;

  margin-bottom: 15px;

}


/* ==========================================
   Cards
========================================== */

.lesson-card {

  background: #fff;

  border-radius: 14px;

  padding: 25px;

  margin-bottom: 25px;

  box-shadow:
    0 5px 15px
    rgba(0,0,0,.08);

}


.lesson-card h2 {

  margin-bottom: 18px;

  color: #1e293b;

}


/* ==========================================
   Lesson Content
========================================== */

#lessonContent {

  line-height: 1.8;

  font-size: 16px;

}


#lessonContent :deep(h1),
#lessonContent :deep(h2),
#lessonContent :deep(h3) {

  margin: 20px 0 12px;

}


#lessonContent :deep(p) {

  margin-bottom: 15px;

}


#lessonContent :deep(ul),
#lessonContent :deep(ol) {

  margin-left: 25px;

  margin-bottom: 15px;

}


#lessonContent :deep(code) {

  background: #eef2ff;

  padding: 3px 6px;

  border-radius: 5px;

}


/* ==========================================
   Media
========================================== */

video,
audio {

  width: 100%;

  border-radius: 12px;

}


audio {

  display: block;

}


/* ==========================================
   Download
========================================== */

.download-btn {

  display: inline-flex;

  align-items: center;

  gap: 10px;

  background: #2563eb;

  color: #fff;

  text-decoration: none;

  padding: 12px 20px;

  border-radius: 10px;

  transition: .3s;

}


.download-btn:hover {

  background: #1d4ed8;

}


/* ==========================================
   Navigation
========================================== */

.lesson-navigation {

  display: flex;

  justify-content: space-between;

  margin: 35px 0;

}


.primary-btn,
.secondary-btn,
.quiz-btn {

  border: none;

  cursor: pointer;

  border-radius: 10px;

  padding: 13px 25px;

  font-size: 15px;

  font-weight: 500;

  transition: .3s;

}


.primary-btn {

  background: #2563eb;

  color: #fff;

}


.primary-btn:hover {

  background: #1d4ed8;

}


.secondary-btn {

  background: #e2e8f0;

  color: #334155;

}


.secondary-btn:hover {

  background: #cbd5e1;

}


/* ==========================================
   Quiz
========================================== */

.finish-section {

  text-align: center;

  margin: 40px 0;

}


.quiz-btn {

  background: #10b981;

  color: #fff;

  font-size: 17px;

  padding: 15px 35px;

}


.quiz-btn:hover {

  background: #059669;

}


/* ==========================================
   Mobile Menu
========================================== */

.menu-btn {

  display: none;

}


.overlay {

  display: none;

}


/* ==========================================
   Responsive
========================================== */

@media (max-width: 900px) {

  .sidebar {

    transform:
      translateX(-100%);

    transition: .3s;

  }


  .sidebar.active {

    transform:
      translateX(0);

  }


  .main {

    margin-left: 0;

    padding: 20px;

  }


  .lesson-header {

    flex-direction: column;

    align-items: flex-start;

    gap: 20px;

  }


  .lesson-navigation {

    flex-direction: column;

    gap: 15px;

  }


  .menu-btn {

    display: block;

    position: fixed;

    top: 18px;

    left: 18px;

    z-index: 1100;

    border: none;

    background: #2563eb;

    color: #fff;

    width: 48px;

    height: 48px;

    border-radius: 10px;

    cursor: pointer;

  }


  .overlay {

    display: block;

    position: fixed;

    inset: 0;

    background:
      rgba(0,0,0,.5);

    z-index: 900;

  }

}


@media (max-width: 480px) {

  .lesson-header h1 {

    font-size: 25px;

  }


  .main {

    padding: 15px;

  }


  .lesson-card {

    padding: 18px;

  }


  .primary-btn,
  .secondary-btn,
  .quiz-btn {

    width: 100%;

  }

}

</style>