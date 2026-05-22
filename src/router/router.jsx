import AuthLayout from "@/layout/AuthLayout";
import Layout from "@/layout/Layout";
import ListeningLayout from "@/layout/ListeningLayout";
import AuthStart from "@/pages/authPages/AuthStart";
import ForgotPassword from "@/pages/authPages/ForgotPassword";
import LogInPage from "@/pages/authPages/LogInPage";
import ResetPassword from "@/pages/authPages/ResetPassword";
import VerifyOtp from "@/pages/authPages/VerifyOtp";
import Home from "@/pages/home/Home";
import IELTSPage from "@/pages/ieltsPage/IELTSPage";
import { createBrowserRouter } from "react-router-dom";
import WritingLayout from "@/layout/WritingLayout";
import SpeakingLayout from "@/layout/SpeakingLayout";
import StudentDashboardLayout from "@/layout/StudentDashboardLayout";
import StudentDashboard from "@/pages/stundetDashboard/StudentDashboard";
import StudentIELTS from "@/pages/stundetDashboard/StudentIELTS";
import StudentIeltsReading from "@/pages/stundetDashboard/allIeltsCourse/StudentIeltsReading";
import StudentIeltsWriting from "@/pages/stundetDashboard/allIeltsCourse/StudentIeltsWriting";
import StudentIeltsSpeaking from "@/pages/stundetDashboard/allIeltsCourse/StudentIeltsSpeaking";
import StudentIeltsListening from "@/pages/stundetDashboard/allIeltsCourse/StudentIeltsListening";
import KeyboardTest from "@/pages/stundetDashboard/allIeltsCourse/KeyboardTest";
import AudioTest from "@/pages/stundetDashboard/allIeltsCourse/AudioTest";
import StudentPteCourse from "@/pages/stundetDashboard/pte/StudentPteCourse";
import PteTestDetails from "@/pages/stundetDashboard/pte/PteTestDetails";
import PteTestAttempt from "@/pages/stundetDashboard/pte/PteTestAttempt";
import PteTestResult from "@/pages/stundetDashboard/pte/PteTestResult";
import StudentClassRoom from "@/pages/stundetDashboard/classroom/StudentClassRoom";
import StudentScoreDashboard from "@/pages/stundetDashboard/score/StudentScoreDashboard";
import ReadingLayout from "@/layout/ReadingLayout";
import ReadingTestDetails from "@/pages/readingPage/ReadingTestDetails";
import StudentIeltsWritingTest from "@/pages/stundetDashboard/allIeltsCourse/StudentIeltsWritingTest";
import StudentIeltsListeningTest from "@/pages/stundetDashboard/allIeltsCourse/StudentIeltsListeningTest";
import StudentIeltsSpeakingTest from "@/pages/stundetDashboard/allIeltsCourse/StudentIeltsSpeakingTest";
import FullTestController from "@/pages/stundetDashboard/allIeltsCourse/FullTestController";
import FullTestResult from "@/pages/stundetDashboard/allIeltsCourse/FullTestResult";
import ClassroomLayout from "@/layout/ClassroomLayout";
import Register from "@/pages/classroomDashboard/register/Register";
import TeacherDashboard from "@/pages/classroomDashboard/teacherClassRoom/TeacherDashboard";
import Exams from "@/pages/classroomDashboard/teacherClassRoom/Exams";
import StudentList from "@/pages/classroomDashboard/teacherClassRoom/StudentList";
import SelectExamType from "@/pages/classroomDashboard/teacherClassRoom/SelectExamType";
import ChooseExamList from "@/pages/classroomDashboard/teacherClassRoom/ChooseExamList";
import ExamStartCountdown from "@/pages/classroomDashboard/teacherClassRoom/ExamStartCountdown";
import ExamSuccessfullyCompleted from "@/pages/classroomDashboard/teacherClassRoom/ExamSuccessfullyCompleted";
import GradingProgess from "@/pages/classroomDashboard/teacherClassRoom/GradingProgess";
import StudentsResults from "@/pages/classroomDashboard/teacherClassRoom/StudentsResults";
import ChooseExamListPTE from "@/pages/classroomDashboard/teacherClassRoom/ChooseExamListPTE";
import StudentClassroomLayout from "@/layout/StudentClassroomLayout";
import Report from "@/pages/classroomDashboard/studentClassRoom/Report";
import ExamHistory from "@/pages/classroomDashboard/studentClassRoom/ExamHistory";
import PTEHomePage from "@/pages/ptePage/PTEHomePage";
import {
  pteExaminationListeningRoutes,
  pteExaminationReadingRoutes,
  pteExaminationSpeakingWrittingRoutes,
  pteRoutes,
} from "./PTErouter";
// import { pteRoutes } from "@/lib/ImageProvider";
import WritingReview from "@/pages/stundetDashboard/review/WritingReview";
import SpeakingReview from "@/pages/stundetDashboard/review/SpeakingReview";
import ListeningReview from "@/pages/stundetDashboard/review/ListeningReview";
import ReadingReview from "@/pages/stundetDashboard/review/ReadingReview";
import PrivacyPolicy from "@/pages/legal/PrivacyPolicy";
import SpeakingResultDetail from "@/pages/stundetDashboard/allIeltsCourse/SpeakingResultDetail";
import WritingResultDetail from "@/pages/stundetDashboard/allIeltsCourse/WritingResultDetail";
import TermsAndConditions from "@/pages/legal/TermsAndConditions";
import Profile from "@/pages/stundetDashboard/Profile";
import HomeWork from "@/pages/classroomDashboard/teacherClassRoom/HomeWork";
import HomeWorkDetails from "@/pages/classroomDashboard/teacherClassRoom/HomeWorkDetails";
import StudentHomeWork from "@/pages/classroomDashboard/studentClassRoom/StudentHomeWork";
import ViewResultsStudents from "@/pages/classroomDashboard/studentClassRoom/ViewResultsStudents";
import StartHomeWork from "@/pages/classroomDashboard/studentClassRoom/StartHomeWork";
import SignUpPage from "@/pages/authPages/SignUpPage";
import ExamDashboard from "@/pages/classroomDashboard/studentClassRoom/ExamTime";
import StartExam from "@/pages/classroomDashboard/studentClassRoom/StartExam";
import StartPteExam from "@/pages/classroomDashboard/studentClassRoom/StartPteExam";
import NotFound from "@/pages/notFound/NotFound";
import PrivateRoute from "@/routes/PrivateRoute";
import ReadingResultDetail from "@/pages/stundetDashboard/allIeltsCourse/ReadingResultDetail";
import ListeningResultDetail from "@/pages/stundetDashboard/allIeltsCourse/ListeningResultDetail";
import ReadingSyllubus from "@/pages/ptePage/reading/ReadingSyllubus";
import FillinBlank from "@/pages/ptePage/reading/FillinBlank";
import MCQquestion from "@/pages/ptePage/reading/MCQquestion";
import MCQSingleQuestion from "@/pages/ptePage/reading/MCQSingleQuestion";
import FillinBlank2 from "@/pages/ptePage/reading/FillinBlank2";
import ReOrder from "@/pages/ptePage/reading/ReOrder";
import Success from "@/pages/payment/Success";
import Failed from "@/pages/payment/Failed";
import Cancelled from "@/pages/payment/Cancelled";

