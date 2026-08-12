<template>

  <div class="quiz-page">

    <!-- ==========================================
         Mandatory Note
    ========================================== -->

    <div class="mandatory-note">

      <i class="fa-solid fa-circle-exclamation"></i>

      <strong>Note:</strong>

      All questions are mandatory.
      You must answer every question before submitting the quiz.
      Read every question carefully and select the correct answer.

    </div>


    <!-- ==========================================
         Header
    ========================================== -->

    <header>

      <div class="logo">

        <i class="fa-solid fa-graduation-cap"></i>

        <h2>
          Learning Platform
        </h2>

      </div>


      <nav>

        <button @click="goBack">

          <i class="fa-solid fa-arrow-left"></i>

          Back

        </button>

      </nav>

    </header>


    <!-- ==========================================
         ALREADY PASSED SCREEN
    ========================================== -->

    <section
      v-if="alreadyPassed && !quizStarted"
      class="passed-section"
    >

      <div class="passed-box">

        <i class="fa-solid fa-circle-check"></i>

        <h1>
          Quiz Already Passed
        </h1>

        <h3>
          {{ chapterTitle }}
        </h3>

        <p>
          You have already passed the test for
          <strong>{{ subChapterTitle }}</strong>.
        </p>

        <p class="passed-message">
          You can reattempt the quiz if you want.
        </p>


        <div class="passed-buttons">

          <button
            class="reattempt-btn"
            @click="startReattempt"
          >

            <i class="fa-solid fa-rotate-right"></i>

            Reattempt Quiz

          </button>


          <button
            class="back-btn"
            @click="goBack"
          >

            <i class="fa-solid fa-arrow-left"></i>

            Back

          </button>

        </div>

      </div>

    </section>


    <!-- ==========================================
         QUIZ SECTION
    ========================================== -->

    <section
      v-if="!alreadyPassed || quizStarted"
      class="quiz-section"
    >

      <div class="quiz-container">


        <!-- ==========================================
             Quiz Header
        ========================================== -->

        <div class="quiz-header">

          <h1>
            {{ chapterTitle }}
          </h1>

          <h3>
            {{ subChapterTitle }}
          </h3>

          <p>
            Read every question carefully and select the correct answer.
          </p>

        </div>


        <!-- ==========================================
             Quiz Information
        ========================================== -->

        <div class="quiz-info">

          <div>

            <strong>
              Total Questions :
            </strong>

            <span>
              {{ questions.length }}
            </span>

          </div>


          <div>

            <strong>
              Answered :
            </strong>

            <span>
              {{ answered }}
            </span>

          </div>


          <div>

            <strong>
              Remaining :
            </strong>

            <span>
              {{ questions.length - answered }}
            </span>

          </div>

        </div>


        <!-- ==========================================
             Progress Bar
        ========================================== -->

        <div class="progress-container">

          <div
            class="progress-bar"
            :style="{ width: progressPercentage + '%' }"
          ></div>

        </div>


        <!-- ==========================================
             Loading
        ========================================== -->

        <div
          v-if="loading"
          class="loading"
        >

          Loading Questions...

        </div>


        <!-- ==========================================
             Questions
        ========================================== -->

        <div
          v-if="!loading && quizStarted"
          class="questions-container"
        >

          <div
            v-for="(question, index) in questions"
            :key="question.question_id"
            class="question-card"
          >

            <!-- Question Number -->

            <div class="question-number">

              Question {{ index + 1 }}

            </div>


            <!-- Question -->

            <div class="question-text">

              {{ question.question_text }}

            </div>


            <!-- ==========================================
                 Option A
            ========================================== -->

            <label class="option">

              <input
                type="radio"
                :name="`question_${question.question_id}`"
                value="A"
                :checked="
                  answers[question.question_id] === 'A'
                "
                @change="
                  selectAnswer(
                    question.question_id,
                    'A'
                  )
                "
              />

              <span>
                A. {{ question.option_a }}
              </span>

            </label>


            <!-- ==========================================
                 Option B
            ========================================== -->

            <label class="option">

              <input
                type="radio"
                :name="`question_${question.question_id}`"
                value="B"
                :checked="
                  answers[question.question_id] === 'B'
                "
                @change="
                  selectAnswer(
                    question.question_id,
                    'B'
                  )
                "
              />

              <span>
                B. {{ question.option_b }}
              </span>

            </label>


            <!-- ==========================================
                 Option C
            ========================================== -->

            <label class="option">

              <input
                type="radio"
                :name="`question_${question.question_id}`"
                value="C"
                :checked="
                  answers[question.question_id] === 'C'
                "
                @change="
                  selectAnswer(
                    question.question_id,
                    'C'
                  )
                "
              />

              <span>
                C. {{ question.option_c }}
              </span>

            </label>


            <!-- ==========================================
                 Option D
            ========================================== -->

            <label class="option">

              <input
                type="radio"
                :name="`question_${question.question_id}`"
                value="D"
                :checked="
                  answers[question.question_id] === 'D'
                "
                @change="
                  selectAnswer(
                    question.question_id,
                    'D'
                  )
                "
              />

              <span>
                D. {{ question.option_d }}
              </span>

            </label>

          </div>

        </div>


        <!-- ==========================================
             No Questions
        ========================================== -->

        <div
          v-if="
            !loading &&
            quizStarted &&
            questions.length === 0
          "
          class="no-questions"
        >

          <i class="fa-solid fa-circle-question"></i>

          <h2>
            No Questions Available
          </h2>

          <p>
            There are no questions available for this sub chapter.
          </p>

        </div>


        <!-- ==========================================
             Submit Button
        ========================================== -->

        <div
          v-if="
            !loading &&
            quizStarted &&
            questions.length > 0
          "
          class="quiz-buttons"
        >

          <button
            id="submitQuizBtn"
            @click="submitQuiz"
          >

            Submit Quiz

          </button>

        </div>

      </div>

    </section>


    <!-- ==========================================
         RESULT MODAL
    ========================================== -->

    <div
      v-if="showResult"
      class="result-modal"
    >

      <div class="result-box">

        <i class="fa-solid fa-award"></i>

        <h2>
          Quiz Result
        </h2>


        <p>

          Total Questions :

          <span>
            {{ result.total }}
          </span>

        </p>


        <p>

          Correct Answers :

          <span>
            {{ result.correct }}
          </span>

        </p>


        <p>

          Wrong Answers :

          <span>
            {{ result.wrong }}
          </span>

        </p>


        <p>

          Score :

          <span>
            {{ result.score }}%
          </span>

        </p>


        <h3
          :class="
            result.passed
              ? 'pass'
              : 'fail'
          "
        >

          {{ result.passed ? "PASS" : "FAIL" }}

        </h3>


        <button
          @click="continueQuiz"
        >

          {{ result.passed ? "Continue" : "Retry Quiz" }}

        </button>

      </div>

    </div>

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
// Subchapter ID
// ==========================================

