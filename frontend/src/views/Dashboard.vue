
<template>
  <div class="dashboard-container">

    <!-- ==========================================
         Sidebar
    ========================================== -->

    <aside class="sidebar">

      <div class="logo">

        <i class="fa-solid fa-graduation-cap"></i>

        <div>

          <h2>Learning</h2>

          <h2>Platform</h2>

        </div>

      </div>


      <nav class="sidebar-menu">

        <router-link
          to="/dashboard"
          class="active"
        >

          <i class="fa-solid fa-house"></i>

          <span>Dashboard</span>

        </router-link>


        <router-link to="/chapters">

          <i class="fa-solid fa-book"></i>

          <span>Chapters</span>

        </router-link>


        <router-link to="/profile">

          <i class="fa-solid fa-user"></i>

          <span>My Profile</span>

        </router-link>


        <router-link to="/contact">

          <i class="fa-solid fa-envelope"></i>

          <span>Contact</span>

        </router-link>


        <a
          href="#"
          @click.prevent="logout"
        >

          <i class="fa-solid fa-right-from-bracket"></i>

          <span>Logout</span>

        </a>

      </nav>

    </aside>


    <!-- ==========================================
         Main Content
    ========================================== -->

    <main class="main-content">


      <!-- ==========================================
           Header
      ========================================== -->

      <header class="topbar">

        <div class="welcome">

          <h1>

            Welcome,

            <span>
              {{ studentName }}
            </span>

            👋

          </h1>

          <p>

            Continue your learning journey.

          </p>

        </div>


        <div class="profile-icon">

          <i class="fa-solid fa-user-graduate"></i>

        </div>

      </header>


      <!-- ==========================================
           Student Information
      ========================================== -->

      <section class="dashboard-grid">

        <section class="card">

          <div class="card-header">

            <h2>

              Student Information

            </h2>

          </div>


          <div class="card-body">


            <div class="info-row">

              <span>

                Student Code

              </span>

              <strong>

                {{ studentCode }}

              </strong>

            </div>


            <div class="info-row">

              <span>

                Full Name

              </span>

              <strong>

                {{ fullName }}

              </strong>

            </div>


            <div class="info-row">

              <span>

                Email

              </span>

              <strong>

                {{ email }}

              </strong>

            </div>


            <div class="info-row">

              <span>

                College

              </span>

              <strong>

                {{ college }}

              </strong>

            </div>


            <div class="info-row">

              <span>

                Education

              </span>

              <strong>

                {{ education }}

              </strong>

            </div>


          </div>

        </section>

      </section>


    </main>

  </div>
</template>


<script setup lang="ts">

import { ref, onMounted } from "vue";

import { useRouter } from "vue-router";


// ==========================================
// Router
// ==========================================

const router = useRouter();


// ==========================================
// Student Data
// ==========================================

const studentName = ref("Student");

const studentCode = ref("-");

const fullName = ref("-");

const email = ref("-");

const college = ref("-");

const education = ref("-");


// ==========================================
// Check Student Login
// ==========================================

const checkLogin = () => {

  const localToken =
    localStorage.getItem("token");

  const sessionToken =
    sessionStorage.getItem("token");


  const token =
    localToken || sessionToken;


  if (!token) {

    alert("Please login first.");

    router.push("/login");

    return null;

  }


  return {

    token,

    storage:
      localToken
        ? localStorage
        : sessionStorage

  };

};


// ==========================================
// Load Student Profile
// ==========================================

