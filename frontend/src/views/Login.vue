```vue
<template>
  <div class="login-page">

    <!-- ==========================================
         Header
    ========================================== -->

    <header>

      <div class="logo">

        <i class="fa-solid fa-graduation-cap"></i>

        <h2>Learning Platform</h2>

      </div>

      <nav>

        <router-link to="/">

          <i class="fa-solid fa-arrow-left"></i>

          Back to Home

        </router-link>

      </nav>

    </header>


    <!-- ==========================================
         Login Section
    ========================================== -->

    <section class="login-section">

      <div class="login-container">

        <div class="login-header">

          <i class="fa-solid fa-user"></i>

          <h1>
            Student Login
          </h1>

          <p>
            Login to continue your learning journey.
          </p>

        </div>


        <form @submit.prevent="handleLogin">

          <!-- Email -->

          <div class="input-group">

            <label>
              Email Address
            </label>

            <input
              v-model="email"
              type="email"
              placeholder="Enter Email Address"
              required
            >

          </div>


          <!-- Password -->

          <div class="input-group">

            <label>
              Password
            </label>

            <input
              v-model="password"
              type="password"
              placeholder="Enter Password"
              required
            >

          </div>


          <!-- Remember Me -->

          <div class="login-options">

            <label class="remember-me">

              <input
                v-model="rememberMe"
                type="checkbox"
              >

              Remember Me

            </label>


            <a
              href="#"
              class="forgot-password"
              @click.prevent="forgotPassword"
            >
              Forgot Password?
            </a>

          </div>


          <!-- Login Button -->

          <button
            type="submit"
            class="login-btn"
          >

            Login

          </button>


          <!-- Register Link -->

          <div class="register-link">

            <p>

              Don't have an account?

              <router-link to="/register">
                Register Here
              </router-link>

            </p>

          </div>

        </form>

      </div>

    </section>

  </div>
</template>


<script setup lang="ts">

import { ref } from "vue";
import { useRouter } from "vue-router";


// ==========================================
// Router
// ==========================================

const router = useRouter();


// ==========================================
// Form Data
// ==========================================

const email = ref("");

const password = ref("");

const rememberMe = ref(false);


// ==========================================
// Login Function
// ==========================================

const handleLogin = async () => {

  // ==========================================
  // Empty Validation
  // ==========================================

  if (
    email.value.trim() === "" ||
    password.value.trim() === ""
  ) {

    alert("Please fill all fields.");

    return;

  }


  // ==========================================
  // Email Validation
  // ==========================================

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    !emailPattern.test(
      email.value.trim()
    )
  ) {

    alert(
      "Please enter a valid email address."
    );

    return;

  }


  // ==========================================
  // Login Data
  // ==========================================

  const loginData = {

    email: email.value.trim(),

    password: password.value.trim()

  };


  try {

    // ==========================================
    // Login API
    // ==========================================

    const response = await fetch(
      "http://localhost:3000/api/auth/login",
      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json"

        },

        body:
          JSON.stringify(loginData)

      }
    );


    const data =
      await response.json();


    // ==========================================
    // Login Success
    // ==========================================

    if (data.success) {


      // ==========================================
      // Save Login Details
      // ==========================================

      if (rememberMe.value) {

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "student",
          JSON.stringify(data.student)
        );

      }

      else {

        sessionStorage.setItem(
          "token",
          data.token
        );

        sessionStorage.setItem(
          "student",
          JSON.stringify(data.student)
        );

      }


      // ==========================================
      // Success Message
      // ==========================================

      alert("Login Successful!");


      // ==========================================
      // Clear Form
      // ==========================================

      email.value = "";

      password.value = "";

      rememberMe.value = false;


      // ==========================================
      // Navigate To Dashboard
      // ==========================================

      router.push("/dashboard");

    }

    else {

      alert(data.message);

    }

  }

  catch (error) {

    console.error(error);

    alert(
      "Unable to connect to server."
    );

  }

};


// ==========================================
// Forgot Password
// ==========================================

const forgotPassword = () => {

  alert(
    "Forgot Password feature is not available."
  );

};

</script>


<style scoped>

/* ==========================================
   Global
========================================== */

* {

  margin: 0;

  padding: 0;

  box-sizing: border-box;

  font-family: "Poppins", sans-serif;

}


.login-page {

  min-height: 100vh;

  background: #f5f7fb;

  color: #333;

}


a {

  text-decoration: none;

}


input,
button {

  font-family: "Poppins", sans-serif;

}


/* ==========================================
   Header
========================================== */

header {

  width: 100%;

  height: 70px;

  background: #fff;

  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: 0 8%;

  box-shadow:
    0 2px 10px rgba(0, 0, 0, .08);

}


.logo {

  display: flex;

  align-items: center;

  gap: 10px;

}


.logo i {

  font-size: 28px;

  color: #2563eb;

}


.logo h2 {

  font-size: 24px;

  color: #2563eb;

}


nav a {

  color: #2563eb;

  font-weight: 500;

}


nav a i {

  margin-right: 8px;

}


/* ==========================================
   Login Section
========================================== */

.login-section {

  min-height:
    calc(100vh - 70px);

  display: flex;

  justify-content: center;

  align-items: center;

  padding: 40px 20px;

}


.login-container {

  width: 100%;

  max-width: 500px;

  background: #fff;

  padding: 40px;

  border-radius: 12px;

  box-shadow:
    0 5px 20px rgba(0, 0, 0, .08);

}


.login-header {

  text-align: center;

  margin-bottom: 35px;

}


.login-header i {

  font-size: 60px;

  color: #2563eb;

  margin-bottom: 15px;

}


.login-header h1 {

  margin-bottom: 10px;

}


.login-header p {

  color: #666;

}


/* ==========================================
   Form
========================================== */

form {

  display: flex;

  flex-direction: column;

  gap: 20px;

}


.input-group {

  display: flex;

  flex-direction: column;

}


.input-group label {

  margin-bottom: 8px;

  font-weight: 500;

  color: #333;

}


.input-group input {

  width: 100%;

  padding: 12px 15px;

  border: 1px solid #ccc;

  border-radius: 8px;

  outline: none;

  font-size: 15px;

  transition: .3s;

}


.input-group input:focus {

  border-color: #2563eb;

}


/* ==========================================
   Login Options
========================================== */

.login-options {

  display: flex;

  justify-content: space-between;

  align-items: center;

}


.remember-me {

  display: flex;

  align-items: center;

  gap: 8px;

  font-size: 14px;

  color: #555;

  cursor: pointer;

}


.remember-me input {

  width: 16px;

  height: 16px;

  cursor: pointer;

}


.forgot-password {

  color: #2563eb;

  font-size: 14px;

  transition: .3s;

}


.forgot-password:hover {

  text-decoration: underline;

}


/* ==========================================
   Login Button
========================================== */

.login-btn {

  width: 100%;

  padding: 14px;

  border: none;

  border-radius: 8px;

  background: #2563eb;

  color: #fff;

  font-size: 16px;

  font-weight: 500;

  cursor: pointer;

  transition: .3s;

}


.login-btn:hover {

  background: #1d4ed8;

}


/* ==========================================
   Register Link
========================================== */

.register-link {

  text-align: center;

  margin-top: 20px;

}


.register-link p {

  color: #555;

  font-size: 15px;

}


.register-link a {

  color: #2563eb;

  font-weight: 600;

  transition: .3s;

}


.register-link a:hover {

  text-decoration: underline;

}


/* ==========================================
   Responsive
========================================== */

@media (max-width: 768px) {

  header {

    flex-direction: column;

    height: auto;

    padding: 20px;

    gap: 15px;

  }


  .login-container {

    padding: 25px;

  }


  .login-header h1 {

    font-size: 28px;

  }


  .login-options {

    flex-direction: column;

    align-items: flex-start;

    gap: 10px;

  }

}

</style>
```