const subchapterId = Number(
  route.query.subchapter_id
);


// ==========================================
// Interfaces
// ==========================================

interface Question {

  question_id: number;

  question_text: string;

  option_a: string;

  option_b: string;

  option_c: string;

  option_d: string;

}


interface QuizResult {

  total: number;

  correct: number;

  wrong: number;

  score: number;

  passed: boolean;

}


// ==========================================
// Data
// ==========================================

const chapterTitle = ref(
  "Chapter Name"
);

const subChapterTitle = ref(
  "Subchapter Name"
);

const chapterId = ref<number | null>(
  null
);

const questions = ref<Question[]>([]);

const answers = ref<Record<number, string>>({});

const loading = ref(false);

const showResult = ref(false);


// ==========================================
// Quiz State
// ==========================================

const quizStarted = ref(false);

const alreadyPassed = ref(false);


// ==========================================
// Result
// ==========================================

const result = ref<QuizResult>({

  total: 0,

  correct: 0,

  wrong: 0,

  score: 0,

  passed: false

});


// ==========================================
// Authentication
// ==========================================

const storage =
  localStorage.getItem("token")
    ? localStorage
    : sessionStorage;


const token =
  storage.getItem("token");


const studentData =
  storage.getItem("student");


const student =
  studentData
    ? JSON.parse(studentData)
    : null;


// ==========================================
// Login Validation
// ==========================================

if (!token || !student) {

  alert("Please login first.");

  router.push("/login");

}


// ==========================================
// Validate Subchapter
// ==========================================

if (!subchapterId) {

  alert("Invalid Subchapter.");

  router.push("/chapters");

}


// ==========================================
// Storage Key
// ==========================================

const passedKey =
  `quiz_passed_${subchapterId}_${student?.student_id || student?.id || "student"}`;


// ==========================================
// Check Previous Passed Status
// ==========================================

