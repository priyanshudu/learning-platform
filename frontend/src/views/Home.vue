<template>
    <div class="home-page">

        <!-- ==========================================
             Header
        ========================================== -->

        <header :style="{ boxShadow: headerShadow }">

            <div class="logo">

                <i class="fa-solid fa-graduation-cap"></i>

                <h2>Learning Platform</h2>

            </div>

            <nav>

                <ul>

                    <li>
                        <a href="#home">Home</a>
                    </li>

                    <li>
                        <a href="#features">Features</a>
                    </li>

                    <li>
                        <a href="#about">About</a>
                    </li>

                    <li>
                        <a href="#contact">Contact</a>
                    </li>

                </ul>

            </nav>

            <div class="header-buttons">

                <router-link
                    to="/login"
                    class="login-btn"
                >
                    Login
                </router-link>

                <router-link
                    to="/register"
                    class="register-btn"
                >
                    Register
                </router-link>

            </div>

        </header>


        <!-- ==========================================
             Hero Section
        ========================================== -->

        <section
            id="home"
            class="hero"
        >

            <div class="hero-content">

                <h1>

                    Learn Computer Science

                    <span>
                        Step by Step
                    </span>

                </h1>

                <p>

                    Master programming through structured chapters,
                    interactive lessons, quizzes, and real-time progress
                    tracking—all in one platform.

                </p>

                <div class="hero-buttons">

                    <router-link
                        to="/register"
                        class="primary-btn"
                    >
                        Get Started
                    </router-link>

                    <router-link
                        to="/login"
                        class="secondary-btn"
                    >
                        Student Login
                    </router-link>

                </div>

            </div>


            <div class="hero-image">

                <i class="fa-solid fa-laptop-code"></i>

            </div>

        </section>


        <!-- ==========================================
             Features Section
        ========================================== -->

        <section
            id="features"
            class="features"
        >

            <div class="section-title">

                <h2>
                    Platform Features
                </h2>

                <p>
                    Everything you need to learn Computer Science efficiently.
                </p>

            </div>


            <div class="feature-grid">

                <div class="feature-card">

                    <i class="fa-solid fa-book-open"></i>

                    <h3>
                        Structured Chapters
                    </h3>

                    <p>

                        Learn topic by topic with well-organized
                        chapters and sub-chapters.

                    </p>

                </div>


                <div class="feature-card">

                    <i class="fa-solid fa-circle-play"></i>

                    <h3>
                        Video Lessons
                    </h3>

                    <p>

                        Watch high-quality lessons with simple
                        explanations and examples.

                    </p>

                </div>


                <div class="feature-card">

                    <i class="fa-solid fa-file-pen"></i>

                    <h3>
                        Practice Questions
                    </h3>

                    <p>

                        Solve chapter-wise quizzes to strengthen
                        your understanding.

                    </p>

                </div>


                <div class="feature-card">

                    <i class="fa-solid fa-chart-line"></i>

                    <h3>
                        Progress Tracking
                    </h3>

                    <p>

                        Monitor completed chapters, quiz scores,
                        and overall progress.

                    </p>

                </div>

            </div>

        </section>


        <!-- ==========================================
             How It Works
        ========================================== -->

        <section class="how-it-works">

            <div class="section-title">

                <h2>
                    How It Works
                </h2>

                <p>
                    Start learning in just four simple steps.
                </p>

            </div>


            <div class="steps">

                <div class="step">

                    <div class="step-number">
                        1
                    </div>

                    <h3>
                        Register
                    </h3>

                    <p>
                        Create your student account using your email.
                    </p>

                </div>


                <div class="step">

                    <div class="step-number">
                        2
                    </div>

                    <h3>
                        Learn
                    </h3>

                    <p>
                        Study lessons chapter by chapter with video guidance.
                    </p>

                </div>


                <div class="step">

                    <div class="step-number">
                        3
                    </div>

                    <h3>
                        Practice
                    </h3>

                    <p>
                        Attempt quizzes after every lesson to test yourself.
                    </p>

                </div>


                <div class="step">

                    <div class="step-number">
                        4
                    </div>

                    <h3>
                        Track Progress
                    </h3>

                    <p>
                        View your scores and continue learning at your own pace.
                    </p>

                </div>

            </div>

        </section>


        <!-- ==========================================
             Statistics
        ========================================== -->

        <section class="statistics">

            <div class="stat-card">

                <h2>
                    100+
                </h2>

                <p>
                    Lessons
                </p>

            </div>


            <div class="stat-card">

                <h2>
                    500+
                </h2>

                <p>
                    Practice Questions
                </p>

            </div>


            <div class="stat-card">

                <h2>
                    20+
                </h2>

                <p>
                    Chapters
                </p>

            </div>


            <div class="stat-card">

                <h2>
                    24×7
                </h2>

                <p>
                    Learning Access
                </p>

            </div>

        </section>


        <!-- ==========================================
             About Section
        ========================================== -->

        <section
            id="about"
            class="about"
        >

            <div class="section-title">

                <h2>
                    About Learning Platform
                </h2>

            </div>


            <div class="about-content">

                <div class="about-text">

                    <p>

                        Learning Platform is designed to help students
                        learn Computer Science through a structured
                        learning path. Students can watch lessons,
                        practice chapter-wise questions, track their
                        progress, and improve their understanding with
                        an easy-to-use interface.

                    </p>

                    <p>

                        Our goal is to make learning simple,
                        interactive, and accessible from anywhere.

                    </p>

                </div>


                <div class="about-image">

                    <i class="fa-solid fa-laptop"></i>

                </div>

            </div>

        </section>


        <!-- ==========================================
             Contact Section
        ========================================== -->

        <section
            id="contact"
            class="contact"
        >

            <div class="section-title">

                <h2>
                    Contact Us
                </h2>

                <p>
                    Have a question? We'd love to hear from you.
                </p>

            </div>


            <form
                class="contact-form"
                @submit.prevent="sendMessage"
            >

                <input
                    v-model="contactForm.name"
                    type="text"
                    placeholder="Full Name"
                    required
                >


                <input
                    v-model="contactForm.email"
                    type="email"
                    placeholder="Email Address"
                    required
                >


                <textarea
                    v-model="contactForm.message"
                    rows="6"
                    placeholder="Your Message"
                    required
                ></textarea>


                <button type="submit">
                    Send Message
                </button>

            </form>

        </section>


        <!-- ==========================================
             Footer
        ========================================== -->

        <footer>

            <div class="footer-content">

                <div class="footer-logo">

                    <i class="fa-solid fa-graduation-cap"></i>

                    <h3>
                        Learning Platform
                    </h3>

                </div>

                <p>
                    Learn. Practice. Improve.
                </p>


                <div class="social-icons">

                    <a href="#">
                        <i class="fa-brands fa-facebook-f"></i>
                    </a>

                    <a href="#">
                        <i class="fa-brands fa-instagram"></i>
                    </a>

                    <a href="#">
                        <i class="fa-brands fa-linkedin-in"></i>
                    </a>

                    <a href="#">
                        <i class="fa-brands fa-github"></i>
                    </a>

                </div>


                <p class="copyright">

                    © {{ currentYear }}
                    Learning Platform.
                    All Rights Reserved.

                </p>

            </div>

        </footer>

    </div>
