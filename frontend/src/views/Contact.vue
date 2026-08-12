<template>
  <div class="contact-page">

    <header class="header">
      <div class="logo">
        <i class="fa-solid fa-graduation-cap"></i>
        <h2>Learning Platform</h2>
      </div>

      <button @click="goBack" class="back-btn">
        <i class="fa-solid fa-arrow-left"></i>
        Back
      </button>
    </header>

    <main class="contact-container">

      <div class="contact-card">

        <div class="contact-icon">
          <i class="fa-solid fa-envelope"></i>
        </div>

        <h1>Contact Us</h1>

        <p class="description">
          If you have any questions, suggestions, or issues,
          feel free to contact us.
        </p>

        <div class="email-box">

          <i class="fa-solid fa-envelope"></i>

          <div>
            <span>Email</span>

            <a href="mailto:abc@gmail.com">
              abc@gmail.com
            </a>
          </div>

        </div>

      </div>

    </main>

  </div>
</template>

<script setup lang="ts">

import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.back();
};

</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.contact-page {
  min-height: 100vh;
  background: #f4f7fb;
  color: #1e293b;
}

/* Header */

.header {
  background: #1e293b;
  color: white;
  padding: 18px 40px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  box-shadow: 0 5px 15px rgba(0, 0, 0, .08);
}

.logo {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo i {
  font-size: 32px;
  color: #38bdf8;
}

.logo h2 {
  font-size: 24px;
  font-weight: 600;
}

.back-btn {
  border: none;
  background: #2563eb;
  color: white;

  padding: 12px 22px;
  border-radius: 10px;

  cursor: pointer;
  font-size: 15px;
}

.back-btn:hover {
  background: #1d4ed8;
}

/* Main */

.contact-container {
  min-height: calc(100vh - 80px);

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 40px;
}

/* Card */

.contact-card {
  width: 100%;
  max-width: 600px;

  background: white;

  padding: 45px;

  border-radius: 18px;

  text-align: center;

  box-shadow: 0 10px 25px rgba(0, 0, 0, .08);
}

.contact-icon {
  width: 80px;
  height: 80px;

  margin: 0 auto 25px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;

  background: #eff6ff;
  color: #2563eb;

  font-size: 35px;
}

.contact-card h1 {
  font-size: 32px;
  margin-bottom: 15px;
}

.description {
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 30px;
}

/* Email */

.email-box {
  display: flex;
  align-items: center;
  gap: 18px;

  padding: 20px;

  background: #eff6ff;

  border-radius: 12px;

  text-align: left;
}

.email-box > i {
  font-size: 25px;
  color: #2563eb;
}

.email-box div {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.email-box span {
  font-size: 14px;
  color: #64748b;
}

.email-box a {
  color: #2563eb;
  font-size: 17px;
  font-weight: 600;
  text-decoration: none;
}

.email-box a:hover {
  text-decoration: underline;
}

/* Mobile */

@media(max-width:600px) {

  .header {
    padding: 18px 20px;
  }

  .logo h2 {
    font-size: 19px;
  }

  .contact-container {
    padding: 20px;
  }

  .contact-card {
    padding: 30px 20px;
  }

  .contact-card h1 {
    font-size: 28px;
  }

}

</style>