const checkPreviousPassed = () => {

  const passed =
    localStorage.getItem(passedKey);

  if (passed === "true") {

    alreadyPassed.value = true;

    quizStarted.value = false;

  }
  else {

    alreadyPassed.value = false;

    quizStarted.value = true;

  }

};


// ==========================================
// Answered Questions
// ==========================================

const answered = computed(() => {

  return Object.keys(
    answers.value
  ).length;

});


// ==========================================
// Progress
// ==========================================

const progressPercentage = computed(() => {

  if (questions.value.length === 0) {

    return 0;

  }

  return (
    answered.value /
    questions.value.length
  ) * 100;

});


// ==========================================
// Select Answer
// ==========================================

const selectAnswer = (
  questionId: number,
  option: string
) => {

  answers.value[questionId] =
    option;

};


// ==========================================
// Load Questions
// ==========================================

const loadQuestions = async () => {

  if (!token || !subchapterId) {

    return;

  }


  try {

    loading.value = true;


    //console.log(
      //"Loading questions for subchapter:",
      //subchapterId
    //);


    const response =
      await fetch(
        `http://localhost:3000/api/questions/${subchapterId}`,
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
      //"Questions API response:",
      //data
    //);


    if (!data.success) {

      alert(
        data.message ||
        "Unable to load questions."
      );

      return;

    }


    // ==========================================
    // Chapter
    // ==========================================

    chapterTitle.value =
      data.chapter_name;


    chapterId.value =
      data.chapter_id;


    // ==========================================
    // Subchapter
    // ==========================================

    subChapterTitle.value =
      data.subchapter_name;


    // ==========================================
    // Questions
    // ==========================================

    questions.value =
      data.questions || [];


  }

  catch (error) {

    console.error(
      "Questions loading error:",
      error
    );

    alert(
      "Unable to load questions."
    );

  }

  finally {

    loading.value = false;

  }

};


// ==========================================
// Start Reattempt
// ==========================================

const startReattempt = async () => {

  alreadyPassed.value = false;

  quizStarted.value = true;

  answers.value = {};

  await loadQuestions();

};


// ==========================================
// Submit Quiz
// ==========================================

const submitQuiz = async () => {


  // ==========================================
  // Check All Questions
  // ==========================================

  if (
    answered.value !==
    questions.value.length
  ) {

    alert(
      "All questions are mandatory."
    );

    return;

  }


  // ==========================================
  // Confirmation
  // ==========================================

  const confirmSubmit =
    confirm(
      "Are you sure you want to submit the quiz?"
    );


  if (!confirmSubmit) {

    return;

  }


  // ==========================================
  // Prepare Answers
  // ==========================================

  const payload = {

    subchapter_id:
      subchapterId,

    answers:
      Object.keys(
        answers.value
      ).map(questionId => ({

        question_id:
          Number(questionId),

        selected_option:
          answers.value[
            Number(questionId)
          ]

      }))

  };


  try {

    const response =
      await fetch(

        "http://localhost:3000/api/questions/submit",

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`

          },

          body:
            JSON.stringify(payload)

        }

      );


    const data =
      await response.json();


    //console.log(
      //"Submit Quiz response:",
      //data
    //);


    if (!data.success) {

      alert(
        data.message ||
        "Quiz submission failed."
      );

      return;

    }


    // ==========================================
    // Result
    // ==========================================

    result.value = {

      total:
        data.total,

      correct:
        data.correct,

      wrong:
        data.wrong,

      score:
        data.score,

      passed:
        data.passed

    };


    // ==========================================
    // SAVE PASSED STATUS
    // ==========================================

    if (data.passed) {

      localStorage.setItem(
        passedKey,
        "true"
      );

    }


    // ==========================================
    // Show Result
    // ==========================================

    showResult.value = true;

  }

  catch (error) {

    console.error(
      "Quiz submission error:",
      error
    );

    alert(
      "Unable to submit quiz."
    );

  }

};


// ==========================================
// Continue / Retry
// ==========================================

const continueQuiz = () => {

  // ==========================================
  // PASS
  // ==========================================

  if (result.value.passed) {

    showResult.value = false;

    quizStarted.value = false;

    alreadyPassed.value = true;


    // ==========================================
    // Go to Subchapters
    // ==========================================

    router.push(
      `/subchapters/${chapterId.value}`
    );

    return;

  }


  // ==========================================
  // FAIL
  // ==========================================

  showResult.value = false;

  answers.value = {};

  quizStarted.value = true;

};


// ==========================================
// Back
// ==========================================

const goBack = () => {

  router.back();

};


// ==========================================
// Initial Load
// ==========================================

onMounted(async () => {

  checkPreviousPassed();


  // Only load questions if quiz
  // has not already been passed

  if (quizStarted.value) {

    await loadQuestions();

  }

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

  font-family: "Poppins", sans-serif;

}


html {

  scroll-behavior: smooth;

}


.quiz-page {

  background: #f4f7fb;

  color: #1e293b;

  min-height: 100vh;

}


/* ==========================================
   Mandatory Note
========================================== */

.mandatory-note {

  margin: 20px;

  padding: 14px 18px;

  background: #fff7ed;

  border-left: 5px solid #f97316;

  border-radius: 8px;

  color: #9a3412;

  font-size: 15px;

  display: flex;

  align-items: center;

  gap: 12px;

}


/* ==========================================
   Header
========================================== */

header {

  background: #1e293b;

  color: #ffffff;

  padding: 18px 40px;

  display: flex;

  justify-content: space-between;

  align-items: center;

  box-shadow:
    0 5px 15px
    rgba(0,0,0,.08);

}


.logo {

  display: flex;

  align-items: center;

  gap: 15px;

}


.logo i {

  font-size: 34px;

  color: #38bdf8;

}


.logo h2 {

  font-size: 24px;

  font-weight: 600;

}


nav button {

  background: #2563eb;

  color: #ffffff;

  border: none;

  padding: 12px 22px;

  border-radius: 10px;

  cursor: pointer;

  font-size: 15px;

  transition: .3s;

}


nav button:hover {

  background: #1d4ed8;

}


/* ==========================================
   Already Passed
========================================== */

.passed-section {

  min-height: calc(100vh - 120px);

  display: flex;

  justify-content: center;

  align-items: center;

  padding: 40px;

}


.passed-box {

  width: 100%;

  max-width: 600px;

  background: #ffffff;

  border-radius: 20px;

  padding: 50px;

  text-align: center;

  box-shadow:
    0 10px 30px
    rgba(0,0,0,.1);

}


.passed-box > i {

  font-size: 70px;

  color: #10b981;

  margin-bottom: 20px;

}


.passed-box h1 {

  color: #1e293b;

  margin-bottom: 12px;

}


.passed-box h3 {

  color: #2563eb;

  margin-bottom: 20px;

}


.passed-box p {

  color: #64748b;

  line-height: 1.7;

  margin-bottom: 10px;

}


.passed-message {

  margin-top: 10px;

}


.passed-buttons {

  display: flex;

  justify-content: center;

  gap: 15px;

  margin-top: 30px;

}


.reattempt-btn,
.back-btn {

  border: none;

  padding: 14px 25px;

  border-radius: 10px;

  cursor: pointer;

  font-size: 15px;

}


.reattempt-btn {

  background: #2563eb;

  color: #ffffff;

}


.back-btn {

  background: #e2e8f0;

  color: #1e293b;

}


.reattempt-btn:hover {

  background: #1d4ed8;

}


.back-btn:hover {

  background: #cbd5e1;

}


/* ==========================================
   Quiz Section
========================================== */

.quiz-section {

  padding: 40px;

  display: flex;

  justify-content: center;

}


.quiz-container {

  width: 100%;

  max-width: 1000px;

  background: #ffffff;

  border-radius: 18px;

  padding: 35px;

  box-shadow:
    0 10px 25px
    rgba(0,0,0,.08);

}


/* ==========================================
   Quiz Header
========================================== */

.quiz-header {

  text-align: center;

  margin-bottom: 35px;

}


.quiz-header h1 {

  font-size: 34px;

  color: #1e293b;

  margin-bottom: 8px;

}


.quiz-header h3 {

  color: #2563eb;

  margin-bottom: 12px;

}


.quiz-header p {

  color: #64748b;

}


/* ==========================================
   Quiz Info
========================================== */

.quiz-info {

  display: grid;

  grid-template-columns:
    repeat(3,1fr);

  gap: 20px;

  margin-bottom: 25px;

}


.quiz-info div {

  background: #eff6ff;

  padding: 18px;

  border-radius: 12px;

  text-align: center;

}


.quiz-info strong {

  display: block;

  margin-bottom: 8px;

}


.quiz-info span {

  font-size: 24px;

  font-weight: 700;

  color: #2563eb;

}


/* ==========================================
   Progress
========================================== */

.progress-container {

  width: 100%;

  height: 12px;

  background: #e2e8f0;

  border-radius: 20px;

  overflow: hidden;

  margin-bottom: 35px;

}


.progress-bar {

  height: 100%;

  background: #2563eb;

  transition: .4s;

}


/* ==========================================
   Loading
========================================== */

.loading {

  text-align: center;

  font-size: 18px;

  color: #2563eb;

  padding: 30px;

}


/* ==========================================
   Question Card
========================================== */

.question-card {

  background: #ffffff;

  border: 1px solid #e5e7eb;

  border-radius: 16px;

  padding: 28px;

  margin-bottom: 30px;

  transition: .3s;

}


.question-card:hover {

  box-shadow:
    0 8px 18px
    rgba(0,0,0,.08);

}


.question-number {

  display: inline-block;

  background: #2563eb;

  color: #ffffff;

  padding: 6px 15px;

  border-radius: 30px;

  margin-bottom: 18px;

  font-size: 14px;

}


.question-text {

  font-size: 20px;

  font-weight: 600;

  margin-bottom: 25px;

  line-height: 1.7;

}


/* ==========================================
   Options
========================================== */

.option {

  display: flex;

  align-items: center;

  gap: 15px;

  padding: 18px;

  margin-bottom: 15px;

  border: 2px solid #dbeafe;

  border-radius: 12px;

  cursor: pointer;

  transition: .3s;

}


.option:hover {

  background: #eff6ff;

}


.option input {

  width: 20px;

  height: 20px;

  cursor: pointer;

}


.option span {

  flex: 1;

  cursor: pointer;

  font-size: 16px;

  color: #334155;

}


/* ==========================================
   Submit
========================================== */

.quiz-buttons {

  text-align: center;

  margin-top: 40px;

}


#submitQuizBtn {

  background: #2563eb;

  color: #ffffff;

  border: none;

  padding: 15px 40px;

  font-size: 17px;

  border-radius: 12px;

  cursor: pointer;

  transition: .3s;

}


#submitQuizBtn:hover {

  background: #1d4ed8;

  transform: translateY(-2px);

}


/* ==========================================
   No Questions
========================================== */

.no-questions {

  text-align: center;

  padding: 50px;

  color: #64748b;

}


.no-questions i {

  font-size: 50px;

  color: #2563eb;

  margin-bottom: 20px;

}


/* ==========================================
   Result Modal
========================================== */

.result-modal {

  position: fixed;

  inset: 0;

  background:
    rgba(0,0,0,.45);

  display: flex;

  justify-content: center;

  align-items: center;

  z-index: 999;

}


.result-box {

  width: 420px;

  background: #ffffff;

  border-radius: 20px;

  padding: 35px;

  text-align: center;

  box-shadow:
    0 10px 30px
    rgba(0,0,0,.2);

}


.result-box i {

  font-size: 55px;

  color: #2563eb;

  margin-bottom: 20px;

}


.result-box h2 {

  margin-bottom: 25px;

}


.result-box p {

  margin-bottom: 15px;

  font-size: 17px;

}


.result-box span {

  font-weight: 700;

  color: #2563eb;

}


.result-box h3 {

  margin: 25px 0;

  font-size: 28px;

}


.result-box h3.pass {

  color: green;

}


.result-box h3.fail {

  color: red;

}


.result-box button {

  background: #2563eb;

  color: #ffffff;

  border: none;

  padding: 14px 35px;

  border-radius: 10px;

  cursor: pointer;

  transition: .3s;

}


.result-box button:hover {

  background: #1d4ed8;

}


/* ==========================================
   Responsive
========================================== */

@media(max-width:900px) {

  header {

    flex-direction: column;

    gap: 20px;

  }


  .quiz-info {

    grid-template-columns: 1fr;

  }

}


@media(max-width:600px) {

  .quiz-section {

    padding: 15px;

  }


  .quiz-container {

    padding: 20px;

  }


  .quiz-header h1 {

    font-size: 28px;

  }


  .question-text {

    font-size: 18px;

  }


  .result-box {

    width: 95%;

  }


  .passed-section {

    padding: 20px;

  }


  .passed-box {

    padding: 30px 20px;

  }


  .passed-buttons {

    flex-direction: column;

  }

}

</style>