const loadProfile = async () => {

  const login =
    checkLogin();


  if (!login) {

    return;

  }


  try {

    const response = await fetch(

      "http://localhost:3000/api/students/profile",

      {

        method: "GET",

        headers: {

          Authorization:
            `Bearer ${login.token}`

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


      localStorage.removeItem("token");

      localStorage.removeItem("student");

      sessionStorage.removeItem("token");

      sessionStorage.removeItem("student");


      router.push("/login");

      return;

    }


    // ==========================================
    // Student Information
    // ==========================================

    studentName.value =
      data.student.full_name;

    studentCode.value =
      data.student.student_code;

    fullName.value =
      data.student.full_name;

    email.value =
      data.student.email;

    college.value =
      data.student.college_name;

    education.value =
      data.student.education;

  }


  catch (error) {

    console.error(error);

    alert("Unable to load profile.");


    localStorage.removeItem("token");

    localStorage.removeItem("student");

    sessionStorage.removeItem("token");

    sessionStorage.removeItem("student");


    router.push("/login");

  }

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
  // Remove Login Session
  // ==========================================

  localStorage.removeItem("token");

  localStorage.removeItem("student");

  sessionStorage.removeItem("token");

  sessionStorage.removeItem("student");


  alert("Logged out successfully.");


  router.push("/login");

};


// ==========================================
// Load Dashboard
// ==========================================

onMounted(() => {

  loadProfile();

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


html {

  scroll-behavior: smooth;

}


.dashboard-container {

  background: #f4f7fb;

  color: #1e293b;

  min-height: 100vh;

  display: flex;

}


/* ==========================================
   Sidebar
========================================== */

.sidebar {

  width: 260px;

  background: #1e293b;

  color: #fff;

  position: fixed;

  left: 0;

  top: 0;

  bottom: 0;

  padding: 25px 20px;

  display: flex;

  flex-direction: column;

  overflow-y: auto;

  box-shadow:
    4px 0 15px rgba(0, 0, 0, .08);

}


/* ==========================================
   Logo
========================================== */

.logo {

  display: flex;

  align-items: center;

  gap: 15px;

  margin-bottom: 40px;

}


.logo i {

  font-size: 34px;

  color: #38bdf8;

}


.logo h2 {

  font-size: 22px;

  font-weight: 600;

  line-height: 1.1;

  color: #ffffff;

}


/* ==========================================
   Sidebar Menu
========================================== */

.sidebar-menu {

  display: flex;

  flex-direction: column;

  gap: 10px;

  flex: 1;

}


.sidebar-menu a {

  display: flex;

  align-items: center;

  gap: 14px;

  text-decoration: none;

  color: #cbd5e1;

  padding: 14px 18px;

  border-radius: 12px;

  transition: .3s;

  font-size: 15px;

  font-weight: 500;

}


.sidebar-menu a i {

  width: 22px;

  text-align: center;

  font-size: 18px;

}


.sidebar-menu a:hover {

  background: #38bdf8;

  color: #fff;

  transform: translateX(5px);

}


.sidebar-menu a.active {

  background: #2563eb;

  color: #fff;

}


.sidebar-menu a:last-child {

  margin-top: auto;

  color: #fecaca;

}


.sidebar-menu a:last-child:hover {

  background: #dc2626;

  color: #fff;

}


/* ==========================================
   Main Content
========================================== */

.main-content {

  flex: 1;

  margin-left: 260px;

  padding: 35px;

}


/* ==========================================
   Top Header
========================================== */

.topbar {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 35px;

}


.welcome h1 {

  font-size: 32px;

  font-weight: 700;

  color: #1e293b;

  margin-bottom: 8px;

}


.welcome span {

  color: #2563eb;

}


.welcome p {

  color: #64748b;

  font-size: 15px;

}


/* ==========================================
   Profile Icon
========================================== */

.profile-icon {

  width: 65px;

  height: 65px;

  background: #2563eb;

  color: #fff;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 50%;

  font-size: 28px;

  box-shadow:
    0 8px 20px rgba(37,99,235,.25);

}


/* ==========================================
   Dashboard Grid
========================================== */

.dashboard-grid {

  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 25px;

  margin-bottom: 30px;

}


/* ==========================================
   Cards
========================================== */

.card {

  background: #ffffff;

  border-radius: 16px;

  padding: 25px;

  box-shadow:
    0 5px 15px rgba(0,0,0,.08);

  transition: .3s;

}


.card:hover {

  transform: translateY(-5px);

  box-shadow:
    0 10px 25px rgba(0,0,0,.12);

}


.card-header {

  margin-bottom: 20px;

  border-bottom:
    1px solid #e5e7eb;

  padding-bottom: 12px;

}


.card-header h2 {

  font-size: 22px;

  color: #1e293b;

  font-weight: 600;

}


.card-body {

  display: flex;

  flex-direction: column;

  gap: 16px;

}


/* ==========================================
   Student Information
========================================== */

.info-row {

  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: 12px 0;

  border-bottom:
    1px solid #f1f5f9;

}


.info-row:last-child {

  border-bottom: none;

}


.info-row span {

  color: #64748b;

  font-size: 15px;

}


.info-row strong {

  color: #1e293b;

  font-weight: 600;

  text-align: right;

}


/* ==========================================
   Responsive
========================================== */

@media (max-width: 1100px) {

  .dashboard-grid {

    grid-template-columns: 1fr;

  }

}


@media (max-width: 900px) {

  .sidebar {

    position: relative;

    width: 100%;

    height: auto;

  }


  .dashboard-container {

    flex-direction: column;

  }


  .main-content {

    margin-left: 0;

    padding: 25px;

  }


  .topbar {

    flex-direction: column;

    align-items: flex-start;

    gap: 20px;

  }

}


@media (max-width: 600px) {

  .main-content {

    padding: 18px;

  }


  .welcome h1 {

    font-size: 26px;

  }


  .card {

    padding: 20px;

  }


  .info-row {

    flex-direction: column;

    align-items: flex-start;

    gap: 8px;

  }


  .info-row strong {

    text-align: left;

  }


  .profile-icon {

    width: 55px;

    height: 55px;

    font-size: 22px;

  }

}

</style>