</template>


<script setup lang="ts">

import {
    ref,
    onMounted,
    onUnmounted
} from "vue";


// ==========================================
// Contact Form
// ==========================================

const contactForm = ref({

    name: "",

    email: "",

    message: ""

});


// ==========================================
// Footer Year
// ==========================================

const currentYear = new Date().getFullYear();


// ==========================================
// Header Shadow
// ==========================================

const headerShadow = ref(
    "0 2px 10px rgba(0,0,0,0.08)"
);


// ==========================================
// Contact Form Submit
// ==========================================

const sendMessage = () => {

    if (
        !contactForm.value.name ||
        !contactForm.value.email ||
        !contactForm.value.message
    ) {

        alert("Please fill all fields.");

        return;

    }

    alert("Message Sent Successfully!");

    contactForm.value = {

        name: "",

        email: "",

        message: ""

    };

};


// ==========================================
// Smooth Scroll
// ==========================================

const handleNavigation = (event: Event) => {

    const target =
        event.currentTarget as HTMLAnchorElement;

    const targetId =
        target.getAttribute("href");

    if (
        targetId &&
        targetId.startsWith("#")
    ) {

        const targetSection =
            document.querySelector(targetId);

        if (targetSection) {

            event.preventDefault();

            targetSection.scrollIntoView({

                behavior: "smooth"

            });

        }

    }

};


// ==========================================
// Navbar Shadow
// ==========================================

const handleScroll = () => {

    if (window.scrollY > 50) {

        headerShadow.value =
            "0 4px 15px rgba(0,0,0,0.15)";

    } else {

        headerShadow.value =
            "0 2px 10px rgba(0,0,0,0.08)";

    }

};


// ==========================================
// Active Navigation
// ==========================================

const handleActiveNavigation = () => {

    const sections =
        document.querySelectorAll("section");

    const navLinks =
        document.querySelectorAll("nav a");

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 100;

        if (
            window.scrollY >= sectionTop
        ) {

            currentSection =
                section.getAttribute("id") || "";

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

};


// ==========================================
// Mounted
// ==========================================

onMounted(() => {

    const navLinks =
        document.querySelectorAll("nav a");

    navLinks.forEach((link) => {

        link.addEventListener(
            "click",
            handleNavigation
        );

    });


    window.addEventListener(
        "scroll",
        handleScroll
    );


    window.addEventListener(
        "scroll",
        handleActiveNavigation
    );

});


// ==========================================
// Unmounted
// ==========================================

onUnmounted(() => {

    const navLinks =
        document.querySelectorAll("nav a");

    navLinks.forEach((link) => {

        link.removeEventListener(
            "click",
            handleNavigation
        );

    });


    window.removeEventListener(
        "scroll",
        handleScroll
    );


    window.removeEventListener(
        "scroll",
        handleActiveNavigation
    );

});

</script>


<style src="../../css/index.css"></style>