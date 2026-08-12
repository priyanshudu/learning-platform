<template>

  <div class="register-page">

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
         Registration Section
    ========================================== -->

    <section class="register-section">

      <div class="register-container">

        <!-- Registration Header -->

        <div class="register-header">

          <i class="fa-solid fa-user-plus"></i>

          <h1>
            Student Registration
          </h1>

          <p>
            Create your account to start learning.
          </p>

        </div>


        <!-- ==========================================
             Registration Form
        ========================================== -->

        <form @submit.prevent="handleRegister">

          <!-- Full Name -->

          <div class="input-group">

            <label>
              Full Name
            </label>

            <input
              v-model="fullName"
              type="text"
              placeholder="Enter Full Name"
              required
            >

          </div>


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


          <!-- Mobile -->

          <div class="input-group">

            <label>
              Mobile Number
            </label>

            <input
              v-model="mobile"
              type="tel"
              placeholder="Enter Mobile Number"
              required
            >

          </div>


          <!-- College Name -->

          <div class="input-group">

            <label>
              College Name
            </label>

            <input
              v-model="collegeName"
              type="text"
              placeholder="Enter College Name"
              required
            >

          </div>


          <!-- Education -->

          <div class="input-group">

            <label>
              Education
            </label>

            <select
              v-model="education"
              required
            >

              <option value="">
                Select Education
              </option>

              <option value="B.Sc Computer Science">
                B.Sc Computer Science
              </option>

              <option value="BCA">
                BCA
              </option>

              <option value="B.Tech">
                B.Tech
              </option>

              <option value="MCA">
                MCA
              </option>

              <option value="M.Sc">
                M.Sc
              </option>

              <option value="Other">
                Other
              </option>

            </select>

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


          <!-- Confirm Password -->

          <div class="input-group">

            <label>
              Confirm Password
            </label>

            <input
              v-model="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              required
            >

          </div>


          <!-- Terms -->

          <div class="checkbox-group">

            <input
              v-model="terms"
              type="checkbox"
              id="terms"
              required
            >

            <label for="terms">

              I agree to the Terms & Conditions.

            </label>

          </div>


          <!-- Register Button -->

          <button
            type="submit"
            class="register-btn"
          >

            Create Account

          </button>


          <!-- Login Link -->

          <div class="login-link">

            <p>

              Already have an account?

              <router-link to="/login">

                Login Here

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

const fullName = ref("");

const email = ref("");

const mobile = ref("");

const collegeName = ref("");

const education = ref("");

const password = ref("");

const confirmPassword = ref("");

const terms = ref(false);


// ==========================================
// Register Function
// ==========================================

const handleRegister = async () => {

  // ==========================================
  // Empty Validation
  // ==========================================

  if (
    fullName.value.trim() === "" ||
    email.value.trim() === "" ||
    mobile.value.trim() === "" ||
    collegeName.value.trim() === "" ||
    education.value === "" ||
    password.value.trim() === "" ||
    confirmPassword.value.trim() === ""
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
  // Mobile Validation
  // ==========================================

  const mobilePattern =
    /^[6-9]\d{9}$/;

  if (
    !mobilePattern.test(
      mobile.value.trim()
    )
  ) {

    alert(
      "Please enter a valid 10-digit mobile number."
    );

    return;

  }


  // ==========================================
  // Password Validation
  // ==========================================

  if (
    password.value.length < 6
  ) {

    alert(
      "Password must be at least 6 characters."
    );

    return;

  }


  // ==========================================
  // Confirm Password
  // ==========================================

  if (
    password.value !==
    confirmPassword.value
  ) {

    alert(
      "Passwords do not match."
    );

    return;

  }


  // ==========================================
  // Terms & Conditions
  // ==========================================

  if (!terms.value) {

    alert(
      "Please accept the Terms & Conditions."
    );

    return;

  }


  // ==========================================
  // Register Data
  // ==========================================

  const studentData = {

    full_name:
      fullName.value.trim(),

    email:
      email.value.trim(),

    mobile:
      mobile.value.trim(),

    college_name:
      collegeName.value.trim(),

    education:
      education.value,

    password:
      password.value

  };


  try {

    // ==========================================
    // Register API
    // ==========================================

    const response = await fetch(
      "http://localhost:3000/api/auth/register",
      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json"

        },

        body:
          JSON.stringify(studentData)

      }
    );


    const data =
      await response.json();


    // ==========================================
    // Registration Success
    // ==========================================

    if (data.success) {

      alert(
        "Registration Successful!"
      );


      // ==========================================
      // Clear Form
      // ==========================================

      fullName.value = "";

      email.value = "";

      mobile.value = "";

      collegeName.value = "";

      education.value = "";

      password.value = "";

      confirmPassword.value = "";

      terms.value = false;


      // ==========================================
      // Navigate To Login
      // ==========================================

      router.push("/login");

    }

    else {

      alert(
        data.message
      );

    }

  }

  catch (error) {

    console.error(error);

    alert(
      "Server Error"
    );

  }

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


.register-page {

  min-height: 100vh;

  background: #f5f7fb;

  color: #333;

}


a {

  text-decoration: none;

}


input,
select,
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
   Register Section
========================================== */

.register-section {

  min-height:
    calc(100vh - 70px);

  display: flex;

  justify-content: center;

  align-items: center;

  padding: 40px 20px;

}


.register-container {

  width: 100%;

  max-width: 700px;

  background: #fff;

  padding: 40px;

  border-radius: 12px;

  box-shadow:
    0 5px 20px rgba(0, 0, 0, .08);

}


.register-header {

  text-align: center;

  margin-bottom: 35px;

}


.register-header i {

  font-size: 60px;

  color: #2563eb;

  margin-bottom: 15px;

}


.register-header h1 {

  margin-bottom: 10px;

}


.register-header p {

  color: #666;

}


/* ==========================================
   Form
========================================== */

form {

  display: grid;

  grid-template-columns: 1fr 1fr;

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


.input-group input,
.input-group select {

  width: 100%;

  padding: 12px 15px;

  border: 1px solid #ccc;

  border-radius: 8px;

  outline: none;

  font-size: 15px;

  transition: .3s;

}


.input-group input:focus,
.input-group select:focus {

  border-color: #2563eb;

}


/* ==========================================
   Checkbox
========================================== */

.checkbox-group {

  grid-column: 1 / 3;

  display: flex;

  align-items: center;

  gap: 10px;

  margin-top: 5px;

}


.checkbox-group input {

  width: 18px;

  height: 18px;

  cursor: pointer;

}


.checkbox-group label {

  font-size: 14px;

  color: #555;

}


/* ==========================================
   Register Button
========================================== */

.register-btn {

  grid-column: 1 / 3;

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


.register-btn:hover {

  background: #1d4ed8;

}


/* ==========================================
   Login Link
========================================== */

.login-link {

  grid-column: 1 / 3;

  text-align: center;

  margin-top: 20px;

}


.login-link p {

  color: #555;

  font-size: 15px;

}


.login-link a {

  color: #2563eb;

  font-weight: 600;

  transition: .3s;

}


.login-link a:hover {

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


  .register-container {

    padding: 25px;

  }


  form {

    grid-template-columns: 1fr;

  }


  .checkbox-group,
  .register-btn,
  .login-link {

    grid-column: 1;

  }


  .register-header h1 {

    font-size: 28px;

  }

}

</style>