const router = createBrowserRouter([
  // Auth routes
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <AuthStart /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "login", element: <LogInPage /> },
      { path: "verify-otp", element: <VerifyOtp /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
    ],
  },

  // Public routes
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "ielts", element: <IELTSPage /> },
      { path: "pte", element: <PTEHomePage /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms-and-conditions", element: <TermsAndConditions /> },
    ],
  },

  // Payment routes
  {
    path: "/payment",
    children: [
      { path: "success", element: <Success /> },
      { path: "failed", element: <Failed /> },
      { path: "cancelled", element: <Cancelled /> },
    ],
  },

  // Check routes
  {
    path: "/keyboard-check",
    element: <KeyboardTest />,
  },
  {
    path: "/audio-check",
    element: <AudioTest />,
  },

  // Listening routes
  {
    path: "/listening",
    element: <ListeningLayout />,
    children: [{ index: true, element: <StudentIeltsListening /> }],
  },
  //Writing routes
  {
    path: "/writing",
    element: <WritingLayout />,
    children: [{ index: true, element: <StudentIeltsWriting /> }],
  },

  //speaking routes can be added here
  {
    path: "/speaking",
    element: <SpeakingLayout />,
    children: [{ index: true, element: <StudentIeltsSpeaking /> }],
  },
  //Reading routes
  {
    path: "/reading",
    element: <ReadingLayout />,
    children: [{ index: true, element: <StudentIeltsReading /> }],
  },
  {
    path: "/reading-test/:test_no/part/:part_no",
    element: <ReadingTestDetails />,
  },
  {
    path: "/writing-test/:test_no",
    element: <StudentIeltsWritingTest />,
  },
  {
    path: "/listening-test/:test_no/part/:part_no",
    element: <StudentIeltsListeningTest />,
  },
  {
    path: "/speaking-test/:test_no/part/:part_no",
    element: <StudentIeltsSpeakingTest />,
  },
  {
    path: "/dashboard/ielts/full-test",
    element: (
      <PrivateRoute>
        <FullTestController />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/ielts/full-test/result",
    element: (
      <PrivateRoute>
        <FullTestResult />
      </PrivateRoute>
    ),
  },
  // // Admin routes
  // {
  //   path: "/dashboard",
  //   element: <AdminLayout />,
  //   children: [{ index: true, element: <Dashboard /> }],
  // },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <StudentDashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <StudentDashboard /> },
      { path: "ielts", element: <StudentIELTS /> },
      { path: "ielts/reading", element: <StudentIeltsReading /> },
      { path: "ielts/writing", element: <StudentIeltsWriting /> },
      { path: "ielts/speaking", element: <StudentIeltsSpeaking /> },
      { path: "ielts/listening", element: <StudentIeltsListening /> },
      { path: "classroom", element: <StudentClassRoom /> },
      { path: "score", element: <StudentScoreDashboard /> },
      { path: "profile", element: <Profile /> },
      { path: "reading-result/:test_no", element: <ReadingResultDetail /> },
      { path: "listening-result/:test_no", element: <ListeningResultDetail /> },
      { path: "writing-result/:test_no", element: <WritingResultDetail /> },
      { path: "speaking-result/:test_no", element: <SpeakingResultDetail /> },
      { path: "reading-review/:id", element: <ReadingReview /> },
      { path: "writing-review/:id", element: <WritingReview /> },
      { path: "speaking-review/:id", element: <SpeakingReview /> },
      { path: "listening-review/:id", element: <ListeningReview /> },

      { path: "pte", element: <StudentPteCourse /> },
      { path: "pte/test-set/:id", element: <PteTestDetails /> },
      { path: "pte/test-attempt/:attemptId", element: <PteTestAttempt /> },
      { path: "pte/result/:attemptId", element: <PteTestResult /> },
      {
        path: "pte-reading-syllubus",
        element: <ReadingSyllubus />,
      },
      {
        path: "fill-in-blanks",
        element: <FillinBlank />,
      },
      {
        path: "mcq-single-answer",
        element: <MCQSingleQuestion />,
      },
      {
        path: "mcq-multiple-question",
        element: <MCQquestion />,
      },
      {
        path: "fill-in-blanks-2",
        element: <FillinBlank2 />,
      },
      {
        path: "reorder-paragraphs",
        element: <ReOrder />,
      },
    ],
  },
  // TeacherDashboard routes
  {
    path: "/classroom",
    element: <Register />,
    children: [{ index: true, element: <Register /> }],
  },
  {
    path: "/classroom/register-as-teacher",
    element: (
      <PrivateRoute>
        <ClassroomLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <TeacherDashboard /> },
      { path: "exams", element: <Exams /> },
      { path: "home-work", element: <HomeWork /> },
      { path: "home-work/:id", element: <HomeWorkDetails /> },
      { path: "student-list", element: <StudentList /> },
      { path: "select-exam", element: <SelectExamType /> },
      { path: "choose-exam-list-ielts", element: <ChooseExamList /> },
      { path: "choose-exam-list-pte", element: <ChooseExamListPTE /> },
      { path: "exam-start", element: <ExamStartCountdown /> },
      { path: "exam-completed", element: <ExamSuccessfullyCompleted /> },
      { path: "grading", element: <GradingProgess /> },
      { path: "results", element: <StudentsResults /> },
    ],
  },
  // StudentDashboard routes
  {
    path: "/classroom/register-as-student",
    element: (
      <PrivateRoute>
        <StudentClassroomLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <ExamDashboard /> },
      { path: "report", element: <Report /> },
      { path: "exam-history", element: <ExamHistory /> },
      { path: "student-home-work", element: <StudentHomeWork /> },
      { path: "view-results/:id", element: <ViewResultsStudents /> },
      { path: "start-homework/:id", element: <StartHomeWork /> },
      { path: "start-exam/:id", element: <StartExam /> },
      { path: "start-pte-exam/:id", element: <StartPteExam /> },
    ],
  },

  pteRoutes,
  pteExaminationSpeakingWrittingRoutes,
  pteExaminationReadingRoutes,
  pteExaminationListeningRoutes,
  {
    path: "*",
    element: <NotFound />,
  },
]);

// PTE related routes can be added here

export default router;
